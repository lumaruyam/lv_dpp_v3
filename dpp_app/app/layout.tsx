import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { OwnershipProvider } from "./contexts/OwnershipContext"
import { HamburgerMenu } from "@/components/hamburger-menu"
import "./globals.css"

export const metadata: Metadata = {
  title: "Louis Vuitton Digital Product Passport",
  description: "Verify, authenticate, and explore your Louis Vuitton product lifecycle",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <OwnershipProvider>
          <HamburgerMenu />
          <main className="pt-14">{children}</main>
        </OwnershipProvider>
        <Analytics />
      </body>
    </html>
  )
}
