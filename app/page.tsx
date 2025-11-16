import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Home Page Component
 *
 * Landing page for the Parking Slot Analyzer application.
 * Features a retro 1980s computer terminal aesthetic with:
 * - System overview and status
 * - Upload interface (UI only, not yet functional)
 * - Navigation to analysis page
 * - Feature descriptions and system requirements
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 font-mono">
      <div className="container mx-auto px-4 py-8">
        {/* Application header with retro styling */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 border-b-4 border-amber-800 inline-block pb-2">
            PARKING SLOT ANALYZER
          </h1>
          <p className="text-amber-800">v1.0 © 2025</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-amber-100 border-2 border-amber-800 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)]">
            <CardHeader className="border-b-2 border-amber-800">
              <CardTitle className="text-xl">UPLOAD IMAGE</CardTitle>
              <CardDescription className="text-amber-800">Select an aerial image of a parking lot</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="border-2 border-dashed border-amber-800 rounded-md p-8 text-center bg-amber-50">
                  <p className="mb-4">DRAG & DROP IMAGE HERE</p>
                  <Button
                    variant="outline"
                    className="bg-amber-200 border-2 border-amber-800 hover:bg-amber-300 text-amber-900 font-mono"
                  >
                    SELECT FILE
                  </Button>
                </div>
                <div className="text-sm space-y-2">
                  <p>• Supported formats: JPG, PNG</p>
                  <p>• Max file size: 10MB</p>
                  <p>• Best results with clear aerial views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-100 border-2 border-amber-800 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)]">
            <CardHeader className="border-b-2 border-amber-800">
              <CardTitle className="text-xl">SYSTEM STATUS</CardTitle>
              <CardDescription className="text-amber-800">Ready to process images</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 font-mono">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-amber-200 p-3 border border-amber-800">
                    <p className="text-sm">MODEL STATUS</p>
                    <p className="font-bold">READY</p>
                  </div>
                  <div className="bg-amber-200 p-3 border border-amber-800">
                    <p className="text-sm">PROCESSOR</p>
                    <p className="font-bold">IDLE</p>
                  </div>
                  <div className="bg-amber-200 p-3 border border-amber-800">
                    <p className="text-sm">MEMORY USAGE</p>
                    <p className="font-bold">32MB / 512MB</p>
                  </div>
                  <div className="bg-amber-200 p-3 border border-amber-800">
                    <p className="text-sm">LAST RUN</p>
                    <p className="font-bold">NEVER</p>
                  </div>
                </div>
                <Link href="/analyze">
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white border-2 border-green-900 font-mono">
                    START ANALYSIS
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-amber-100 border-2 border-amber-800 shadow-[4px_4px_0px_0px_rgba(146,64,14,1)]">
            <CardHeader className="border-b-2 border-amber-800">
              <CardTitle className="text-xl">ABOUT THIS SYSTEM</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm">
                <p>
                  The Parking Slot Analyzer is designed to automatically detect parking slots, classify their occupancy
                  status (occupied/available), and provide a summary report from aerial images of parking lots.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2 underline">FEATURES:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Automated parking slot detection</li>
                      <li>No-parking zone identification</li>
                      <li>Vehicle detection using YOLOv8</li>
                      <li>Occupancy classification</li>
                      <li>CSV report generation</li>
                      <li>Visual result overlay</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 underline">SYSTEM REQUIREMENTS:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Python 3.8+</li>
                      <li>OpenCV</li>
                      <li>NumPy</li>
                      <li>Pandas</li>
                      <li>Ultralytics YOLOv8</li>
                      <li>4GB RAM minimum</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
