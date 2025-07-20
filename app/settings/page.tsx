"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Palette, Type, Monitor } from "lucide-react"

const themes = {
  dark: { name: "Dark", className: "theme-dark" },
  light: { name: "Light", className: "theme-light" },
  corporate: { name: "Corporate", className: "theme-corporate" },
  minimal: { name: "Minimal", className: "theme-minimal" },
}

const fontFamilies = {
  "font-sans": "Sans Serif",
  "font-serif": "Serif",
  "font-mono": "Monospace",
}

export default function SettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [fontFamily, setFontFamily] = useState("font-sans");

  useEffect(() => {
    const savedTheme = localStorage.getItem("slideshow-theme");
    const savedFont = localStorage.getItem("slideshow-font");
    if (savedTheme && savedTheme in themes) {
      setSelectedTheme(savedTheme);
      document.body.classList.remove(...Object.values(themes).map(t => t.className));
      document.body.classList.add(themes[savedTheme as keyof typeof themes].className);
    }
    if (savedFont) setFontFamily(savedFont);
  }, []);

  const handleThemeChange = (themeKey: string) => {
    setSelectedTheme(themeKey);
    localStorage.setItem("slideshow-theme", themeKey);
    document.body.classList.remove(...Object.values(themes).map(t => t.className));
    document.body.classList.add(themes[themeKey as keyof typeof themes].className);
  };

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    localStorage.setItem("slideshow-font", font);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <div></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme Settings
              </CardTitle>
              <CardDescription>Customize the appearance of your presentations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="theme-select" className="text-sm font-medium">
                  Preset Themes
                </Label>
                <Select value={selectedTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themes).map(([key, themeData]) => (
                      <SelectItem key={key} value={key}>
                        {themeData.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="font-select" className="text-sm font-medium">
                  Font Family
                </Label>
                <Select value={fontFamily} onValueChange={handleFontChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(fontFamilies).map(([key, name]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Preview
              </CardTitle>
              <CardDescription>See how your slides will look with the current theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`p-6 rounded-lg border-2 border-gray-200 ${fontFamily}`}
                style={{ fontFamily: `var(--font-family)` }}
              >
                <h1 className="text-2xl font-bold mb-4">Sample Slide Title</h1>
                <div className="space-y-3">
                  <p>This is how your slide content will appear.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-accent">
                      <span className="mr-2">▶</span>
                      First bullet point
                    </li>
                    <li className="flex items-center text-accent">
                      <span className="mr-2">▶</span>
                      Second bullet point
                    </li>
                    <li className="flex items-center text-accent">
                      <span className="mr-2">▶</span>
                      Third bullet point
                    </li>
                  </ul>
                  <p>
                    <strong>Bold text</strong> and <em>italic text</em> styling.
                  </p>
                  <p>
                    Code snippets look like <code className="bg-gray-800 px-2 py-1 rounded text-accent">this</code>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branding Settings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Branding & Customization
              </CardTitle>
              <CardDescription>Additional customization options for your presentations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Available Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ Custom color themes</li>
                    <li>✅ Font family selection</li>
                    <li>✅ Animated list reveals</li>
                    <li>✅ Keyboard navigation</li>
                    <li>✅ Slide counter</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Coming Soon:</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li>🔄 Custom logo placement</li>
                    <li>🔄 Background images</li>
                    <li>🔄 Transition effects</li>
                    <li>🔄 Speaker notes</li>
                    <li>🔄 Export to PDF</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Notice */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-green-800 text-sm">
                Settings are automatically saved to your browser&apos;s local storage.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
