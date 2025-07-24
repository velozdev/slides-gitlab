"use client";

import { useState, useEffect, useCallback } from "react";
import { MarkdownParser } from "@/lib/MarkdownParser";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Settings } from "lucide-react";
import Link from "next/link";
import SlideRenderer from "@/components/SlideRenderer";

interface SlideEntry {
  name: string;
  import: string;
}

// Markdown Parser Module
export default function SlideshowViewerClient({ slidesIndex }: { slidesIndex: SlideEntry[] }) {
  const params = useParams();
  const [slides, setSlides] = useState<Array<{ title: string; content: string }>>([]);
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fontFamily, setFontFamily] = useState("font-sans");

  const startPresentation = () => {
    setIsPresenting(true);
    setCurrentSlide(0);
    setCurrentItem(0);
  };

  // Load theme from localStorage and set <body> class
  useEffect(() => {
    const savedTheme = localStorage.getItem("slideshow-theme");
    const savedFont = localStorage.getItem("slideshow-font");
    const themeClass = savedTheme ? `theme-${savedTheme}` : "theme-dark";
    document.body.classList.remove("theme-light", "theme-dark", "theme-corporate", "theme-minimal");
    document.body.classList.add(themeClass);
    if (savedFont) setFontFamily(savedFont);
  }, []);

  // Check for direct presentation mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("present") === "true") {
      setIsPresenting(true);
      setCurrentSlide(0);
      setCurrentItem(0);
    }
  }, []);

  const nextItem = useCallback(() => {
    if (!slides[currentSlide]) return;
    const currentSlideContent = slides[currentSlide].content;
    // Count list items and table rows
    const listItems = (currentSlideContent.match(/^[*-] /gm) || []).length;
    // Count table rows in markdown, including last row at end of string
    const tableRowMatches = currentSlideContent.match(/\|[^\n]*\|[^\n]*(?:\n|$)/g) || [];
    // Exclude header and separator rows
    let tableRows = 0;
    if (tableRowMatches.length >= 3) {
      tableRows = tableRowMatches.length - 2;
    }
    const revealableItems = listItems + tableRows;
    if (currentItem < revealableItems - 1) {
      setCurrentItem(currentItem + 1);
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setCurrentItem(0);
    }
  }, [slides, currentSlide, currentItem]);

  const prevItem = useCallback(() => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    } else if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      const prevSlideContent = slides[currentSlide - 1].content;
      const listItems = (prevSlideContent.match(/^[*-] /gm) || []).length;
      const tableRowMatches = prevSlideContent.match(/\|[^\n]*\|[^\n]*(?:\n|$)/g) || [];
      let tableRows = 0;
      if (tableRowMatches.length >= 3) {
        tableRows = tableRowMatches.length - 2;
      }
      setCurrentItem(Math.max(0, listItems + tableRows - 1));
    }
  }, [currentItem, currentSlide, slides]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isPresenting) return;
      switch (event.key) {
        case "ArrowRight":
        case "Enter":
        case " ":
          event.preventDefault();
          nextItem();
          break;
        case "ArrowLeft":
          event.preventDefault();
          prevItem();
          break;
        case "Escape":
          event.preventDefault();
          // Go to dashboard (base href)
          window.location.href = "/";
          break;
      }
    };
    const handleClick = () => {
      if (isPresenting) {
        nextItem();
      }
    };
    if (isPresenting) {
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClick);
    };
  }, [isPresenting, nextItem, prevItem]);

  const parseMarkdown = useCallback((content: string) => MarkdownParser.parseSlides(content), []);

  // Load slideshow content directly from imported markdown files
  useEffect(() => {
    // Ensure slug is defined before using in loadSlideshow
    const loadSlideshow = async () => {
      try {
        if (!params || typeof params.slug === 'undefined') {
          setLoading(false);
          return;
        }
        const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
        const slug = decodeURIComponent(rawSlug || "");
        const slideEntry = slidesIndex.find((s: SlideEntry) => s.name === slug);
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
  }, [params, slidesIndex, parseMarkdown]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading presentation...</p>
        </div>
      </div>
    );
  }

  if ((isPresenting || new URLSearchParams(window.location.search).get("present") === "true") && slides.length > 0) {
    // Convert slides to HTML strings for SlideRenderer
    const slideHtmls = slides.map((slide, index) => 
      MarkdownParser.convertToHTML(slide.content, index)
    );

    return (
      <div className={`fixed inset-0 bg-background text-foreground flex flex-col ${fontFamily}`}
        style={{ fontFamily: `var(--font-family)` }}>
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <div className="max-w-4xl w-full text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-in">{slides[currentSlide].title}</h1>
            <div className="text-xl md:text-2xl leading-relaxed">
              <SlideRenderer
                currentSlide={currentSlide}
                slides={slideHtmls}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 text-sm opacity-70">
          <div>
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <div>Press Enter/Space/Click to advance • Arrow keys to navigate • Esc to exit</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${fontFamily}`}
      style={{ fontFamily: `var(--font-family)` }}>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">{slides[0]?.title}</h1>
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
                      __html: MarkdownParser.convertToHTML(slide.content, index),
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
