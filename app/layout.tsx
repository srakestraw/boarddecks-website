import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Board Decks',
  description: 'Professional board deck templates and tools',
  keywords: 'board decks, presentations, templates, business',
  authors: [{ name: 'Board Decks Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <main className="max-w-screen-xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  )
} 