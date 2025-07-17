"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Settings } from "lucide-react"
import Link from "next/link"

interface Slide {
  title: string
  content: string
}

interface SlideTheme {
  background: string
  textColor: string
  accentColor: string
  fontFamily: string
}

export default function SlideshowViewer() {
  const params = useParams()
  const router = useRouter()
  const [slides, setSlides] = useState<Slide[]>([])
  const [isPresenting, setIsPresenting] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentItem, setCurrentItem] = useState(0)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<SlideTheme>({
    background: "bg-white",
    textColor: "text-gray-900",
    accentColor: "text-blue-700",
    fontFamily: "font-mono",
  })

  const startPresentation = () => {
    setIsPresenting(true)
    setCurrentSlide(0)
    setCurrentItem(0)
  }

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("slideshow-theme")
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme))
    }
  }, [])

  // Check for direct presentation mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("present") === "true") {
      setIsPresenting(true)
      setCurrentSlide(0)
      setCurrentItem(0)
    }
  }, [])

  const nextItem = () => {
    if (!slides[currentSlide]) return

    const currentSlideContent = slides[currentSlide].content
    const listItems = (currentSlideContent.match(/^[*-] /gm) || []).length

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
      const listItems = (prevSlideContent.match(/^[*-] /gm) || []).length
      setCurrentItem(Math.max(0, listItems - 1))
    }
  }

  const exitPresentation = () => {
    setIsPresenting(false)
    setCurrentSlide(0)
    setCurrentItem(0)
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

  // Load slideshow content directly from imported markdown files
  useEffect(() => {
    const loadSlideshow = async () => {
      try {
        // Use decodeURIComponent to match slug with slideIndex
        const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
        const slug = decodeURIComponent(rawSlug || "");
        // Import the generated slidesIndex
        const { slidesIndex } = await import("@/lib/slides-index");
        const slideEntry = slidesIndex.find((s) => s.name === slug);
        if (slideEntry) {
          const parsedSlides = parseMarkdown(slideEntry.import);
          setSlides(parsedSlides);
        } else {
          console.error("Slideshow not found:", slug);
        }
      } catch (error) {
        console.error("Failed to load slideshow:", error);
      }
      setLoading(false);
    };
    loadSlideshow();
  }, [params.slug]);

  const parseMarkdown = (markdown: string): Slide[] => {
    const sections = markdown.split(/^# /gm).filter((section) => section.trim())

    return sections.map((section) => {
      const lines = section.trim().split("\n")
      let title = lines[0] || "Untitled Slide"

      // Remove double asterisks from titles
      title = title.replace(/^\*\*(.*?)\*\*$/, "$1")

      const content = lines.slice(1).join("\n").trim()

      return { title, content }
    })
  }

  const convertMarkdownToHTML = (markdown: string): string => {
    let html = markdown
      // Handle images ![alt](url)
      .replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="inline-block align-middle my-4 max-h-24" />')
      // Handle tables first (before other processing)
      .replace(/\|(.+)\|/g, (match, content) => {
        // This is a table row
        const cells = content.split("|").map((cell: string) => cell.trim())
        return `<tr>${cells.map((cell: string) => `<td>${cell}</td>`).join("")}</tr>`
      })
      // Wrap table rows in table tags
      .replace(/(<tr>.*<\/tr>)/gs, (match) => {
        const rows = match.split("</tr>").filter((row) => row.includes("<tr>"))
        const tableRows = rows.map((row) => row + "</tr>").join("")
        return `<table class="table-auto w-full border-collapse border border-gray-600 my-4">${tableRows}</table>`
      })
      // Headers - handle double asterisks in headers
      .replace(/^### \*\*(.*?)\*\*$/gm, '<h3 class="text-2xl font-semibold mb-4">$1</h3>')
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibent mb-4">$1</h3>')
      .replace(/^## \*\*(.*?)\*\*$/gm, '<h2 class="text-3xl font-bold mb-6">$1</h2>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-6">$1</h2>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-yellow-300">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-blue-300">$1</em>')
      // Code (handle backticks properly)
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-yellow-300 px-2 py-1 rounded font-mono text-sm">$1</code>')
      // Unordered lists - handle both * and -
      .replace(/^[*-] (.+)$/gm, '<li class="list-item unordered">$1</li>')
      // Ordered lists - handle 1. 2. etc
      .replace(/^\d+\. (.+)$/gm, '<li class="list-item ordered">$1</li>')
      // Wrap consecutive ordered list items in <ol>
      .replace(/(<li class=\"list-item ordered\">.*?<\/li>)(\s*<li class=\"list-item ordered\">.*?<\/li>)*/gs, (match) => {
        return `<ol class=\"space-y-3 my-4 list-decimal list-inside mx-auto text-left\" style=\"max-width: 600px;\">${match}</ol>`
      })
      // Wrap consecutive unordered list items in <ul>
      .replace(/(<li class=\"list-item unordered\">.*?<\/li>)(\s*<li class=\"list-item unordered\">.*?<\/li>)*/gs, (match) => {
        return `<ul class=\"space-y-3 my-4 list-disc list-inside mx-auto text-left\" style=\"max-width: 600px;\">${match}</ul>`
      })
      // Paragraphs - but avoid wrapping tables and lists
      .replace(/^(?!<[uth]|<li)(.+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>')
      // Clean up empty paragraphs and fix table styling
      .replace(/<p[^>]*><\/p>/g, "")
      .replace(/<table[^>]*>/g, '<table class="table-auto w-full border-collapse my-6 text-left">')
      .replace(/<td>/g, '<td class="border border-gray-600 px-4 py-3 align-top">')
      .replace(/<tr>/g, '<tr class="border-b border-gray-600">')

    return html
  }

  const renderSlideContent = (content: string, slideIndex: number) => {
    const html = convertMarkdownToHTML(content)

    // If this is the current slide in presentation mode, handle animations
    if (isPresenting && slideIndex === currentSlide) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(`<div>${html}</div>`, "text/html")
      const listItems = doc.querySelectorAll("li.list-item")

      // Show list items progressively based on currentItem
      listItems.forEach((item, index) => {
        if (index <= currentItem) {
          item.classList.add("animate-in")
          item.classList.remove("animate-out")
        } else {
          item.classList.add("animate-out")
          item.classList.remove("animate-in")
        }
      })

      return doc.body.innerHTML
    }

    return html
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading presentation...</p>
        </div>
      </div>
    )
  }

  if ((isPresenting || new URLSearchParams(window.location.search).get("present") === "true") && slides.length > 0) {
    return (
      <div className={`fixed inset-0 ${theme.background} ${theme.textColor} ${theme.fontFamily} flex flex-col`}>
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
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>

        {slides.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{slides[0]?.title}</h1>
                <p className="text-gray-600">{slides.length} slides</p>
              </div>
              <Button onClick={startPresentation} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Presentation
              </Button>
            </div>

            <div className="grid gap-6">
              {slides.map((slide, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Slide {index + 1}: {slide.title}
                    </h3>
                  </div>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdownToHTML(slide.content),
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
