"use client"

import Link from "next/link"
import Image from "next/image"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { BadgeEngineService } from "@/lib/services/badge-engine.service"
import ownershipDataArray from "@/app/data/ownership.json"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"

const ownershipData = ownershipDataArray[0]

const BADGE_IMAGES: Record<string, string> = {
  "first-owner": "/badges/first-owner-stamp.png",
  "craftsmanship-heritage": "/badges/craftsmanship-heritage-stamp.png",
  "sustainability-guardian": "/badges/sustainability-guardian-stamp.png",
  "three-year-steward": "/badges/three-year-steward-stamp.png",
}

export default function HomePage() {
  const { product, ownership, isActivated } = useOwnership()

  const achievedBadges =
    ownership.currentOwner && ownership.activatedAt
      ? BadgeEngineService.getAchievedBadges(product.productId, ownership.currentOwner, ownership.activatedAt)
      : []

  const lostItemAlert = ownershipData?.ownership?.lostItemAlertOptIn

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Authenticity */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">
              Digital Product Passport
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight text-[#0d0b08] leading-[0.95] max-w-4xl">
              Authenticity
              <br />
              <span className="text-[#0d0b08]">Confirmed</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl font-sans text-[#323231] leading-relaxed max-w-2xl mt-8">
              {isActivated
                ? "This Louis Vuitton piece has been verified and permanently recorded on the Aura Blockchain. Your certificate of authenticity is immutable."
                : "Complete ownership activation to receive your blockchain-verified certificate of authenticity."}
            </p>
          </ScrollReveal>
          {isActivated && (
            <ScrollReveal delay={300}>
              <div className="flex flex-wrap gap-8 mt-12 text-sm font-sans">
                <div>
                  <span className="block text-[#aaaaaa] uppercase tracking-wider text-xs mb-1">Network</span>
                  <span className="text-[#0d0b08]">Aura Private Blockchain</span>
                </div>
                <div>
                  <span className="block text-[#aaaaaa] uppercase tracking-wider text-xs mb-1">Certificate</span>
                  <span className="font-mono text-[#0d0b08]">{product.digitalId}</span>
                </div>
                {lostItemAlert && (
                  <div>
                    <span className="block text-[#aaaaaa] uppercase tracking-wider text-xs mb-1">Security</span>
                    <span className="flex items-center gap-2 text-[#0d0b08]">
                      <span className="w-2 h-2 rounded-full bg-[#9f8453]" />
                      Lost Item Alert Active
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </ScrollSection>

      {/* Product Hero */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-square max-w-lg mx-auto md:mx-0">
                <img
                  src="https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tailored-bomber--HTB40WLGT151_PM2_Front%20view.png?wid=2400&hei=2400"
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal direction="right">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans mb-4">
                  {product.collection}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={100}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#0d0b08] leading-[1.1] mb-6">
                  {product.name}
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={200}>
                <p className="text-sm uppercase tracking-wider text-[#aaaaaa] font-sans mb-12">
                  {product.manufactureDate}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={300}>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-2 font-sans">Category</p>
                    <p className="text-base font-sans text-[#0d0b08]">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-2 font-sans">Size</p>
                    <p className="text-base font-sans text-[#0d0b08]">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-2 font-sans">Made In</p>
                    <p className="text-base font-sans text-[#0d0b08]">{product.madeIn}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-2 font-sans">Color</p>
                    <p className="text-base font-sans text-[#0d0b08]">{product.color}</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={400}>
                <div className="mt-12">
                  <Link
                    href="/collection"
                    className="inline-flex items-center gap-2 text-sm font-sans text-[#0d0b08] uppercase tracking-wider hover:text-[#9f8453] transition-colors group"
                  >
                    <span className="border-b border-[#0d0b08] group-hover:border-[#9f8453] pb-1">
                      View All Owned Items
                    </span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#aaaaaa]/30" />
      </div>

      {/* Heritage Achievements */}
      {achievedBadges.length > 0 && (
        <ScrollSection>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">
                Your Journey
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#0d0b08] leading-[1.1] max-w-3xl mb-6">
                Heritage Achievements
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg font-sans text-[#323231] leading-relaxed max-w-2xl mb-16">
                Your stewardship of this Louis Vuitton piece has earned recognition for preservation, craftsmanship, and responsible luxury.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {achievedBadges.map((badge, index) => (
                <ScrollReveal key={badge.id} delay={300 + index * 100}>
                  <div className="space-y-6">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={BADGE_IMAGES[badge.id] || "/badges/first-owner-stamp.jpg"}
                        alt={badge.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-wider text-[#9f8453] font-sans">Achieved</p>
                      <h4 className="text-xl font-sans text-[#0d0b08]">{badge.title}</h4>
                      <p className="text-sm font-sans text-[#323231] leading-relaxed">{badge.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={600}>
              <div className="mt-16">
                <Link
                  href="/achievements"
                  className="inline-flex items-center gap-2 text-sm font-sans text-[#0d0b08] uppercase tracking-wider hover:text-[#9f8453] transition-colors group"
                >
                  <span className="border-b border-[#0d0b08] group-hover:border-[#9f8453] pb-1">
                    View All Achievements
                  </span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Thin Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#aaaaaa]/30" />
      </div>

      {/* DPP Navigation */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">
              Explore
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#0d0b08] leading-[1.1] max-w-3xl mb-6">
              Digital Product Passport
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg font-sans text-[#323231] leading-relaxed max-w-2xl mb-16">
              Comprehensive product information, verified on blockchain. Explore materials, sustainability, care guidance, and ownership documentation.
            </p>
          </ScrollReveal>

          <div className="space-y-0">
            {[
              {
                href: "/dpp/materials",
                title: "Materials & Origins",
                description: "Complete traceability from raw materials to finished product"
              },
              {
                href: "/dpp/sustainability",
                title: "Sustainability Impact",
                description: "Environmental footprint measured across the product lifecycle"
              },
              {
                href: "/dpp/care",
                title: "Care & Repair",
                description: "Expert guidance for preserving your Louis Vuitton piece"
              },
              {
                href: "/dpp/certificate",
                title: "Certificate & Ownership",
                description: "Blockchain-verified certificate of authenticity"
              }
            ].map((item, index) => (
              <ScrollReveal key={item.href} delay={300 + index * 100}>
                <Link href={item.href} className="group block">
                  <div className="py-8 md:py-12 border-b border-[#aaaaaa]/30 flex justify-between items-center">
                    <div className="space-y-2">
                      <h4 className="text-2xl md:text-3xl font-sans text-[#0d0b08] group-hover:text-[#9f8453] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm font-sans text-[#aaaaaa]">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-2xl md:text-3xl text-[#aaaaaa] group-hover:text-[#9f8453] group-hover:translate-x-2 transition-all">
                      →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Footer */}
      <footer className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <p className="text-lg font-sans tracking-[0.2em] text-[#0d0b08] mb-2">LOUIS VUITTON</p>
                <p className="text-xs font-sans text-[#aaaaaa]">Digital Product Passport</p>
              </div>
              <p className="text-xs font-sans text-[#aaaaaa]">
                Verified on Aura Blockchain
              </p>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </main>
  )
}
