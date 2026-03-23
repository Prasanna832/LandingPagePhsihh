import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { SmoothScroll } from '@/components/SmoothScroll'

const inter = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Phish Guard AI',
    default: 'Phish Guard AI - Stop Phishing Before It Starts',
  },
  description:
    'Phish Guard AI scans emails, URLs, and attachments in real-time to stop threats before they spread. Enterprise-grade phishing protection powered by AI.',
  keywords: ['phishing protection', 'email security', 'AI security', 'threat detection'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg text-fg antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>
          <ScrollProgress />
          <NavBar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
