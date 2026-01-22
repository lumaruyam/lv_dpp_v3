"use client"

import Link from "next/link"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"
import productsData from "@/app/data/product.json"

const PRODUCT_IMAGES: Record<string, string> = {
  "LV-JKT-4521-000987": "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tailored-bomber--HTB40WLGT151_PM2_Front%20view.png?wid=2400&hei=2400",
  "LV-BAG-M27974-001234": "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-speedy-p9-bandouliere-25--M27974_PM2_Front%20view.png?wid=2400&hei=2400",
}

export default function CollectionPage() {
  const products = productsData

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Your Collection</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Owned<br />Items
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Your complete collection of authenticated Louis Vuitton pieces, each with its own Digital Product Passport verified on the Aura Blockchain.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Collection Count */}
      <ScrollSection className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-8xl md:text-[10rem] font-sans text-[#9f8453] leading-none">{products.length}</span>
              <span className="text-2xl md:text-3xl font-sans text-[#aaaaaa]">items</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg font-sans text-[#323231]">in your authenticated collection</p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Products Grid */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Your Pieces</h3>
          </ScrollReveal>

          <div className="space-y-24">
            {products.map((product, index) => (
              <ScrollReveal key={product.productId} delay={index * 150}>
                <div className="group">
                  <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                    {/* Product Image */}
                    <div className="w-full md:w-1/2 aspect-square bg-[#faf9f7] flex items-center justify-center overflow-hidden">
                      <img
                        src={PRODUCT_IMAGES[product.productId] || "/louis-vuitton-keepall-bag.jpg"}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-8">
                      <div className="space-y-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">
                          {product.collection}
                        </p>
                        <h4 className="text-3xl md:text-4xl font-sans text-[#0d0b08] leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-base font-sans text-[#323231]">
                          {product.category}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Color</p>
                          <p className="text-base font-sans text-[#0d0b08]">{product.color}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Size</p>
                          <p className="text-base font-sans text-[#0d0b08]">{product.size}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Made In</p>
                          <p className="text-base font-sans text-[#0d0b08]">{product.madeIn}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Production</p>
                          <p className="text-base font-sans text-[#0d0b08]">{product.manufactureDate}</p>
                        </div>
                      </div>

                      <div className="pt-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#9f8453]" />
                          <p className="text-sm font-sans text-[#9f8453] uppercase tracking-wider">
                            {product.authenticationStatus}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Digital ID</p>
                          <p className="text-sm font-mono text-[#323231]">{product.digitalId}</p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <Link
                          href="/home"
                          className="inline-flex items-center gap-2 text-sm font-sans text-[#0d0b08] uppercase tracking-wider hover:text-[#9f8453] transition-colors group/link"
                        >
                          <span className="border-b border-[#0d0b08] group-hover/link:border-[#9f8453] pb-1">
                            View Product Passport
                          </span>
                          <span className="text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Divider between products */}
                  {index < products.length - 1 && (
                    <div className="h-px bg-[#e5e5e5] mt-24" />
                  )}
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

      {/* Collection Statistics */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Collection Overview</h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            <ScrollReveal delay={100}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Total Craftsmanship</p>
                <p className="text-6xl md:text-7xl font-sans text-[#9f8453]">
                  {products.reduce((acc, p) => acc + p.craftsmanshipHours, 0)}
                </p>
                <p className="text-base font-sans text-[#323231]">hours of artisan work</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Categories</p>
                <p className="text-6xl md:text-7xl font-sans text-[#9f8453]">
                  {new Set(products.map(p => p.category.split(" – ")[0])).size}
                </p>
                <p className="text-base font-sans text-[#323231]">product categories</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Ateliers</p>
                <p className="text-6xl md:text-7xl font-sans text-[#9f8453]">
                  {new Set(products.map(p => p.madeIn)).size}
                </p>
                <p className="text-base font-sans text-[#323231]">countries of origin</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Closing Statement */}
      <ScrollSection className="py-24 md:py-32 bg-[#faf9f7]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl font-sans text-[#0d0b08] leading-relaxed">
              Each piece in your collection carries a unique story of craftsmanship, heritage, and authenticity—permanently recorded on the Aura Blockchain for generations to come.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Footer Spacer */}
      <div className="h-24 bg-white" />
    </main>
  )
}
