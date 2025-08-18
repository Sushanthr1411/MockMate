import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { FloatingCTA } from "@/components/floating-cta"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "InterviewAI Pro - Premium AI Interview Preparation",
  description: "Master your interviews with AI-powered preparation, resume analysis, and mock interviews",
  generator: "InterviewAI Pro",
  keywords: ["AI interview", "interview preparation", "resume analysis", "mock interview", "career coaching"],
  authors: [{ name: "InterviewAI Pro Team" }],
  openGraph: {
    title: "InterviewAI Pro - Premium AI Interview Preparation",
    description: "Master your interviews with AI-powered preparation, resume analysis, and mock interviews",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-mono: ${jetbrainsMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "InterviewAI Pro",
              description: "Premium AI Interview Preparation Platform",
              url: "https://interviewai-pro.com",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="relative" id="main-content" role="main">
              {children}
            </main>
            <FloatingCTA />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
