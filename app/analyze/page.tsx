"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Loader2, ArrowLeft, Download, Eye } from "lucide-react"
import { ParkingAnalyzer } from "@/components/parking-analyzer"

/**
 * Analysis Page Component
 *
 * This page provides the main interface for parking slot analysis.
 * It displays the original image, processed results, and debug visualizations
 * in a tabbed interface with retro 1980s computer terminal styling.
 *
 * Current Implementation: Uses simulated processing with mock data.
 * Future: Will integrate with actual Python backend for real image analysis.
 */
export default function AnalyzePage() {
  // State management for processing flow
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("original")
  const [stats, setStats] = useState({ total: 0, occupied: 0, available: 0 })

  // Demo images - replace with uploaded images in future implementation
  const demoImage = "/carParkImg.png"
  const resultImage = "/result.png"

  /**
   * Simulates the parking slot analysis process
   *
   * This effect increments progress by 5% every 200ms to simulate
   * real processing steps. In production, this would call the actual
   * API endpoint and show real progress updates.
   */
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5

          // When progress reaches 100%, complete the processing
          if (newProgress >= 100) {
            clearInterval(interval)

            // Small delay before showing final results
            setTimeout(() => {
              setIsProcessing(false)
              setIsComplete(true)

              // Mock statistics - replace with actual API response
              setStats({
                total: 187,
                occupied: 142,
                available: 45,
              })
            }, 500)
            return 100
          }
          return newProgress
        })
      }, 200) // Update progress every 200ms

      // Cleanup interval on unmount
      return () => clearInterval(interval)
    }
  }, [isProcessing])

  /**
   * Initiates the parking slot analysis process
   *
   * In production, this would:
   * 1. Validate the uploaded image
   * 2. Call the /api/analyze endpoint
   * 3. Update progress based on real processing status
   * 4. Display actual results from the backend
   */
  const startProcessing = () => {
    setIsProcessing(true)
    setProgress(0)
    setIsComplete(false)
  }

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 font-mono">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-amber-200 border-2 border-amber-800 hover:bg-amber-300 text-amber-900 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> BACK
              </Button>
            </Link>
            <h1 className="text-3xl font-bold border-b-4 border-amber-800 inline-block pb-2">IMAGE ANALYSIS</h1>
            <div className="w-[100px]"></div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-amber-100 border-2 border-amber-800 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)]">
              <CardHeader className="border-b-2 border-amber-800">
                <CardTitle className="text-xl">IMAGE VIEWER</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-amber-200 border-2 border-amber-800 mb-4">
                    <TabsTrigger
                      value="original"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
                    >
                      ORIGINAL
                    </TabsTrigger>
                    <TabsTrigger
                      value="processed"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
                      disabled={!isComplete}
                    >
                      PROCESSED
                    </TabsTrigger>
                    <TabsTrigger
                      value="debug"
                      className="data-[state=active]:bg-amber-800 data-[state=active]:text-white"
                      disabled={!isComplete}
                    >
                      DEBUG VIEW
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="original" className="m-0">
                    <div className="border-2 border-amber-800 bg-white p-1">
                      <Image
                        src={demoImage || "/placeholder.svg"}
                        alt="Parking lot aerial view"
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="processed" className="m-0">
                    <div className="border-2 border-amber-800 bg-white p-1">
                      {isComplete ? (
                        <Image
                          src={resultImage || "/placeholder.svg"}
                          alt="Processed parking lot with slot detection"
                          width={1200}
                          height={800}
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="h-[400px] flex items-center justify-center">
                          <p>Process the image to see results</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="debug" className="m-0">
                    <div className="border-2 border-amber-800 bg-white p-1">
                      {isComplete ? (
                        <ParkingAnalyzer />
                      ) : (
                        <div className="h-[400px] flex items-center justify-center">
                          <p>Process the image to see debug view</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-amber-100 border-2 border-amber-800 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)] mb-8">
              <CardHeader className="border-b-2 border-amber-800">
                <CardTitle className="text-xl">PROCESSING</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {isProcessing ? (
                    <>
                      <div className="flex items-center justify-center mb-4">
                        <Loader2 className="h-8 w-8 animate-spin text-amber-800" />
                      </div>
                      <div className="w-full h-4 bg-amber-200 border border-amber-800 rounded overflow-hidden">
                        <div
                          className="h-full bg-amber-800 transition-all duration-200"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-center font-bold">{progress}% COMPLETE</p>
                      <div className="border border-amber-800 bg-amber-50 p-2 text-xs h-24 overflow-auto">
                        {progress >= 10 && <p>Loading image...</p>}
                        {progress >= 20 && <p>Converting to grayscale...</p>}
                        {progress >= 30 && <p>Applying adaptive threshold...</p>}
                        {progress >= 40 && <p>Detecting yellow no-parking zones...</p>}
                        {progress >= 50 && <p>Finding contours for parking slots...</p>}
                        {progress >= 60 && <p>Filtering contours by size and shape...</p>}
                        {progress >= 70 && <p>Loading YOLOv8 model...</p>}
                        {progress >= 80 && <p>Detecting vehicles in image...</p>}
                        {progress >= 90 && <p>Determining slot occupancy...</p>}
                        {progress >= 100 && <p>Analysis complete!</p>}
                      </div>
                    </>
                  ) : isComplete ? (
                    <>
                      <div className="bg-green-100 border-2 border-green-800 p-3 text-center text-green-800">
                        <p className="font-bold">ANALYSIS COMPLETE</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-amber-200 p-2 border border-amber-800">
                          <p className="text-xs">TOTAL SLOTS</p>
                          <p className="font-bold text-xl">{stats.total}</p>
                        </div>
                        <div className="bg-red-200 p-2 border border-red-800 text-red-800">
                          <p className="text-xs">OCCUPIED</p>
                          <p className="font-bold text-xl">{stats.occupied}</p>
                        </div>
                        <div className="bg-green-200 p-2 border border-green-800 text-green-800">
                          <p className="text-xs">AVAILABLE</p>
                          <p className="font-bold text-xl">{stats.available}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-amber-200 hover:bg-amber-300 text-amber-900 border-2 border-amber-800 font-mono">
                          <Download className="mr-2 h-4 w-4" /> CSV
                        </Button>
                        <Button className="flex-1 bg-amber-200 hover:bg-amber-300 text-amber-900 border-2 border-amber-800 font-mono">
                          <Eye className="mr-2 h-4 w-4" /> REPORT
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-center mb-4">Ready to analyze parking image</p>
                      <Button
                        onClick={startProcessing}
                        className="w-full bg-green-700 hover:bg-green-800 text-white border-2 border-green-900 font-mono"
                      >
                        START PROCESSING
                      </Button>
                      <div className="border border-amber-800 bg-amber-50 p-2 text-xs">
                        <p className="font-bold">PARAMETERS:</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                          <p>Min Slot Area:</p>
                          <p>2500</p>
                          <p>Max Slot Area:</p>
                          <p>7000</p>
                          <p>Aspect Ratio:</p>
                          <p>0.2 - 0.7</p>
                          <p>IoU Threshold:</p>
                          <p>0.10</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-100 border-2 border-amber-800 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)]">
              <CardHeader className="border-b-2 border-amber-800">
                <CardTitle className="text-xl">SYSTEM LOG</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border border-amber-800 bg-black text-green-500 p-2 font-mono text-xs h-[200px] overflow-auto">
                  <p>SYSTEM INITIALIZED - 20/05/2025 18:51:05</p>
                  <p>LOADING YOLOV8 MODEL...</p>
                  <p>MODEL LOADED SUCCESSFULLY</p>
                  <p>MEMORY ALLOCATION: 32MB</p>
                  <p>SYSTEM READY</p>
                  {isProcessing && progress >= 20 && <p>PROCESSING IMAGE: carParkImg.png</p>}
                  {isProcessing && progress >= 40 && <p>APPLYING IMAGE PREPROCESSING</p>}
                  {isProcessing && progress >= 60 && <p>DETECTING PARKING SLOTS</p>}
                  {isProcessing && progress >= 80 && <p>RUNNING VEHICLE DETECTION</p>}
                  {isComplete && <p>ANALYSIS COMPLETE</p>}
                  {isComplete && <p>TOTAL SLOTS: {stats.total}</p>}
                  {isComplete && <p>OCCUPIED SLOTS: {stats.occupied}</p>}
                  {isComplete && <p>AVAILABLE SLOTS: {stats.available}</p>}
                  {isComplete && <p>OCCUPANCY RATE: {((stats.occupied / stats.total) * 100).toFixed(1)}%</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
