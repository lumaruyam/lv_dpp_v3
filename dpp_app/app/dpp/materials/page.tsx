"use client"

import Link from "next/link"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"

const materials = [
  {
    component: "Canvas Exterior",
    name: "Monogram Canvas",
    percentage: "45%",
    origin: "Lyon, France",
    description:
      "Iconic coated canvas featuring the Louis Vuitton monogram. Created through a proprietary process combining cotton canvas with a durable coating.",
    certifications: ["EU Reach Compliant", "Oeko-Tex Standard 100"],
    supplier: "Atelier de Textiles Lyon",
    coordinates: "45.7640° N, 4.8357° E",
  },
  {
    component: "Leather Trim",
    name: "Natural Cowhide Leather",
    percentage: "30%",
    origin: "Tuscany, Italy",
    description:
      "Vegetable-tanned natural leather that develops a distinctive patina over time. Sourced from certified Italian tanneries.",
    certifications: ["LWG Gold Certified", "Animal Welfare Approved"],
    supplier: "Conceria Italiana",
    coordinates: "43.7711° N, 11.2486° E",
  },
  {
    component: "Hardware",
    name: "Brass Fittings",
    percentage: "15%",
    origin: "Paris, France",
    description: "Solid brass zippers, locks, and rivets. Each piece is individually polished and finished by hand.",
    certifications: ["80% Recycled Content", "ISO 14001"],
    supplier: "Métaux Précieux Paris",
    coordinates: "48.8566° N, 2.3522° E",
  },
  {
    component: "Interior Lining",
    name: "Organic Cotton",
    percentage: "10%",
    origin: "Barcelona, Spain",
    description: "Textile lining made from certified organic cotton, ensuring comfort and breathability.",
    certifications: ["GOTS Certified", "Fair Trade"],
    supplier: "Textiles Orgánicos",
    coordinates: "41.3874° N, 2.1686° E",
  },
]

export default function MaterialsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">
              Traceability
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight text-[#0d0b08] leading-[0.95] max-w-4xl">
              Materials
              <br />
              <span className="text-[#0d0b08]">& Origins</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl font-serif text-[#323231] leading-relaxed max-w-2xl mt-8">
              Every component of this Louis Vuitton product is traced from source to atelier. Each material is documented, certified, and recorded on the Aura Blockchain.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Materials List */}
      {materials.map((material, index) => (
        <ScrollSection key={index} className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <ScrollReveal>
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-6xl md:text-8xl font-sans text-[#aaaaaa]/30">{material.percentage}</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-4">{material.component}</h3>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-xl font-serif text-[#9f8453] mb-6">{material.name}</p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <p className="text-base font-serif text-[#323231] leading-relaxed mb-8">
                    {material.description}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                  <div className="flex flex-wrap gap-3">
                    {material.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="inline-block px-4 py-2 text-xs font-sans uppercase tracking-wider border-b border-[#9f8453] text-[#0d0b08]"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
              <div>
                <ScrollReveal direction="right" delay={200}>
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#aaaaaa] mb-3 font-sans">Origin</p>
                      <p className="text-2xl font-sans text-[#0d0b08]">{material.origin}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#aaaaaa] mb-3 font-sans">Supplier</p>
                      <p className="text-lg font-serif text-[#323231]">{material.supplier}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#aaaaaa] mb-3 font-sans">Coordinates</p>
                      <p className="font-mono text-sm text-[#323231]">{material.coordinates}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
            {index < materials.length - 1 && (
              <div className="h-px bg-[#aaaaaa]/20 mt-16 md:mt-24" />
            )}
          </div>
        </ScrollSection>
      ))}

      {/* Supply Chain Journey */}
      <ScrollSection className="bg-[#faf6f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">
              Journey
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-[#0d0b08] leading-[1.1] max-w-3xl mb-8">
              Supply Chain Traceability
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg font-serif text-[#323231] leading-relaxed max-w-2xl mb-16">
              Geographic visualization of material origins showing the journey from source to atelier.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm font-sans text-[#323231]">
              <span>Lyon, France</span>
              <span className="text-[#9f8453]">→</span>
              <span>Tuscany, Italy</span>
              <span className="text-[#9f8453]">→</span>
              <span>Paris, France</span>
              <span className="text-[#9f8453]">→</span>
              <span>Barcelona, Spain</span>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Blockchain Verification */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">
              Verified
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-[#0d0b08] leading-[1.1] max-w-3xl mb-8">
              Blockchain Verification
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg font-serif text-[#323231] leading-relaxed max-w-2xl mb-16">
              All materials, suppliers, and production stages are permanently recorded on the Aura Blockchain—ensuring complete transparency and ethical compliance.
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { label: "Suppliers Verified", value: "4 / 4", sub: "100% blockchain-documented" },
              { label: "Chain Records", value: "247", sub: "Immutable transaction logs" },
              { label: "Traceability", value: "100%", sub: "Complete supply chain visibility" }
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={300 + index * 100}>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">{stat.label}</p>
                  <p className="text-5xl md:text-6xl font-sans text-[#9f8453]">{stat.value}</p>
                  <p className="text-sm font-serif text-[#323231]">{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Footer */}
      <footer className="py-16 md:py-24 border-t border-[#aaaaaa]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-sm font-sans text-[#0d0b08] uppercase tracking-wider hover:text-[#9f8453] transition-colors group"
            >
              <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
              <span className="border-b border-[#0d0b08] group-hover:border-[#9f8453] pb-1">
                Back to Passport
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </footer>
    </main>
  )
}
