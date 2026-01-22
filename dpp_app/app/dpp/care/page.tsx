"use client"

import Link from "next/link"
import { RepairService } from "@/lib/services/repair.service"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"

export default function CarePage() {
  const { product } = useOwnership()
  const repairs = RepairService.getRepairsByProduct(product.productId)
  const totalCarbonSaved = RepairService.getTotalCarbonSaved(product.productId)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Preservation</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Care &<br />Repair
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Every Louis Vuitton product is designed to accompany you through decades of use. Proper care and timely professional repair ensure your piece maintains its beauty and function for generations.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Repair History Section */}
      {repairs.length > 0 && (
        <>
          <ScrollSection className="py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                  <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08]">Repair & Warranty History</h3>
                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans mb-2">Total Carbon Saved</p>
                    <p className="text-4xl font-sans text-[#9f8453]">{totalCarbonSaved.toFixed(1)} kg</p>
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-16">
                {repairs.map((repair, index) => (
                  <ScrollReveal key={repair.repairId} delay={index * 100}>
                    <div className="pb-16 border-b border-[#e5e5e5] last:border-b-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-4">
                            <h4 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">{repair.repairType}</h4>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#9f8453] font-sans border-b border-[#9f8453] pb-0.5">
                              {repair.status}
                            </span>
                          </div>
                          <p className="text-lg font-sans text-[#323231] leading-relaxed">{repair.notes}</p>
                          <div className="flex flex-wrap gap-8 text-sm font-sans text-[#323231]">
                            <div>
                              <span className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans block mb-1">Completed By</span>
                              <span>{repair.completedBy}</span>
                            </div>
                            <div>
                              <span className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans block mb-1">Date</span>
                              <span>
                                {new Date(repair.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans mb-2">Environmental Impact</p>
                          <p className="text-3xl font-sans text-[#9f8453]">-{repair.carbonSavedKg} kg CO₂</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollSection>

          {/* Thin Divider */}
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="h-px bg-[#e5e5e5]" />
          </div>
        </>
      )}

      {/* Care Instructions */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Care Instructions</h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal delay={100}>
              <div className="space-y-6">
                <h4 className="text-xl font-sans text-[#0d0b08]">Canvas Care</h4>
                <ul className="space-y-3 text-base font-sans text-[#323231]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Clean gently with a soft, damp cloth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Avoid harsh chemicals and solvents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Allow to air dry naturally</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Keep away from prolonged direct sunlight</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <h4 className="text-xl font-sans text-[#0d0b08]">Leather Trim</h4>
                <ul className="space-y-3 text-base font-sans text-[#323231]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Natural patina develops with use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Protect from rain and humidity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Use specialized leather care products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Condition leather twice yearly</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="space-y-6">
                <h4 className="text-xl font-sans text-[#0d0b08]">Storage</h4>
                <ul className="space-y-3 text-base font-sans text-[#323231]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Store in original dust bag when not in use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Keep in cool, dry place</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Stuff with tissue to maintain shape</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Avoid plastic bags or containers</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="space-y-6">
                <h4 className="text-xl font-sans text-[#0d0b08]">What to Avoid</h4>
                <ul className="space-y-3 text-base font-sans text-[#323231]">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Never machine wash or dry clean</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Avoid contact with cosmetics and perfume</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>{"Don't overfill beyond capacity"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9f8453] mt-2 flex-shrink-0" />
                    <span>Keep away from sharp objects</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Professional Repair Services */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Professional Repair Services</h3>
          </ScrollReveal>

          <div className="space-y-20">
            <ScrollReveal delay={100}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-16 border-b border-[#e5e5e5]">
                <div className="space-y-4">
                  <h4 className="text-2xl font-sans text-[#0d0b08]">Minor Repairs</h4>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">2-3 weeks</p>
                </div>
                <ul className="space-y-2 text-base font-sans text-[#323231] max-w-md">
                  <li>Hardware replacement</li>
                  <li>Stitching reinforcement</li>
                  <li>Handle repair</li>
                  <li>Zipper service</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-16 border-b border-[#e5e5e5]">
                <div className="space-y-4">
                  <h4 className="text-2xl font-sans text-[#0d0b08]">Major Restoration</h4>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">4-6 weeks</p>
                </div>
                <ul className="space-y-2 text-base font-sans text-[#323231] max-w-md">
                  <li>Leather trim replacement</li>
                  <li>Canvas restoration</li>
                  <li>Interior lining renewal</li>
                  <li>Structural repair</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-sans text-[#0d0b08]">Spa Services</h4>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">3-4 weeks</p>
                </div>
                <ul className="space-y-2 text-base font-sans text-[#323231] max-w-md">
                  <li>Deep cleaning</li>
                  <li>Leather conditioning</li>
                  <li>Hardware polishing</li>
                  <li>Complete restoration</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Schedule Repair CTA */}
      <ScrollSection className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <h4 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">Schedule a Repair</h4>
                <p className="text-lg font-sans text-[#323231] leading-relaxed">
                  Our master artisans use the same techniques and materials as the original craftsmanship. Schedule an appointment at your nearest Louis Vuitton atelier.
                </p>
              </div>
              <a 
                href="https://eu.louisvuitton.com/eng-e1/stories/louis-vuitton-repairs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-sans text-[#0d0b08] border border-[#0d0b08] px-10 py-4 hover:bg-[#0d0b08] hover:text-white transition-colors rounded-lg inline-block text-center"
              >
                Book Repair Service
              </a>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 bg-white">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

{/* Closing Statement */}
<ScrollSection 
  className="py-24 md:py-32 relative min-h-[600px]"
  style={{
    backgroundImage: "url('https://fr.louisvuitton.com/content/dam/lv/online/high-end/unisex/services/U_Services_Repairs.html/jcr:content/assets/CAREANDREPAIR_041_LVCOM_1920x1080_ANIMATION.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/50" />
  
  <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
    <ScrollReveal>
      <h3 className="text-2xl md:text-3xl font-sans text-white mb-8">Preservation Through Generations</h3>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <p className="text-lg font-sans text-white leading-relaxed mb-6">
        Every Louis Vuitton product is crafted with the expectation of decades of use. Through meticulous care and access to our global network of artisan repair ateliers, your piece will maintain its exceptional quality throughout your lifetime—and beyond.
      </p>
    </ScrollReveal>
    <ScrollReveal delay={200}>
      <p className="text-base font-sans text-white/90 leading-relaxed">
        Regular maintenance preserves not only the physical beauty of your product, but also its provenance and heritage value. A well-maintained Louis Vuitton piece becomes an heirloom—a testament to enduring craftsmanship and responsible luxury.
      </p>
    </ScrollReveal>
  </div>
</ScrollSection>

      {/* Footer Spacer */}
      <div className="h-24 bg-white" />
    </main>
  )
}
