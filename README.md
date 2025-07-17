# Markdown Slides App

A Next.js app for creating, managing, and presenting professional slide presentations from Markdown files. Just add your `.md` files to the `/slides` folder and they will automatically appear in the dashboard and be available for presentation.

## Features

- **Automatic Slide Indexing:**
  - All Markdown files in `/slides` are auto-detected and indexed at build time.
  - No need to manually update code when adding or removing presentations.
- **Dashboard:**
  - Lists all available presentations with title and slide count.
  - Start a presentation with one click.
- **Presentation Mode:**
  - Clean, keyboard/mouse-navigable slide viewer.
  - Animates bullet points and supports Markdown tables, code, and formatting.
- **Custom Themes:**
  - Change background, text color, and font for your presentations.
- **Upload/Preview:**
  - Try out custom Markdown files without adding them to the repo.

## How It Works

- On build, a script scans `/slides` for `.md` files and generates a static TypeScript index (`lib/slides-index.ts`) with imports and metadata.
- The dashboard and presentation pages use this index for fast, static access to all slides.
- Each Markdown file is split into slides using `#` headings.

## Usage

1. **Add Slides:**
   - Place your Markdown files in the `/slides` directory.
   - Use `#` headings to separate slides within a file.
2. **Build/Run:**
   - Run the build script before starting or building:
     ```
     node scripts/generate-slides-index.js
     pnpm dev
     # or
     pnpm build && pnpm start
     ```
   - (The script can be automated in your `package.json`.)
3. **View Dashboard:**
   - Go to the home page to see all available presentations.
   - Click "Start Presentation" to present any slide deck.

## Development

- Built with Next.js, React, and Tailwind CSS.
- Add new Markdown files to `/slides` and re-run the build script to update the dashboard.
- To automate slide indexing, add this to your `package.json`:
  ```json
  "scripts": {
    "prebuild": "node scripts/generate-slides-index.js"
  }
  ```

## Folder Structure

- `/slides` — Your Markdown slide decks
- `/lib/slides-index.ts` — Auto-generated slide index (do not edit manually)
- `/scripts/generate-slides-index.js` — Build script for indexing slides
- `/app` — Next.js app source

## License

MIT
