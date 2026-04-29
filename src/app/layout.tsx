import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Little & Loved | Baby Clothes',
  description: 'Soft, safe, and beautifully made baby clothes. Ethically produced with certified organic and baby-safe materials.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream font-sans antialiased">
        <Header />
        <main>{children}</main>
        <footer className="mt-20 border-t border-pink-100 bg-blush py-10 text-center text-sm text-pink-400">
          <p className="mb-1 font-display text-base text-pink-500">Little &amp; Loved</p>
          <p>Certified organic · Baby-safe dyes · Made with love</p>
        </footer>
      </body>
    </html>
  )
}
