import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DPPPage() {
  return (
    <main className="min-h-screen bg-[#faf6f5]">
      <header className="border-b border-[#323231] p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/home">
            <Button variant="ghost" className="text-[#0d0b08] hover:bg-transparent">
              ← Back to Collection
            </Button>
          </Link>
          <Link href="/">
            <h1 className="text-2xl font-sans tracking-tight text-[#0d0b08]">LOUIS VUITTON</h1>
          </Link>
          <div className="w-32" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Product Hero */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="aspect-square bg-white border border-[#323231]">
            <img src="/louis-vuitton-keepall-bag-luxury.jpg" alt="Keepall Bandoulière 50" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#aaaaaa]">Travel Collection • 2024</p>
                <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-[#0d0b08]">Keepall Bandoulière 50</h2>
              </div>
              <p className="text-lg font-serif text-[#423723] leading-relaxed">
                An iconic design combining heritage craftsmanship with modern functionality. Crafted from Monogram
                canvas with natural cowhide leather trim.
              </p>
            </div>

            <div className="border-t border-[#323231] pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-1">Serial Number</p>
                  <p className="font-sans text-[#0d0b08]">LV2024AB123456</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-1">Production Year</p>
                  <p className="font-sans text-[#0d0b08]">2024</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-1">Atelier</p>
                  <p className="font-sans text-[#0d0b08]">Asnières, France</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa] mb-1">Blockchain ID</p>
                  <p className="font-sans text-[#9f8453] text-xs">0x7f9a...1f6a</p>
                </div>
              </div>
            </div>

            <div className="bg-[#faf6f5] border border-[#323231] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa]">Authenticated</p>
                  <p className="text-sm font-sans text-[#0d0b08]">Aura Blockchain</p>
                </div>
                <div className="text-2xl text-[#9f8453]">✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="border-t border-[#323231] pt-12">
          <h3 className="text-2xl font-sans tracking-tight text-[#0d0b08] mb-8">Digital Passport</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/dpp/materials">
              <Card className="bg-white border-[#323231] p-6 hover:shadow-lg transition-shadow group">
                <div className="space-y-3">
                  <div className="text-3xl text-[#9f8453]">🌍</div>
                  <h4 className="text-lg font-sans text-[#0d0b08] group-hover:text-[#9f8453] transition-colors">
                    Materials & Origins
                  </h4>
                  <p className="text-sm font-serif text-[#423723]">Explore the materials and their ethical sourcing</p>
                </div>
              </Card>
            </Link>

            <Link href="/dpp/sustainability">
              <Card className="bg-white border-[#323231] p-6 hover:shadow-lg transition-shadow group">
                <div className="space-y-3">
                  <div className="text-3xl text-[#9f8453]">♻️</div>
                  <h4 className="text-lg font-sans text-[#0d0b08] group-hover:text-[#9f8453] transition-colors">
                    Sustainability Impact
                  </h4>
                  <p className="text-sm font-serif text-[#423723]">Carbon footprint and environmental commitments</p>
                </div>
              </Card>
            </Link>

            <Link href="/dpp/care">
              <Card className="bg-white border-[#323231] p-6 hover:shadow-lg transition-shadow group">
                <div className="space-y-3">
                  <div className="text-3xl text-[#9f8453]">✨</div>
                  <h4 className="text-lg font-sans text-[#0d0b08] group-hover:text-[#9f8453] transition-colors">
                    Care & Repair
                  </h4>
                  <p className="text-sm font-serif text-[#423723]">Maintenance guides and repair services</p>
                </div>
              </Card>
            </Link>

            <Link href="/dpp/certificate">
              <Card className="bg-white border-[#323231] p-6 hover:shadow-lg transition-shadow group">
                <div className="space-y-3">
                  <div className="text-3xl text-[#9f8453]">📜</div>
                  <h4 className="text-lg font-sans text-[#0d0b08] group-hover:text-[#9f8453] transition-colors">
                    Ownership Certificate
                  </h4>
                  <p className="text-sm font-serif text-[#423723]">View your digital certificate and history</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Backstory Section */}
        <div className="border-t border-[#323231] pt-12">
          <div className="max-w-3xl space-y-6">
            <h3 className="text-2xl font-sans tracking-tight text-[#0d0b08]">Heritage & Craftsmanship</h3>
            <div className="space-y-4 font-serif text-[#423723] leading-relaxed">
              <p>
                The Keepall was created in 1930 as a revolutionary travel bag, designed to meet the needs of modern
                travelers. This piece continues that legacy, crafted by skilled artisans at our historic Asnières
                atelier.
              </p>
              <p>
                Each bag requires over 16 hours of meticulous handwork, combining traditional savoir-faire with
                contemporary techniques. From cutting the canvas to the final quality inspection, every step upholds the
                House's exacting standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
