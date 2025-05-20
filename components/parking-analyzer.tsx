"use client"

import { useEffect, useRef } from "react"

export function ParkingAnalyzer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 800
    canvas.height = 600

    // Draw the debug visualization
    drawDebugView(ctx)
  }, [])

  const drawDebugView = (ctx: CanvasRenderingContext2D) => {
    // Background
    ctx.fillStyle = "#f5f5dc"
    ctx.fillRect(0, 0, 800, 600)

    // Draw grid lines
    ctx.strokeStyle = "#888"
    ctx.lineWidth = 0.5
    for (let i = 0; i < 800; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 600)
      ctx.stroke()
    }
    for (let i = 0; i < 600; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(800, i)
      ctx.stroke()
    }

    // Title
    ctx.fillStyle = "#8B4513"
    ctx.font = "16px monospace"
    ctx.fillText("PARKING SLOT DETECTION - DEBUG VIEW", 20, 30)

    // Draw the processing steps
    drawPreprocessingSteps(ctx)
    drawSlotDetectionSteps(ctx)
    drawOccupancyClassification(ctx)
  }

  const drawPreprocessingSteps = (ctx: CanvasRenderingContext2D) => {
    // Section title
    ctx.fillStyle = "#8B4513"
    ctx.font = "14px monospace"
    ctx.fillText("1. IMAGE PREPROCESSING", 20, 70)

    // Original image placeholder
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    ctx.strokeRect(20, 80, 150, 100)
    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("ORIGINAL IMAGE", 55, 130)

    // Arrow
    ctx.beginPath()
    ctx.moveTo(180, 130)
    ctx.lineTo(210, 130)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(210, 130)
    ctx.lineTo(205, 125)
    ctx.lineTo(205, 135)
    ctx.closePath()
    ctx.fillStyle = "#000"
    ctx.fill()

    // Grayscale image placeholder
    ctx.strokeStyle = "#000"
    ctx.strokeRect(220, 80, 150, 100)
    ctx.fillStyle = "#777"
    ctx.fillRect(225, 85, 140, 90)
    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("GRAYSCALE", 265, 130)

    // Arrow
    ctx.beginPath()
    ctx.moveTo(380, 130)
    ctx.lineTo(410, 130)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(410, 130)
    ctx.lineTo(405, 125)
    ctx.lineTo(405, 135)
    ctx.closePath()
    ctx.fillStyle = "#000"
    ctx.fill()

    // Binary image placeholder
    ctx.strokeStyle = "#000"
    ctx.strokeRect(420, 80, 150, 100)

    // Draw a binary-like pattern
    const cellSize = 5
    for (let x = 425; x < 565; x += cellSize) {
      for (let y = 85; y < 175; y += cellSize) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = "#fff"
        } else {
          ctx.fillStyle = "#000"
        }
        ctx.fillRect(x, y, cellSize, cellSize)
      }
    }

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("BINARY THRESHOLD", 445, 130)

    // Yellow mask section
    ctx.fillStyle = "#8B4513"
    ctx.font = "12px monospace"
    ctx.fillText("YELLOW ZONE MASKING:", 20, 200)

    // HSV conversion
    ctx.strokeStyle = "#000"
    ctx.strokeRect(20, 210, 120, 80)

    // Draw a colorful HSV-like gradient
    const gradient = ctx.createLinearGradient(25, 215, 135, 285)
    gradient.addColorStop(0, "red")
    gradient.addColorStop(0.2, "yellow")
    gradient.addColorStop(0.4, "green")
    gradient.addColorStop(0.6, "cyan")
    gradient.addColorStop(0.8, "blue")
    gradient.addColorStop(1, "magenta")
    ctx.fillStyle = gradient
    ctx.fillRect(25, 215, 110, 70)

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("HSV CONVERSION", 35, 250)

    // Arrow
    ctx.beginPath()
    ctx.moveTo(150, 250)
    ctx.lineTo(180, 250)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(180, 250)
    ctx.lineTo(175, 245)
    ctx.lineTo(175, 255)
    ctx.closePath()
    ctx.fillStyle = "#000"
    ctx.fill()

    // Yellow mask
    ctx.strokeStyle = "#000"
    ctx.strokeRect(190, 210, 120, 80)
    ctx.fillStyle = "rgba(255, 255, 0, 0.3)"

    // Draw some yellow masked areas
    ctx.fillRect(200, 220, 30, 20)
    ctx.fillRect(240, 230, 40, 25)
    ctx.fillRect(210, 260, 25, 20)

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("YELLOW MASK", 215, 250)
  }

  const drawSlotDetectionSteps = (ctx: CanvasRenderingContext2D) => {
    // Section title
    ctx.fillStyle = "#8B4513"
    ctx.font = "14px monospace"
    ctx.fillText("2. SLOT DETECTION", 350, 200)

    // Contour finding
    ctx.strokeStyle = "#000"
    ctx.strokeRect(350, 210, 150, 100)

    // Draw some contours
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 1

    // Draw several rectangles to represent contours
    for (let i = 0; i < 10; i++) {
      const x = 360 + Math.random() * 130
      const y = 220 + Math.random() * 80
      const width = 10 + Math.random() * 20
      const height = 20 + Math.random() * 30

      ctx.strokeRect(x, y, width, height)
    }

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("CONTOUR FINDING", 375, 260)

    // Arrow
    ctx.beginPath()
    ctx.moveTo(510, 260)
    ctx.lineTo(540, 260)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(540, 260)
    ctx.lineTo(535, 255)
    ctx.lineTo(535, 265)
    ctx.closePath()
    ctx.fillStyle = "#000"
    ctx.fill()

    // Filtered slots
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    ctx.strokeRect(550, 210, 150, 100)

    // Draw filtered slots
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2

    // Draw several rectangles to represent filtered slots
    for (let i = 0; i < 6; i++) {
      const x = 560 + (i % 3) * 40
      const y = 220 + Math.floor(i / 3) * 40
      const width = 30
      const height = 30

      ctx.strokeRect(x, y, width, height)
    }

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("FILTERED SLOTS", 575, 260)

    // Parameters
    ctx.fillStyle = "#8B4513"
    ctx.font = "12px monospace"
    ctx.fillText("FILTERING PARAMETERS:", 350, 330)

    ctx.font = "10px monospace"
    ctx.fillText("MIN_SLOT_AREA = 2500", 350, 350)
    ctx.fillText("MAX_SLOT_AREA = 7000", 350, 365)
    ctx.fillText("MIN_ASPECT_RATIO = 0.2", 350, 380)
    ctx.fillText("MAX_ASPECT_RATIO = 0.7", 350, 395)
    ctx.fillText("APPROX_POLY_EPSILON = 0.03", 350, 410)
    ctx.fillText("YELLOW_ZONE_EXCLUSION = TRUE", 350, 425)
  }

  const drawOccupancyClassification = (ctx: CanvasRenderingContext2D) => {
    // Section title
    ctx.fillStyle = "#8B4513"
    ctx.font = "14px monospace"
    ctx.fillText("3. OCCUPANCY CLASSIFICATION", 20, 320)

    // YOLO detection
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    ctx.strokeRect(20, 330, 150, 100)

    // Draw some vehicle bounding boxes
    ctx.strokeStyle = "red"
    ctx.lineWidth = 2

    // Car 1
    ctx.strokeRect(40, 350, 30, 20)
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)"
    ctx.fillRect(40, 350, 30, 20)

    // Car 2
    ctx.strokeRect(80, 360, 35, 25)
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)"
    ctx.fillRect(80, 360, 35, 25)

    // Car 3
    ctx.strokeRect(50, 390, 40, 30)
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)"
    ctx.fillRect(50, 390, 40, 30)

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("YOLO DETECTION", 45, 380)

    // IoU calculation
    ctx.fillStyle = "#8B4513"
    ctx.font = "12px monospace"
    ctx.fillText("IoU CALCULATION:", 20, 450)

    // Draw IoU example
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2
    ctx.strokeRect(20, 460, 60, 100)

    ctx.strokeStyle = "red"
    ctx.strokeRect(40, 480, 70, 50)

    // Intersection
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)"
    ctx.fillRect(40, 480, 40, 50)

    ctx.fillStyle = "#333"
    ctx.font = "10px monospace"
    ctx.fillText("SLOT", 30, 510)
    ctx.fillText("VEHICLE", 75, 510)
    ctx.fillText("INTERSECTION", 40, 540)

    // IoU formula
    ctx.fillStyle = "#8B4513"
    ctx.font = "12px monospace"
    ctx.fillText("IoU = Area of Intersection / Area of Union", 150, 480)
    ctx.fillText("If IoU > 0.10, slot is OCCUPIED", 150, 500)

    // Final classification
    ctx.fillStyle = "#8B4513"
    ctx.font = "14px monospace"
    ctx.fillText("4. FINAL CLASSIFICATION", 20, 580)

    // Draw example slots
    // Available slot
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2
    ctx.strokeRect(40, 490, 30, 60)
    ctx.fillStyle = "rgba(0, 255, 0, 0.2)"
    ctx.fillRect(40, 490, 30, 60)

    // Occupied slot
    ctx.strokeStyle = "red"
    ctx.lineWidth = 2
    ctx.strokeRect(90, 490, 30, 60)
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)"
    ctx.fillRect(90, 490, 30, 60)

    // Results
    ctx.fillStyle = "#8B4513"
    ctx.font = "12px monospace"
    ctx.fillText("RESULTS:", 550, 330)

    ctx.font = "14px monospace"
    ctx.fillText("TOTAL SLOTS: 187", 550, 360)
    ctx.fillText("OCCUPIED: 142", 550, 380)
    ctx.fillText("AVAILABLE: 45", 550, 400)
    ctx.fillText("OCCUPANCY RATE: 75.9%", 550, 420)
  }

  return <canvas ref={canvasRef} className="w-full h-auto border border-amber-800" />
}
