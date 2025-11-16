# 🚗 Parking Slot Analyzer

An intelligent web application that analyzes aerial parking lot images to automatically detect parking slots, identify their occupancy status, and generate detailed reports. Built with a retro 1980s computer terminal aesthetic.

![Version](https://img.shields.io/badge/version-1.0.0-amber)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Parking Slot Analyzer is a computer vision-based web application designed to process aerial images of parking lots and automatically:

- Detect individual parking slots using contour detection
- Identify no-parking zones (yellow-marked areas)
- Detect vehicles using YOLOv8 object detection
- Classify each slot as occupied or available
- Generate visual overlays and statistical reports

This project demonstrates modern web development practices combined with computer vision algorithms, perfect for portfolio presentations and real-world parking management applications.

## ✨ Features

### 🎨 **Retro User Interface**
- 1980s computer terminal aesthetic with amber/brown color scheme
- Responsive design that works on all devices
- Interactive tabs for viewing original, processed, and debug visualizations
- Real-time processing status with detailed logs

### 🔍 **Computer Vision Pipeline**
- **Image Preprocessing**: Grayscale conversion, Gaussian blur, adaptive thresholding
- **No-Parking Zone Detection**: HSV color space analysis to detect yellow zones
- **Slot Detection**: Contour finding with filtering by area, shape, and aspect ratio
- **Vehicle Detection**: YOLOv8-based object detection for cars, buses, and trucks
- **Occupancy Classification**: IoU (Intersection over Union) calculation

### 📊 **Results & Analytics**
- Total slots, occupied, and available counts
- Visual overlay with color-coded rectangles (green = available, red = occupied)
- Processing logs showing each step of the pipeline
- Export options for CSV reports and annotated images

### 🎛️ **Configurable Parameters**
- Adjustable slot area thresholds (2500-7000 pixels)
- Aspect ratio constraints (0.2-0.7)
- IoU threshold for occupancy detection (0.10)
- Yellow zone exclusion settings

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **Components**: shadcn/ui (built on Radix UI)
- **Icons**: Lucide React

### Backend (Reference Implementation)
The Python reference implementation uses:
- **OpenCV (cv2)**: Image processing and computer vision
- **NumPy**: Numerical operations and array manipulation
- **Pandas**: Data manipulation and CSV generation
- **Ultralytics YOLOv8**: State-of-the-art object detection

### Development Tools
- **Package Manager**: pnpm
- **Build Tool**: Next.js with Turbopack
- **Code Quality**: TypeScript strict mode

## 📦 Installation

### Prerequisites

- **Node.js**: 18.0 or higher
- **pnpm**: 8.0 or higher (or npm/yarn)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Parking-slot-analyser.git
cd Parking-slot-analyser
```

### Step 2: Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Step 3: Run Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Build for Production

```bash
pnpm build
pnpm start
# or
npm run build && npm start
```

## 🚀 Usage

### Running the Web Application

1. **Start the development server**: `pnpm dev`
2. **Navigate to the home page**: [http://localhost:3000](http://localhost:3000)
3. **Click "START ANALYSIS"** to view the analysis interface
4. **Click "START PROCESSING"** to simulate the parking slot analysis
5. **View results** in the PROCESSED and DEBUG VIEW tabs

### Current Implementation

The current version is a **frontend demonstration** with:
- ✅ Fully functional UI with retro aesthetic
- ✅ Simulated processing with realistic progress indicators
- ✅ Mock analysis results (187 total slots, 142 occupied, 45 available)
- ✅ Static demo images (`carParkImg.png` and `result.png`)
- ✅ Complete Python reference implementation in `/lib/python-code.js`

### API Endpoint

The API endpoint (`/api/analyze`) currently returns mock data. To implement real processing:

1. Set up a Python backend (Flask/FastAPI)
2. Install Python dependencies (see `requirements.txt`)
3. Integrate the reference implementation from `/lib/python-code.js`
4. Update the API route to call the Python service

## 📁 Project Structure

```
Parking-slot-analyser/
├── app/                          # Next.js App Router
│   ├── analyze/
│   │   └── page.tsx             # Analysis page with image viewer
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # API endpoint (currently mock)
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home/landing page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── parking-analyzer.tsx     # Debug visualization component
│   ├── theme-provider.tsx       # Theme context provider
│   └── ui/                      # shadcn/ui components (40+ components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── progress.tsx
│       └── ...
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                         # Utilities and helpers
│   ├── python-code.js          # Python reference implementation
│   └── utils.ts                # Tailwind utility functions
├── public/                      # Static assets
│   ├── carParkImg.png          # Demo parking lot image
│   └── result.png              # Processed result image
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.mjs             # Next.js configuration
└── README.md                   # This file
```

## 🔬 How It Works

The parking slot analysis follows a multi-step computer vision pipeline:

### 1️⃣ **Image Preprocessing**

```python
# Convert to grayscale
gray_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)

# Apply Gaussian blur to reduce noise
blurred_image = cv2.GaussianBlur(gray_image, (5, 5), 0)

# Adaptive thresholding for binary image
binary_image = cv2.adaptiveThreshold(
    blurred_image, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY_INV, 19, 3
)

# Morphological operations to clean up
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
processed = cv2.morphologyEx(binary_image, cv2.MORPH_OPEN, kernel, iterations=1)
```

### 2️⃣ **No-Parking Zone Detection**

```python
# Convert to HSV color space
hsv_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2HSV)

# Define yellow color range
lower_yellow = np.array([20, 80, 80])
upper_yellow = np.array([35, 255, 255])

# Create yellow mask
yellow_mask = cv2.inRange(hsv_image, lower_yellow, upper_yellow)

# Dilate to ensure complete coverage
yellow_mask_dilated = cv2.dilate(yellow_mask, kernel, iterations=2)
```

### 3️⃣ **Parking Slot Detection**

```python
# Find contours
contours, _ = cv2.findContours(processed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter by area, shape, and aspect ratio
for cnt in contours:
    area = cv2.contourArea(cnt)
    if MIN_SLOT_AREA <= area <= MAX_SLOT_AREA:
        # Check if roughly rectangular (4-6 vertices)
        approx = cv2.approxPolyDP(cnt, 0.03 * peri, True)
        if 4 <= len(approx) <= 6:
            # Check aspect ratio
            x, y, w, h = cv2.boundingRect(cnt)
            aspect_ratio = w / h
            if MIN_ASPECT_RATIO <= aspect_ratio <= MAX_ASPECT_RATIO:
                # Exclude slots in yellow zones
                if not in_yellow_zone(x, y, w, h):
                    slots.append((x, y, w, h))
```

### 4️⃣ **Vehicle Detection**

```python
# Load YOLOv8 model
model = YOLO('yolov8s.pt')

# Detect vehicles (car=2, bus=5, truck=7 in COCO)
results = model(original_image, verbose=False)

# Extract vehicle bounding boxes
for box in results.boxes:
    if box.cls in [2, 5, 7]:  # Vehicle classes
        vehicles.append(box.xyxy)
```

### 5️⃣ **Occupancy Classification**

```python
# Calculate IoU between slots and vehicles
def calculate_iou(box1, box2):
    x_left = max(box1[0], box2[0])
    y_top = max(box1[1], box2[1])
    x_right = min(box1[2], box2[2])
    y_bottom = min(box1[3], box2[3])

    if x_right < x_left or y_bottom < y_top:
        return 0.0

    intersection = (x_right - x_left) * (y_bottom - y_top)
    box1_area = (box1[2] - box1[0]) * (box1[3] - box1[1])
    box2_area = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union = box1_area + box2_area - intersection

    return intersection / union

# Classify each slot
for slot in slots:
    is_occupied = any(calculate_iou(slot, vehicle) > 0.10 for vehicle in vehicles)
    slot_occupancy_status.append(is_occupied)
```

### 6️⃣ **Visualization & Output**

```python
# Draw color-coded rectangles
for i, (x, y, w, h) in enumerate(slots):
    color = (0, 0, 255) if occupied[i] else (0, 255, 0)  # Red or Green
    cv2.rectangle(result_image, (x, y), (x + w, y + h), color, 2)

# Generate statistics
total_slots = len(slots)
occupied_slots = sum(slot_occupancy_status)
available_slots = total_slots - occupied_slots

# Export CSV report
df = pd.DataFrame({
    'Total Slots': [total_slots],
    'Occupied': [occupied_slots],
    'Available': [available_slots]
})
df.to_csv('parking_report.csv', index=False)
```

## 🔮 Future Enhancements

### High Priority
- [ ] **Backend Integration**: Implement actual Python backend with Flask/FastAPI
- [ ] **Real Image Upload**: Allow users to upload their own parking lot images
- [ ] **Live Processing**: Replace mock data with real-time analysis
- [ ] **Database Integration**: Store analysis history and results

### Medium Priority
- [ ] **Advanced Analytics**: Heatmaps, occupancy trends over time
- [ ] **Multi-Image Support**: Batch processing of multiple images
- [ ] **Custom Parameters**: User-adjustable detection parameters
- [ ] **Export Formats**: PDF reports, JSON API responses

### Nice to Have
- [ ] **Real-time Camera Feed**: Live parking lot monitoring
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Cloud Deployment**: AWS/Azure/GCP integration
- [ ] **ML Model Training**: Custom model training interface

## 🤝 Contributing

Contributions are welcome! This project was built as an internship portfolio piece, but improvements are always appreciated.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ for an internship application

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **shadcn**: For the beautiful UI component library
- **Ultralytics**: For YOLOv8 object detection
- **OpenCV Community**: For computer vision tools

## 📞 Support

If you have any questions or issues:

1. Check the [Issues](https://github.com/yourusername/Parking-slot-analyser/issues) page
2. Create a new issue with detailed information
3. Reach out via email (if applicable)

---

**Note**: This is a demonstration/portfolio project. The current implementation uses mock data for the frontend. The complete Python implementation is provided as reference in `/lib/python-code.js` and can be integrated with a Python backend service.

**Made for**: Internship Application Portfolio
**Status**: Frontend Complete, Backend Integration Pending
**Last Updated**: January 2025
