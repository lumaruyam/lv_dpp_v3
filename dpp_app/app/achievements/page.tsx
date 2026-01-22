"use client"

import Link from "next/link"
import Image from "next/image"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { BadgeEngineService } from "@/lib/services/badge-engine.service"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"
import badgesData from "@/app/data/badges.json"
import repairsData from "@/app/data/repairs.json"
import transactionDataArray from "@/app/data/transaction.json"

const transactionData = transactionDataArray[0]

const BADGE_IMAGES: Record<string, string> = {
  "first-owner": "/badges/first-owner-stamp.png",
  "craftsmanship-heritage": "/badges/craftsmanship-heritage-stamp.png",
  "sustainability-guardian": "/badges/sustainability-guardian-stamp.png",
  "three-year-steward": "/badges/three-year-steward-stamp.png",
}

export default function AchievementsPage() {
  const { product, ownership } = useOwnership()

  const achievedBadges =
    ownership.currentOwner && ownership.activatedAt
      ? BadgeEngineService.getAchievedBadges(product.productId, ownership.currentOwner, ownership.activatedAt)
      : []

  const allBadges = badgesData

  const yearsOwned = ownership.activatedAt
    ? Math.floor((new Date().getTime() - new Date(ownership.activatedAt).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0

  const repairCount = repairsData.filter((repair) => repair.productId === product.productId).length

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Your Journey</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Heritage<br />Achievements
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              A complete record of your stewardship and the journey of your Louis Vuitton piece.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Achievement Count */}
      <ScrollSection className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-8xl md:text-[10rem] font-sans text-[#9f8453] leading-none">{achievedBadges.length}</span>
              <span className="text-2xl md:text-3xl font-sans text-[#aaaaaa]">/ {allBadges.length}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg font-sans text-[#323231]">badges achieved</p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Badges Section */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Achievement Badges</h3>
          </ScrollReveal>

          <div className="space-y-20">
            {allBadges.map((badge, index) => {
              const isAchieved = achievedBadges.some((ab) => ab.id === badge.id)
              return (
                <ScrollReveal key={badge.id} delay={index * 100}>
                  <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start ${!isAchieved ? 'opacity-40' : ''}`}>
                    <div className={`w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0 ${!isAchieved ? 'grayscale' : ''}`}>
                      <Image
                        src={BADGE_IMAGES[badge.id] || "/badges/first-owner-stamp.jpg"}
                        alt={badge.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <h4 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">{badge.title}</h4>
                        {isAchieved && (
                          <span className="text-xs uppercase tracking-[0.2em] text-[#9f8453] font-sans border-b border-[#9f8453] pb-0.5">
                            Achieved
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-sans text-[#323231] leading-relaxed max-w-xl">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Statistics Section */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Ownership Statistics</h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal delay={100}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Years of Ownership</p>
                <p className="text-6xl md:text-7xl font-sans text-[#0d0b08]">{yearsOwned}</p>
                <p className="text-base font-sans text-[#323231]">
                  {yearsOwned === 0 ? "Less than one year" : `${yearsOwned} ${yearsOwned === 1 ? "year" : "years"}`} of stewardship
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Repair Services</p>
                <p className="text-6xl md:text-7xl font-sans text-[#0d0b08]">{repairCount}</p>
                <p className="text-base font-sans text-[#323231]">
                  Professional {repairCount === 1 ? "repair" : "repairs"} completed
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Purchase Location</p>
                <p className="text-3xl md:text-4xl font-sans text-[#0d0b08]">{transactionData?.transaction?.store?.storeId || "Paris"}</p>
                <p className="text-base font-sans text-[#323231]">Original point of sale</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Collection</p>
                <p className="text-3xl md:text-4xl font-sans text-[#0d0b08]">{product.collection}</p>
                <p className="text-base font-sans text-[#323231]">Seasonal collection</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Made In</p>
                <p className="text-3xl md:text-4xl font-sans text-[#0d0b08]">{product.madeIn}</p>
                <p className="text-base font-sans text-[#323231]">Country of manufacture</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Craftsmanship Hours</p>
                <p className="text-6xl md:text-7xl font-sans text-[#0d0b08]">{product.craftsmanshipHours}</p>
                <p className="text-base font-sans text-[#323231]">Hours of artisan work</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Service History Section */}
      {repairCount > 0 && (
        <>
          {/* Thin Divider */}
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="h-px bg-[#e5e5e5]" />
          </div>

          <ScrollSection className="py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <ScrollReveal>
                <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Service History</h3>
              </ScrollReveal>

              <div className="space-y-16">
                {repairsData
                  .filter((repair) => repair.productId === product.productId)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((repair, index) => (
                    <ScrollReveal key={repair.repairId} delay={index * 100}>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-16 border-b border-[#e5e5e5] last:border-b-0">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#9f8453]" />
                            <h4 className="text-xl md:text-2xl font-sans text-[#0d0b08]">{repair.repairType}</h4>
                          </div>
                          <p className="text-base font-sans text-[#323231] pl-6">{repair.notes}</p>
                        </div>
                        <div className="text-left md:text-right pl-6 md:pl-0">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans mb-2">Completed</p>
                          <p className="text-lg font-sans text-[#0d0b08]">
                            {new Date(repair.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
              </div>
            </div>
          </ScrollSection>
        </>
      )}

      {/* Footer Spacer */}
      <div className="h-24" />
    </main>
  )
}
