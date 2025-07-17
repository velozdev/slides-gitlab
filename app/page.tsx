"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Settings, Upload, FileText, Clock } from "lucide-react"
import { slidesIndex } from "@/lib/slides-index"
import { moduleTimes } from "@/lib/module-times"

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
    const name = slide.name;
    return {
      name,
      title: getTitleFromMarkdown(slide.import).replaceAll('**', ''),
      slideCount: (slide.import.match(/^# /gm) || []).length,
      path: `/slides/${name}`,
      time: moduleTimes[name] || Math.max(15, ((slide.import.match(/^# /gm) || []).length * 3)),
    }
  })

  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-sans" style={{ fontFamily: 'var(--font-family)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Markdown Slideshow</h1>
          <p className="mb-6">Professional presentations from markdown files</p>

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
          <h2 className="text-2xl font-semibold mb-6">Available Presentations</h2>
          {slideshows.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slideshows.map((slideshow) => (
                <Card
                  key={slideshow.name}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${slideshow.title}`}
                  className="group relative grid grid-rows-[auto_1fr] grid-cols-1 min-h-0 h-32 rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer focus:ring-2 focus:ring-primary"
                  onClick={e => {
                    if (!(e.target as HTMLElement).closest('a,button')) {
                      document.getElementById(`card-link-${slideshow.name}`)?.click();
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById(`card-link-${slideshow.name}`)?.click();
                    }
                  }}
                >
                  <CardTitle className="text-[1.1rem] font-bold leading-tight mb-2 col-span-2">
                    {slideshow.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 text-muted-foreground text-[0.95rem] font-normal">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>{slideshow.slideCount} slides</span>
                    <span className="mx-1">·</span>
                    <Clock className="w-4 h-4" />
                    <span>{slideshow.time} min</span>
                  </div>
                  <Button
                    asChild
                    size="icon"
                    className="ml-auto w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center shadow-md border-none row-start-2 col-start-2"
                    style={{ boxShadow: '0 4px 16px 0 rgba(37,99,235,0.10)' }}
                  >
                    <Link
                      id={`card-link-${slideshow.name}`}
                      href={`${slideshow.path}?present=true`}
                      tabIndex={-1}
                      aria-label={`Start presentation: ${slideshow.title}`}
                    >
                      <Play className="w-6 h-6" />
                      <span className="sr-only">Start Presentation</span>
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No presentations found</h3>
                <p className="mb-4">Add markdown files to the slides folder to see them here.</p>
                <Link href="/try-md">
                  <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Upload className="w-4 h-4" />
                    Upload Custom Markdown
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-card/50 backdrop-blur-sm">
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
