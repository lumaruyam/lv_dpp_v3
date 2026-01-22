"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { Check } from "lucide-react"

export default function OwnershipActivationPage() {
  const { product, ownership, activateOwnership, isActivated } = useOwnership()
  const [isActivating, setIsActivating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const handleActivate = () => {
    setIsActivating(true)

    // Simulate blockchain transaction delay
    setTimeout(() => {
      activateOwnership()
      setIsActivating(false)
      setShowSuccess(true)

      // Redirect after showing success
      setTimeout(() => {
        router.push("/home")
      }, 3000)
    }, 2000)
  }

  // If already activated, show success immediately
  if (isActivated && !showSuccess) {
    return (
      <main className="min-h-screen flex flex-col bg-[#faf6f5]">
        <header className="border-b border-[#323231] p-6">
          <div className="max-w-5xl mx-auto">
            <Link href="/">
              <h1 className="text-2xl font-sans tracking-tight text-[#0d0b08]">LOUIS VUITTON</h1>
            </Link>
          </div>
        </header>

        <div className="flex-1 px-6 py-12 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#9f8453]">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-sans tracking-tight text-[#0d0b08]">Already Activated</h2>
              <p className="text-base font-serif text-[#423723] leading-relaxed">
                This product has already been claimed.
              </p>
            </div>

            <Link href="/home">
              <Button className="h-14 px-8 bg-[#323231] hover:bg-[#0d0b08] text-[#faf6f5] font-sans tracking-wide">
                View Digital Passport
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Show success state
  if (showSuccess) {
    return (
      <main className="min-h-screen flex flex-col bg-[#faf6f5]">
        <header className="border-b border-[#323231] p-6">
          <div className="max-w-5xl mx-auto">
            <Link href="/">
              <h1 className="text-2xl font-sans tracking-tight text-[#0d0b08]">LOUIS VUITTON</h1>
            </Link>
          </div>
        </header>

        <div className="flex-1 px-6 py-12 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#9f8453] animate-in zoom-in duration-500">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-sans tracking-tight text-[#0d0b08]">Ownership Certificate Issued</h2>
              <p className="text-lg font-serif text-[#423723] leading-relaxed max-w-lg mx-auto">
                This piece is now uniquely linked to you.
              </p>
            </div>

            <div className="bg-white border border-[#9f8453] p-6 space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-[#aaaaaa]">Blockchain Hash</span>
                <span className="font-mono text-xs text-[#0d0b08]">{ownership.blockchainHash?.slice(0, 16)}...</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-[#aaaaaa]">Transaction ID</span>
                <span className="font-mono text-xs text-[#0d0b08]">{ownership.transactionId}</span>
              </div>
            </div>

            <p className="text-sm text-[#aaaaaa] font-sans">Redirecting to your Digital Passport...</p>
          </div>
        </div>
      </main>
    )
  }

  // Show activation form
  return (
    <main className="min-h-screen flex flex-col bg-[#faf6f5]">
      <header className="border-b border-[#323231] p-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/">
            <h1 className="text-2xl font-sans tracking-tight text-[#0d0b08]">LOUIS VUITTON</h1>
          </Link>
        </div>
      </header>

      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4 pt-8">
            <h2 className="text-4xl font-sans tracking-tight text-[#0d0b08]">Claim Your Product</h2>
            <p className="text-base font-serif text-[#423723] max-w-md mx-auto leading-relaxed">
              Activate your ownership certificate for this Louis Vuitton piece
            </p>
          </div>

          <Card className="bg-white border-[#323231] p-8 space-y-8">
            <div className="space-y-6">
              <div className="border-b border-[#aaaaaa] pb-6">
                <h3 className="text-3xl font-serif text-[#0d0b08] mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#423723] font-sans">{product.collection}</p>
                  <p className="text-sm text-[#aaaaaa] font-sans">{product.manufactureDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa]">Product ID</p>
                  <p className="font-sans text-sm text-[#0d0b08]">{product.productId}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#aaaaaa]">
                  <p className="text-xs uppercase tracking-wider text-[#aaaaaa]">Ownership Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#aaaaaa]" />
                    <p className="font-sans text-sm text-[#423723]">Not Yet Activated</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-white border-l-2 border-[#9f8453] p-6 space-y-3">
            <h4 className="text-sm uppercase tracking-wider text-[#0d0b08] font-sans">Blockchain Certificate</h4>
            <p className="text-sm font-serif text-[#423723] leading-relaxed">
              Your ownership will be recorded on the Aura Blockchain—a permanent, tamper-proof certificate that travels
              with your product throughout its lifetime. This guarantees authenticity, enables warranty access, and
              preserves resale value.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleActivate}
              disabled={isActivating}
              className="w-full h-16 bg-[#323231] hover:bg-[#0d0b08] text-[#faf6f5] font-sans tracking-wide text-base disabled:opacity-50"
            >
              {isActivating ? "Activating on Blockchain..." : "Activate Ownership Certificate"}
            </Button>
            <p className="text-xs text-center text-[#aaaaaa] font-sans">
              By activating, you agree to the digital certificate terms
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
