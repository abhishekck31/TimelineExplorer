import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TimeLine Explorer',
  description: 'Explore the timeline of reputed Companies',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
