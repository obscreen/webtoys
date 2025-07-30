import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WebToys - Build Interactive Mini-Apps",
  description: "Create and customize interactive React components with an intuitive visual interface.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="vsc-initialized">{children}</body>
    </html>
  )
}

import './css/globals.css'