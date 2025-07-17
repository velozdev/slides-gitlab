"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Settings, Upload, FileText } from "lucide-react"
import { slidesIndex } from "@/lib/slides-index"

function getTitleFromMarkdown(md: string): string {
  // Try to extract the first H1 or first line as title
  const match = md.match(/^# (.+)$/m)
  if (match) return match[1]
  // fallback: first non-empty line
  const firstLine = md.split("\n").find(line => line.trim())
  return firstLine || "Untitled"
}

export default function HomePage() {
  // No loading state needed, slidesIndex is static
  const slideshows = slidesIndex.map((slide) => {
    return {
      name: slide.name,
      title: getTitleFromMarkdown(slide.import),
      slideCount: (slide.import.match(/^# /gm) || []).length,
      path: `/slides/${slide.name}`,
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Markdown Slideshow</h1>
          <p className="text-gray-600 mb-6">Professional presentations from markdown files</p>

          <div className="flex justify-center gap-4">
            <Link href="/try-md">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Upload className="w-4 h-4" />
                Upload Custom MD
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Available Slideshows */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Available Presentations</h2>

          {slideshows.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slideshows.map((slideshow) => (
                <Card key={slideshow.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="text-lg leading-tight">{slideshow.title}</span>
                      <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    </CardTitle>
                    <CardDescription>{slideshow.slideCount} slides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`${slideshow.path}?present=true`}>
                      <Button className="w-full flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Start Presentation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No presentations found</h3>
                <p className="text-gray-600 mb-4">Add markdown files to the slides folder to see them here.</p>
                <Link href="/try-md">
                  <Button className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Custom Markdown
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>How to create and present your slideshows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Create Markdown</h4>
                <p className="text-sm text-gray-600">Use H1 headings (#) to separate slides</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Upload or Select</h4>
                <p className="text-sm text-gray-600">Choose from available presentations or upload your own</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Present</h4>
                <p className="text-sm text-gray-600">Navigate with keyboard or mouse clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
