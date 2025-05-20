// This is a JavaScript representation of the Python code that would be used
// in a real implementation. This is for reference only and not used in the app.

/*
import cv2
import numpy as np
import pandas as pd
from ultralytics import YOLO

def calculate_iou(box1, box2):
    """
    Calculate the Intersection over Union (IoU) of two bounding boxes.
    
    Parameters:
    box1, box2: Each box is represented as [x1, y1, x2, y2] where (x1, y1) is the top-left corner
               and (x2, y2) is the bottom-right corner.
               
    Returns:
    float: IoU value
    """
    # Determine the coordinates of the intersection rectangle
    x_left = max(box1[0], box2[0])
    y_top = max(box1[1], box2[1])
    x_right = min(box1[2], box2[2])
    y_bottom = min(box1[3], box2[3])
    
    # If there is no intersection, return 0
    if x_right < x_left or y_bottom < y_top:
        return 0.0
    
    # Calculate area of intersection
    intersection_area = (x_right - x_left) * (y_bottom - y_top)
    
    # Calculate area of both bounding boxes
    box1_area = (box1[2] - box1[0]) * (box1[3] - box1[1])
    box2_area = (box2[2] - box2[0]) * (box2[3] - box2[1])
    
    # Calculate union area
    union_area = box1_area + box2_area - intersection_area
    
    # Calculate IoU
    iou = intersection_area / union_area
    
    return iou

def process_parking_image(image_path):
    # Load the image
    original_image = cv2.imread(image_path)
    
    # Step 1: Preprocessing for slot detection
    gray_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)
    blurred_image = cv2.GaussianBlur(gray_image, (5, 5), 0)
    binary_image = cv2.adaptiveThreshold(blurred_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                         cv2.THRESH_BINARY_INV, 19, 3)
    
    # Morphological operations to clean up the binary image
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    processed_for_slots = cv2.morphologyEx(binary_image, cv2.MORPH_OPEN, kernel, iterations=1)
    
    # Step 2: Yellow zone masking (no-parking areas)
    hsv_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2HSV)
    lower_yellow = np.array([20, 80, 80])
    upper_yellow = np.array([35, 255, 255])
    yellow_mask = cv2.inRange(hsv_image, lower_yellow, upper_yellow)
    
    # Dilate the yellow mask to ensure complete coverage
    dilate_kernel_yellow = np.ones((7,7), np.uint8)
    yellow_mask_dilated = cv2.dilate(yellow_mask, dilate_kernel_yellow, iterations=2)
    
    # Step 3: Parking slot detection
    contours, _ = cv2.findContours(processed_for_slots, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Parameters for slot filtering
    MIN_SLOT_AREA = 2500
    MAX_SLOT_AREA = 7000
    MIN_ASPECT_RATIO = 0.2
    MAX_ASPECT_RATIO = 0.7
    
    potential_slots = []
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        
        if MIN_SLOT_AREA <= area <= MAX_SLOT_AREA:
            peri = cv2.arcLength(cnt, True)
            approx = cv2.approxPolyDP(cnt, 0.03 * peri, True)
            
            if 4 <= len(approx) <= 6:  # Looking for roughly rectangular shapes
                x, y, w, h = cv2.boundingRect(cnt)
                aspect_ratio = w / h
                
                if MIN_ASPECT_RATIO <= aspect_ratio <= MAX_ASPECT_RATIO:
                    # Check if the center of the slot is in a yellow zone
                    slot_center_x = x + w // 2
                    slot_center_y = y + h // 2
                    
                    if yellow_mask_dilated[slot_center_y, slot_center_x] == 0:  # Not in yellow zone
                        potential_slots.append((x, y, w, h))
    
    # Basic de-duplication of slots (remove highly overlapping detections)
    slots = []
    potential_slots.sort(key=lambda slot: slot[0])  # Sort by x-coordinate
    
    for slot in potential_slots:
        x, y, w, h = slot
        is_duplicate = False
        
        for existing_slot in slots:
            ex, ey, ew, eh = existing_slot
            
            # Check if slots are highly overlapping
            box1 = [x, y, x + w, y + h]
            box2 = [ex, ey, ex + ew, ey + eh]
            iou_val = calculate_iou(box1, box2)
            
            # Alternative: check if centers are very close
            center_x, center_y = x + w // 2, y + h // 2
            existing_center_x, existing_center_y = ex + ew // 2, ey + eh // 2
            dist_sq = (center_x - existing_center_x) ** 2 + (center_y - existing_center_y) ** 2
            
            if iou_val > 0.6 or dist_sq < (min(slot[2], existing_slot[2]) * 0.5) ** 2:
                is_duplicate = True
                break
        
        if not is_duplicate:
            slots.append(slot)
    
    # Step 4: Vehicle detection using YOLOv8
    model = YOLO('yolov8s.pt')
    results = model(original_image, verbose=False)
    
    # Filter for vehicle classes (car=2, bus=5, truck=7 in COCO dataset)
    vehicle_classes = [2, 5, 7]
    vehicles = []
    
    for result in results:
        boxes = result.boxes
        for box in boxes:
            cls = int(box.cls.item())
            if cls in vehicle_classes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                vehicles.append([int(x1), int(y1), int(x2), int(y2)])
    
    # Step 5: Determine slot occupancy
    slot_occupancy_status = []
    iou_threshold = 0.10  # Threshold for considering a slot occupied
    
    for slot in slots:
        x, y, w, h = slot
        slot_box = [x, y, x + w, y + h]
        is_occupied = False
        
        for vehicle_box in vehicles:
            iou = calculate_iou(slot_box, vehicle_box)
            if iou > iou_threshold:
                is_occupied = True
                break
        
        slot_occupancy_status.append(is_occupied)
    
    # Step 6: Generate output
    total_slots = len(slots)
    occupied_slots = sum(slot_occupancy_status)
    available_slots = total_slots - occupied_slots
    
    # Create visualization
    result_image = original_image.copy()
    
    for i, slot in enumerate(slots):
        x, y, w, h = slot
        color = (0, 0, 255) if slot_occupancy_status[i] else (0, 255, 0)  # Red if occupied, green if available
        cv2.rectangle(result_image, (x, y), (x + w, y + h), color, 2)
    
    # Add text with counts
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(result_image, f'Total: {total_slots}', (10, 30), font, 1, (255, 255, 255), 2)
    cv2.putText(result_image, f'Occupied: {occupied_slots}', (10, 70), font, 1, (0, 0, 255), 2)
    cv2.putText(result_image, f'Available: {available_slots}', (10, 110), font, 1, (0, 255, 0), 2)
    
    # Create CSV report
    data = {
        'Total Number of Slots': [total_slots],
        'Occupied Slots': [occupied_slots],
        'Available Slots': [available_slots]
    }
    df = pd.DataFrame(data)
    df.to_csv('parking_occupancy_report.csv', index=False)
    
    # Save visualization
    cv2.imwrite('parking_status_visualization.jpg', result_image)
    
    return {
        'total_slots': total_slots,
        'occupied_slots': occupied_slots,
        'available_slots': available_slots,
        'result_image_path': 'parking_status_visualization.jpg',
        'report_path': 'parking_occupancy_report.csv'
    }

# Example usage
if __name__ == "__main__":
    results = process_parking_image('carParkImg.png')
    print(f"Total slots: {results['total_slots']}")
    print(f"Occupied slots: {results['occupied_slots']}")
    print(f"Available slots: {results['available_slots']}")
    print(f"Results saved to {results['result_image_path']} and {results['report_path']}")
*/

// This is just a placeholder to show what the Python code would look like
console.log("This is a JavaScript representation of the Python code that would be used in a real implementation.")
