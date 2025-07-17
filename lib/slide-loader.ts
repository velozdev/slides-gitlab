import fs from "fs"
import path from "path"

export function getMarkdownSlides() {
  const slidesDir = path.join(process.cwd(), "slides")
  const files = fs.readdirSync(slidesDir)
  return files.filter((file) => file.endsWith(".md"))
}
