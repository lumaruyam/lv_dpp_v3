"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, ArrowLeft, ExternalLink } from "lucide-react"

interface MenuItem {
  label: string
  href?: string
  external?: boolean
  children?: MenuItem[]
  disabled?: boolean
}

const menuItems: MenuItem[] = [
  {
    label: "My Product",
    children: [
      { label: "Product Overview", href: "/home" },
      { label: "My Collection", href: "/collection" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  {
    label: "Product Details",
    children: [
      { label: "Materials & Craftsmanship", href: "/dpp/materials" },
      { label: "Care Instructions", href: "/dpp/care" },
      { label: "Sustainability", href: "/dpp/sustainability" },
    ],
  },
  {
    label: "Certificate",
    children: [
      { label: "View Certificate", href: "/dpp/certificate" },
      { label: "Transfer Ownership", href: "/dpp/certificate/transfer" },
    ],
  },
  {
    label: "Louis Vuitton",
    href: "https://us.louisvuitton.com/eng-us/homepage",
    external: true,
  },
]

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
    setActiveSection(null)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleToggle = () => {
    if (isOpen) {
      setActiveSection(null)
      setTimeout(() => setIsOpen(false), 100)
    } else {
      setIsOpen(true)
    }
  }

  const handleSectionClick = (label: string) => {
    setIsAnimating(true)
    setActiveSection(label)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleBack = () => {
    setIsAnimating(true)
    setActiveSection(null)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const activeMenu = activeSection
    ? menuItems.find((item) => item.label === activeSection)
    : null

  return (
    <>
      {/* Fixed Header with Hamburger */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/95 backdrop-blur-sm border-b border-[#e1e1e1]">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Hamburger Button */}
          <button
            onClick={handleToggle}
            className="relative flex items-center gap-3 p-2 -ml-2 group"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {/* Notification dot */}
            <span className="absolute top-1 right-0 md:right-auto md:left-5 w-1.5 h-1.5 bg-[#d6852a] rounded-full" />
            
            {/* Hamburger icon */}
            <div className="relative w-4 h-3.5 flex flex-col justify-between">
              {/* Top bar */}
              <span
                className={`absolute top-0 left-0 w-4 h-px bg-black transition-all duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] origin-center ${
                  isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              {/* Middle bar - transforms to X */}
              <span
                className={`absolute top-[6px] left-0 w-4 h-px bg-black transition-all duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] origin-center ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
              <span
                className={`absolute top-[6px] left-0 w-4 h-px bg-black transition-all duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] origin-center ${
                  isOpen ? "-rotate-45" : "rotate-0"
                }`}
              />
              {/* Bottom bar */}
              <span
                className={`absolute bottom-0 left-0 w-4 h-px bg-black transition-all duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] origin-center ${
                  isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
            </div>

            {/* MENU label - desktop only */}
            <span className="hidden md:block relative overflow-hidden h-4">
              <span
                className={`block text-xs font-sans uppercase tracking-wider transition-transform duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] ${
                  isOpen ? "-translate-y-full" : "translate-y-0"
                }`}
              >
                Menu
              </span>
            </span>
          </button>

          {/* Logo */}
          <Link href="/home" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-sm font-sans uppercase tracking-[0.2em] text-[#0d0b08]">
              Louis Vuitton
            </span>
          </Link>

          {/* Placeholder for right side balance */}
          <div className="w-8" />
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleToggle}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <nav
        className={`fixed top-14 left-0 bottom-0 z-40 w-full md:w-1/3 md:max-w-[480px] bg-white transform transition-transform duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="h-full overflow-y-auto overscroll-contain pt-4 pb-16 md:pt-20">
          {/* Main Menu */}
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] ${
              activeSection
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <ul className="px-4 md:px-8">
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className="border-b border-[#e1e1e1] mb-8 pb-8 last:border-0"
                >
                  {item.children ? (
                    <button
                      onClick={() => handleSectionClick(item.label)}
                      className={`w-full flex items-center justify-between group ${
                        item.disabled ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      disabled={item.disabled}
                    >
                      <span className="text-2xl font-sans text-black leading-7 group-hover:underline underline-offset-4">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-black opacity-0 md:group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  ) : item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="text-2xl font-sans text-black leading-7 group-hover:underline underline-offset-4">
                        {item.label}
                      </span>
                      <ExternalLink className="w-4 h-4 text-black opacity-60" />
                    </a>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={`block text-2xl font-sans text-black leading-7 hover:underline underline-offset-4 ${
                        item.disabled ? "opacity-60 pointer-events-none" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Submenu Panel */}
          {activeMenu && (
            <div
              className={`absolute inset-0 pt-4 pb-16 md:pt-20 bg-white transition-all duration-300 ease-[cubic-bezier(0.39,0.575,0.565,1)] ${
                isAnimating
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 md:px-8 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                <span className="text-sm font-sans uppercase tracking-wider text-[#b4b4b4] group-hover:text-black transition-colors">
                  Back
                </span>
              </button>

              {/* Section title */}
              <h2 className="px-4 md:px-8 text-2xl font-sans text-black leading-7 mb-8">
                {activeMenu.label}
              </h2>

              {/* Submenu items */}
              <ul className="px-4 md:px-8">
                {activeMenu.children?.map((child) => (
                  <li key={child.label} className="mb-4">
                    <Link
                      href={child.href || "#"}
                      className={`block text-base md:text-lg font-sans leading-6 transition-colors ${
                        pathname === child.href
                          ? "text-[#9f8453]"
                          : "text-black hover:text-[#b4b4b4]"
                      } ${child.disabled ? "opacity-60 pointer-events-none" : ""}`}
                    >
                      <span className="hover:underline underline-offset-4">
                        {child.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
