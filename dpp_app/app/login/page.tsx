"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useOwnership } from "@/app/contexts/OwnershipContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const { setCurrentUser } = useOwnership()
  const router = useRouter()

  const handleLogin = () => {
    if (email) {
      setCurrentUser(email)
      router.push("/welcome")
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#faf6f5] relative">
      <div className="absolute inset-0 z-0">
        {/* Mobile background */}
        <div className="md:hidden w-full h-full">
          <img
            src="/images/design-mode/LOUIS-VUITTON-HOLIDAY-2025-CAMPAIGN-8-@Jonas-Lindstroem.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Desktop background */}
        <div className="hidden md:block w-full h-full">
          <img
            src="/images/design-mode/LOUIS-VUITTON-HOLIDAY-2025-CAMPAIGN-2-@Jonas-Lindstroem.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/*<header className="border-b border-white/30 p-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/">
            <h1 className="text-xl font-sans tracking-tight text-white">LOUIS VUITTON</h1>
          </Link>
        </div>
      </header>*/}

      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-sans tracking-tight text-white">Identify Account</h2>
            <p className="text-sm font-sans text-white/90">Required before ownership activation</p>
          </div>

          <div className="pt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white font-sans rounded-xl">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="h-12 border-white/40 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/40 focus:ring-white focus:border-white rounded-full"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!email}
              className="w-full h-14 bg-white/40 hover:bg-white text-[#0d0b08] font-sans tracking-wide disabled:opacity-50 rounded-full"
            >
              Continue with Account
            </Button>

            <Link href="/home">
              <Button
                variant="outline"
                className="w-full h-14 border-white/40 bg-transparent hover:bg-white/20 text-white font-sans tracking-wide rounded-full"
              >
                Continue as Guest
              </Button>
            </Link>

            <p className="text-xs text-white/80 text-center font-sans mt-2">
              Guest access provides limited product information
            </p>
          </div>

          <div className="pt-8 space-y-2">
            <p className="text-xs text-white/90 font-sans leading-relaxed">
              Your data is encrypted and stored securely on the Aura blockchain.
            </p>
            <p className="text-xs text-white/70 font-sans">Protected by European GDPR standards</p>
          </div>
        </div>
      </div>
    </main>
  )
}
