"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import clientData from "@/app/data/client.json"

export default function WelcomePage() {
  const router = useRouter()
  const { product } = useOwnership()
  const client = clientData

  const handleContinue = () => {
    router.push("/home")
  }

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #faf6f5 0%, #f8f8f8 100%)" }}
    >
      <header className="border-b border-[#323231]/10 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-base font-sans tracking-tight text-[#0d0b08]">LOUIS VUITTON</h1>
        </div>
      </header>

      <div className="flex-1 px-6 py-16 flex items-center justify-center">
        <div className="max-w-3xl mx-auto space-y-12 text-center">
          {/* Welcome message */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-[#9f8453] rounded-sm">
              <p className="text-xs uppercase tracking-widest text-white font-sans">Welcome Back</p>
            </div>

            <h2 className="text-5xl md:text-6xl font-sans tracking-tight text-[#0d0b08]">
              {client.profile.title} {client.profile.lastName}
            </h2>

            <p className="text-lg font-sans text-[#423723] max-w-2xl mx-auto leading-relaxed">
              We're delighted to see you again. Your {client.membership.tier} membership continues to grant you access
              to exclusive services and experiences tailored to your refined taste.
            </p>
          </div>

          {/* Product overview - personalized */}
          {client.products.length === 1 ? (
            <div className="bg-white border border-[#323231]/10 p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#aaaaaa] font-sans">Your Product</p>
                <h3 className="text-2xl font-sans text-[#0d0b08]">{client.products[0].name}</h3>
                <p className="text-sm text-[#423723] font-sans">{client.products[0].collection}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#323231]/10">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa] font-sans">Acquired</p>
                  <p className="text-sm text-[#0d0b08] font-sans">
                    {new Date(client.products[0].purchaseDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa] font-sans">Location</p>
                  <p className="text-sm text-[#0d0b08] font-sans">{client.products[0].store}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#323231]/10 p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#aaaaaa] font-sans">Your Collection</p>
                <h3 className="text-2xl font-sans text-[#0d0b08]">{client.products.length} Products</h3>
                <p className="text-sm text-[#423723] font-sans">Authenticated and secured on the blockchain</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#323231]/10">
                {client.products.map((prod) => (
                  <div key={prod.productId} className="flex items-center justify-between py-2">
                    <div className="text-left">
                      <p className="text-sm font-sans text-[#0d0b08]">{prod.name}</p>
                      <p className="text-xs text-[#aaaaaa] font-sans">{prod.collection}</p>
                    </div>
                    <p className="text-xs text-[#423723] font-sans">{prod.store}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personalized services */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="text-center space-y-2">
              <p className="text-3xl font-sans text-[#9f8453]">{client.membership.points}</p>
              <p className="text-xs uppercase tracking-wider text-[#aaaaaa] font-sans">Privilege Points</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-sans text-[#9f8453]">
                {new Date().getFullYear() - new Date(client.membership.since).getFullYear()}
              </p>
              <p className="text-xs uppercase tracking-wider text-[#aaaaaa] font-sans">Years with Us</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-sans text-[#9f8453]">{client.preferences.preferredStores.length}</p>
              <p className="text-xs uppercase tracking-wider text-[#aaaaaa] font-sans">Preferred Stores</p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4 pt-8">
            <Button
              onClick={handleContinue}
              className="h-14 px-12 bg-[#000] hover:bg-[#323231] text-white font-sans tracking-wide"
            >
              Access Your Digital Passport
            </Button>
            <p className="text-xs text-[#aaaaaa] font-sans">All your products and services in one place</p>
          </div>
        </div>
      </div>
    </main>
  )
}
