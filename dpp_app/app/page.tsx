import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ScanEntryPage() {
  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://pauseonline.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/11/LOUIS-VUITTON-HOLIDAY-2025-CAMPAIGN-PASSPORT-COVER-%40Peter-Langer-scaled.jpg')",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        {/*<header className="border-b border-white/30 p-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-sans tracking-tight text-white">LOUIS VUITTON</h1>
          </div>
        </header>*/}

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-md w-full space-y-4 text-center -mt-16">
            <div className="space-y-8">
              {/* Status indicator */}
              <div className="inline-flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#9f8453]"></div>
                <p className="text-sm font-sans tracking-wide text-white">PRODUCT DETECTED</p>
              </div>

              <h2 className="text-2xl md:text-3xl font-sans tracking-tight text-white">Digital Product Passport</h2>

              <p className="text-xs font-sans text-white/90 leading-relaxed">
                Your Louis Vuitton product has been detected via secure NFC chip. Continue to verify authenticity and
                access your Digital Product Passport.
              </p>
            </div>

            <div className="pt-4 mt-4">
              <Link href="/login">
                <Button className="w-full h-14 bg-transparent hover:bg-white/10 text-white border border-white/40 font-sans tracking-wide rounded-full">
                  Continue to Verify
                </Button>
              </Link>

              <div className="mt-auto pt-14">
                <p className="text-xs text-white/70 font-sans leading-relaxed text-center">
                  Secured by Aura Blockchain Consortium
                  <br />
                  End-to-end encrypted • GDPR compliant • Immutable record
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/30 p-6">
          <div className="max-w-5xl mx-auto flex justify-between text-xs text-white/60 font-sans">
            <p>© 2025 Louis Vuitton</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#9f8453] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[#9f8453] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[#9f8453] transition-colors">
                Blockchain
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
