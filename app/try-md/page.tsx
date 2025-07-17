"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Play, FileText } from "lucide-react"

interface Slide {
  title: string
  content: string
}

export default function SlideshowApp() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [isPresenting, setIsPresenting] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentItem, setCurrentItem] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const slideshowRef = useRef<HTMLDivElement>(null)

  const parseMarkdown = (markdown: string): Slide[] => {
    // Split by H1 headings
    const sections = markdown.split(/^# /gm).filter((section) => section.trim())

    return sections.map((section) => {
      const lines = section.trim().split("\n")
      const title = lines[0] || "Untitled Slide"
      const content = lines.slice(1).join("\n").trim()

      return { title, content }
    })
  }

  const convertMarkdownToHTML = (markdown: string): string => {
    return (
      markdown
        // Headers
        .replace(/^### (.*$)/gm, "<h3>$1</h3>")
        .replace(/^## (.*$)/gm, "<h2>$1</h2>")
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Code
        .replace(/`(.*?)`/g, "<code>$1</code>")
        // Lists
        .replace(/^\* (.*$)/gm, "<li>$1</li>")
        .replace(/^- (.*$)/gm, "<li>$1</li>")
        // Wrap consecutive list items in ul
        .replace(/(<li>.*<\/li>)/gs, (match) => {
          const items = match.split("</li>").filter((item) => item.includes("<li>"))
          return "<ul>" + items.map((item) => item + "</li>").join("") + "</ul>"
        })
        // Paragraphs
        .replace(/\n\n/g, "</p><p>")
        .replace(/^(?!<[uh]|<li)(.+)$/gm, "<p>$1</p>")
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, "")
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "text/markdown" || file.name.endsWith(".md"))) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const markdown = e.target?.result as string
        const parsedSlides = parseMarkdown(markdown)
        setSlides(parsedSlides)
      }
      reader.readAsText(file)
    }
  }

  const startPresentation = () => {
    setIsPresenting(true)
    setCurrentSlide(0)
    setCurrentItem(0)
  }

  const exitPresentation = () => {
    setIsPresenting(false)
    setCurrentSlide(0)
    setCurrentItem(0)
  }

  const nextItem = () => {
    if (!slides[currentSlide]) return

    const currentSlideContent = slides[currentSlide].content
    const listItems = (currentSlideContent.match(/<li>/g) || []).length

    if (currentItem < listItems - 1) {
      setCurrentItem(currentItem + 1)
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setCurrentItem(0)
    }
  }

  const prevItem = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1)
    } else if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      const prevSlideContent = slides[currentSlide - 1].content
      const listItems = (prevSlideContent.match(/<li>/g) || []).length
      setCurrentItem(Math.max(0, listItems - 1))
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isPresenting) return

      switch (event.key) {
        case "ArrowRight":
        case "Enter":
        case " ":
          event.preventDefault()
          nextItem()
          break
        case "ArrowLeft":
          event.preventDefault()
          prevItem()
          break
        case "Escape":
          exitPresentation()
          break
      }
    }

    const handleClick = () => {
      if (isPresenting) {
        nextItem()
      }
    }

    if (isPresenting) {
      document.addEventListener("keydown", handleKeyPress)
      document.addEventListener("click", handleClick)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("click", handleClick)
    }
  }, [isPresenting, currentSlide, currentItem, slides])

  const renderSlideContent = (content: string, slideIndex: number) => {
    const html = convertMarkdownToHTML(content)

    // If this is the current slide in presentation mode, handle animations
    if (isPresenting && slideIndex === currentSlide) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const listItems = doc.querySelectorAll("li")

      listItems.forEach((item, index) => {
        if (index <= currentItem) {
          item.classList.add("animate-in")
        } else {
          item.classList.add("animate-out")
        }
      })

      return doc.body.innerHTML
    }

    return html
  }

  if (isPresenting && slides.length > 0) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-in">{slides[currentSlide].title}</h1>
            <div
              className="text-xl md:text-2xl leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: renderSlideContent(slides[currentSlide].content, currentSlide),
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center p-4 text-sm opacity-70">
          <div>
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <div>Press Enter/Space/Click to advance • Arrow keys to navigate • Esc to exit</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Markdown Slideshow</h1>
          <p className="text-gray-600">Upload a markdown file and create an interactive presentation</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Markdown File
            </CardTitle>
            <CardDescription>
              Upload a .md file with H1 headings to create slides. Each H1 becomes a new slide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown"
                onChange={handleFileUpload}
                className="flex-1"
              />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>

        {slides.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Preview ({slides.length} slides)</h2>
              <Button onClick={startPresentation} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Presentation
              </Button>
            </div>

            <div className="grid gap-6">
              {slides.map((slide, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg">
                      Slide {index + 1}: {slide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: convertMarkdownToHTML(slide.content),
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {slides.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No slides yet</h3>
              <p className="text-gray-600 mb-4">
                Upload a markdown file to get started. Use H1 headings (#) to separate slides.
              </p>
              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
                <strong>Example markdown:</strong>
                <pre className="mt-2 text-left">
                  {`# Welcome Slide
This is the first slide

* Point 1
* Point 2
* Point 3

# Second Slide
This is the second slide

## Subtitle
More content here`}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
