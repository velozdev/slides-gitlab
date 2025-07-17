import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Use the correct favicon path for both dev and prod
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const faviconHref = `${basePath}/veloz-logo.svg`.replace(/\/\//g, '/');
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconHref} type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
