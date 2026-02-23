import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://code-sentinel.dev"),
  
  title: {
    default: "CodeSentinel | Immutable CI Security for High-Velocity Teams",
    template: "%s | CodeSentinel"
  },
  
  description: "Stop drowning in security noise. CodeSentinel delivers zero-noise CI security and AI-powered fixes for teams that ship at the speed of thought.",
  
  keywords: [
    "security scanning",
    "automated security",
    "code security",
    "vulnerability detection",
    "GitHub security",
    "repository scanning",
    "DevSecOps",
    "CI/CD security",
    "code analysis",
    "security automation",
    "SAST",
    "dependency scanning",
    "security policies",
    "developer security tools",
    "application security",
    "secure development",
    "API key detection",
    "secret scanning",
    "security compliance",
    "code quality"
  ],

  authors: [{ name: "CodeSentinel Team" }],
  
  creator: "CodeSentinel",
  
  publisher: "CodeSentinel",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://code-sentinel.dev",
    title: "CodeSentinel - Ship Secure Code with Automated Security Scanning",
    description: "Automate security scans, enforce policies, and ship with confidence. CodeSentinel protects your code before it reaches production. Join 2,800+ developers.",
    siteName: "CodeSentinel",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "CodeSentinel - Automated Security Scanning",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeSentinel - Ship Secure Code with Automated Security Scanning",
    description: "Automate security scans, enforce policies, and ship with confidence. Join 2,800+ developers protecting their code.",
    images: ["/logo/logo.png"],
    creator: "@codesentinel",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/logo/logo-icons.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo/logo-icons.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo/logo-icons.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo/logo-icons.png",
  },

  manifest: "/manifest.json",

  alternates: {
    canonical: "https://code-sentinel.dev",
  },

  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },

  category: "technology",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CodeSentinel",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "description": "CodeSentinel automates security scanning for your repositories. Detect vulnerabilities, enforce policies, and ship secure code with confidence.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/PreOrder"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "2847"
  },
  "featureList": [
    "Automated security scanning",
    "Vulnerability detection",
    "Policy enforcement",
    "GitHub integration",
    "AI-powered suggestions",
    "Real-time alerts",
    "Dependency scanning",
    "Secret detection"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}