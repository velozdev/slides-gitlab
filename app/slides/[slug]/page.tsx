

import { slidesIndex } from "@/lib/slides-index";
import SlideshowViewerClient from "./SlideshowViewerClient";

// Required for Next.js static export of dynamic routes
export function generateStaticParams() {
  return slidesIndex.map((slide) => ({ slug: slide.name }));
}

export default function SlideshowViewerPage() {
  return <SlideshowViewerClient slidesIndex={slidesIndex} />;
}
