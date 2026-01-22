"use client"

import Link from "next/link"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { SustainabilityService } from "@/lib/services/sustainability.service"
import { RepairService } from "@/lib/services/repair.service"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"

export default function SustainabilityPage() {
  const { product, ownership } = useOwnership()

  const activationDate = ownership.activatedAt || new Date().toISOString()

  const impact = SustainabilityService.calculateEnvironmentalImpact(product.productId, activationDate)
  const repairCount = RepairService.getRepairCount(product.productId)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Environmental Impact</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Sustainability<br />Impact
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Environmental impact calculated across the complete product lifecycle—from raw material extraction through manufacturing, transport, and end-of-life considerations.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-base font-sans text-[#aaaaaa] mt-6">
              All metrics are third-party verified and recorded on blockchain for transparency.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Impact Metrics */}
      <ScrollSection className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Your Environmental Impact</h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal delay={100}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Ownership Duration</p>
                <p className="text-6xl md:text-8xl font-sans text-[#9f8453]">
                  {impact.ownershipDurationYears < 1
                    ? `${Math.floor(impact.ownershipDurationYears * 365)}d`
                    : `${impact.ownershipDurationYears.toFixed(1)}y`}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Carbon Saved</p>
                <p className="text-6xl md:text-8xl font-sans text-[#9f8453]">
                  {impact.carbonSavedByRepairs.toFixed(1)}
                </p>
                <p className="text-base font-sans text-[#323231]">kg CO₂ by {repairCount} repairs</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Daily Impact</p>
                <p className="text-6xl md:text-8xl font-sans text-[#9f8453]">
                  {impact.dailyImpactGrams.toFixed(1)}
                </p>
                <p className="text-base font-sans text-[#323231]">grams CO₂ per day</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">vs Fast Fashion</p>
                <p className="text-6xl md:text-8xl font-sans text-[#9f8453]">
                  {impact.comparisonVsFastFashion}%
                </p>
                <p className="text-base font-sans text-[#323231]">less carbon impact</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Repair Impact Section */}
      {repairCount > 0 && (
        <ScrollSection className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-8">
                Impact Reduction Through Repairs
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-xl font-sans text-[#323231] leading-relaxed max-w-3xl mb-8">
                Each professional repair extends your product's lifecycle and prevents the need for replacement. By choosing to repair rather than replace, you've saved{" "}
                <span className="text-[#9f8453]">{impact.carbonSavedByRepairs.toFixed(1)} kg CO₂</span>—equivalent to {Math.round(impact.carbonSavedByRepairs * 4.5)} kilometers of driving.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Link 
                href="/dpp/care"
                className="text-base font-sans text-[#9f8453] border-b border-[#9f8453] pb-1 hover:text-[#bda476] hover:border-[#bda476] transition-colors"
              >
                View Repair History →
              </Link>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Environmental Footprint */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Environmental Footprint</h3>
          </ScrollReveal>

          <div className="space-y-24">
            <ScrollReveal delay={100}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Carbon Footprint (Adjusted)</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-6xl md:text-7xl font-sans text-[#9f8453]">
                      {impact.adjustedCarbonFootprint.toFixed(1)}
                    </p>
                    <p className="text-lg font-sans text-[#aaaaaa]">kg CO₂e</p>
                  </div>
                  {impact.carbonSavedByRepairs > 0 && (
                    <p className="text-base font-sans text-[#aaaaaa] line-through">
                      {impact.totalCarbonFootprint.toFixed(1)} kg (original)
                    </p>
                  )}
                </div>
                <p className="text-base font-sans text-[#323231] leading-relaxed max-w-md">
                  Total greenhouse gas emissions from raw materials, manufacturing, and delivery. Reduced through repairs and long-term ownership.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Water Usage</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-6xl md:text-7xl font-sans text-[#9f8453]">142</p>
                    <p className="text-lg font-sans text-[#aaaaaa]">liters</p>
                  </div>
                </div>
                <p className="text-base font-sans text-[#323231] leading-relaxed max-w-md">
                  Freshwater consumed through production processes. 60% reduction vs. industry average achieved through water-efficient tanning and dyeing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Circularity Score</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-6xl md:text-7xl font-sans text-[#9f8453]">8.7</p>
                    <p className="text-lg font-sans text-[#aaaaaa]">/ 10</p>
                  </div>
                </div>
                <p className="text-base font-sans text-[#323231] leading-relaxed max-w-md">
                  Design for longevity with 100% repairable components. Materials selected for recyclability and minimal environmental impact at end-of-life.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Longevity vs Disposability */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-6">
              Longevity vs. Disposability
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-base font-sans text-[#aaaaaa] mb-16">
              Comparing environmental impact over a 10-year period
            </p>
          </ScrollReveal>

          <div className="space-y-16">
            <ScrollReveal delay={200}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-sans text-[#0d0b08]">This Louis Vuitton Product</p>
                  <p className="text-sm font-sans text-[#aaaaaa]">Carbon per year of use (10 year lifespan)</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-5xl md:text-6xl font-sans text-[#9f8453]">1.24</p>
                  <p className="text-sm font-sans text-[#aaaaaa]">kg CO₂e/year</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-sans text-[#aaaaaa]">Fast Fashion Equivalent</p>
                  <p className="text-sm font-sans text-[#aaaaaa]">5 items replaced over 10 years</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-5xl md:text-6xl font-sans text-[#aaaaaa]">24.8</p>
                  <p className="text-sm font-sans text-[#aaaaaa]">kg CO₂e/year</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-xl font-sans text-[#0d0b08] leading-relaxed max-w-3xl">
                By choosing a Louis Vuitton product designed for decades of use, you reduce carbon impact by{" "}
                <span className="text-[#9f8453]">95%</span> compared to fast fashion alternatives over the product's lifetime.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Impact Over Time */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-6">Impact Over Time</h3>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-xl font-sans text-[#323231] leading-relaxed max-w-3xl mb-16">
              A Louis Vuitton product is created to last decades, not seasons. The longer you care for this piece, the lower its environmental impact becomes per day of use.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <ScrollReveal delay={200}>
              <div className="space-y-4">
                <p className="text-5xl md:text-6xl font-sans text-[#9f8453]">Year 1</p>
                <p className="text-base font-sans text-[#323231] leading-relaxed">
                  Initial environmental investment: {impact.totalCarbonFootprint.toFixed(1)} kg CO₂ total footprint
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="space-y-4">
                <p className="text-5xl md:text-6xl font-sans text-[#9f8453]">Year 10</p>
                <p className="text-base font-sans text-[#323231] leading-relaxed">
                  Daily impact reduced to 3.4 grams CO₂—less than a single email
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="space-y-4">
                <p className="text-5xl md:text-6xl font-sans text-[#9f8453]">Year 20+</p>
                <p className="text-base font-sans text-[#323231] leading-relaxed">
                  Heritage value increases while environmental cost continues to decrease
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Closing Statement */}
      <ScrollSection className="py-24 md:py-32 relative min-h-[500px]"
        style={{
          backgroundImage: "url('https://eu.louisvuitton.com/content/dam/lv/online/high-end/wolv/sustainability/U_Su_Committed_Journey_v3.html/jcr:content/assets/news/people_for_wildlife_DII.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl font-sans text-white leading-relaxed">
              With proper care and access to Louis Vuitton's professional repair services, your product can be preserved and passed through generations—making it one of the most responsible luxury investments available.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Footer Spacer */}
      <div className="h-24 bg-white" />
    </main>
  )
}
