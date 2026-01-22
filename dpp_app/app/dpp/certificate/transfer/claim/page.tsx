"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Shield, 
  User,
  Package,
  Clock,
  Mail
} from "lucide-react"
import { 
  getTransferRequestByCode, 
  approveTransferRequest,
  generateClientId,
  type TransferRequest 
} from "@/lib/services/transfer.service"
import { generateBlockchainHash, generateTransactionId } from "@/lib/blockchain/hash-generator"
import { sendApprovalRequestEmail } from "@/lib/services/email.service"

export default function ClaimOwnershipPage() {
  const router = useRouter()
  
  const [step, setStep] = useState<"enter-code" | "found" | "claim" | "approve" | "completed" | "error">("enter-code")
  const [transfer, setTransfer] = useState<TransferRequest | null>(null)
  const [transferCode, setTransferCode] = useState("")
  const [newOwnerName, setNewOwnerName] = useState("")
  const [newOwnerEmail, setNewOwnerEmail] = useState("")
  const [approvalCode, setApprovalCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLookupTransfer = () => {
    if (!transferCode || transferCode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit transfer code")
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      // Load transfer request
      const transferData = getTransferRequestByCode(transferCode)
      
      if (!transferData) {
        setStep("error")
        setErrorMessage("Transfer code not found. Please check the code and try again.")
        setIsProcessing(false)
        return
      }

      if (transferData.status === "completed") {
        setStep("error")
        setErrorMessage("This transfer has already been completed.")
        setIsProcessing(false)
        return
      }

      if (transferData.status === "rejected") {
        setStep("error")
        setErrorMessage("This transfer has been rejected or expired.")
        setIsProcessing(false)
        return
      }

      // Check if expired
      if (new Date(transferData.expiresAt) < new Date()) {
        setStep("error")
        setErrorMessage("This transfer code has expired.")
        setIsProcessing(false)
        return
      }

      setTransfer(transferData)
      
      // Pre-fill email if provided
      if (transferData.newOwnerEmail) {
        setNewOwnerEmail(transferData.newOwnerEmail)
      }
      if (transferData.newOwnerName) {
        setNewOwnerName(transferData.newOwnerName)
      }
      
      setIsProcessing(false)
      setStep("found")
    }, 1000)
  }

  const handleClaimOwnership = () => {
    if (!newOwnerName || !newOwnerEmail) return
    
    setIsProcessing(true)
    
    // Simulate sending notification to current owner
    setTimeout(() => {
      setIsProcessing(false)
      setStep("approve")
      
      // Send approval notification email
      if (transfer) {
        sendApprovalRequestEmail({
          currentOwnerEmail: "owner@example.com", // Get from user profile in production
          currentOwnerName: "Current Owner",
          newOwnerName,
          newOwnerEmail,
          productName: "Louis Vuitton Product", // Get from transfer data
          transferId: transfer.transferId,
          approvalCode: transfer.approvalToken || ""
        })
        
        console.log("Approval code for demo:", transfer.approvalToken)
        alert(`Demo: Approval notification sent to current owner.\nApproval code: ${transfer.approvalToken}`)
      }
    }, 1500)
  }

  const handleApproveTransfer = () => {
    if (!transfer || !approvalCode) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      const success = approveTransferRequest(transfer.transferId, approvalCode)
      
      if (!success) {
        setErrorMessage("Invalid approval code or transfer expired.")
        setIsProcessing(false)
        return
      }

      // Generate new client ID and complete transfer
      const newOwnerId = generateClientId()
      const newTransactionId = generateTransactionId()
      
      const newHash = generateBlockchainHash({
        productId: transfer.productId,
        transactionId: newTransactionId,
        ownerId: newOwnerId,
        timestamp: new Date().toISOString(),
      })

      // Save ownership update
      const ownershipUpdate = {
        productId: transfer.productId,
        ownership: {
          status: "ACTIVE",
          currentOwner: {
            clientId: newOwnerId,
            name: newOwnerName,
            email: newOwnerEmail
          },
          firstActivation: {
            transactionId: newTransactionId,
            activatedAt: new Date().toISOString()
          },
          transferHistory: [
            {
              fromClientId: transfer.currentOwnerId,
              toClientId: newOwnerId,
              transferDate: new Date().toISOString(),
              transactionId: newTransactionId
            }
          ],
          transferable: true,
          resaleEligibility: true,
          repairHistoryAnchored: true,
          lostItemAlertOptIn: true
        }
      }

      // Save to localStorage
      const existingOwnership = localStorage.getItem('lv-dpp-ownership-history')
      const ownershipHistory = existingOwnership ? JSON.parse(existingOwnership) : []
      ownershipHistory.push(ownershipUpdate)
      localStorage.setItem('lv-dpp-ownership-history', JSON.stringify(ownershipHistory))

      setIsProcessing(false)
      setStep("completed")
    }, 1500)
  }

  if (step === "enter-code") {
    return (
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <ScrollSection className="pt-8 md:pt-16">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Ownership Transfer</p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
                Claim Your<br />Louis Vuitton
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
                Enter the 6-digit transfer code from your email to claim ownership of your authenticated Louis Vuitton product.
              </p>
            </ScrollReveal>
          </div>
        </ScrollSection>

        {/* Enter Transfer Code */}
        <ScrollSection className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="max-w-xl mx-auto">
                <div className="border border-[#e5e5e5] p-8 md:p-12 space-y-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Mail className="w-6 h-6 text-[#9f8453]" />
                    <div>
                      <p className="text-lg font-sans text-[#0d0b08] font-medium">Enter Transfer Code</p>
                      <p className="text-sm font-sans text-[#323231]">
                        Check your email for the 6-digit code
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-[0.3em] text-[#323231] font-sans">
                      Transfer Code <span className="text-[#c53929]">*</span>
                    </label>
                    <Input
                      type="text"
                      value={transferCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                        setTransferCode(value)
                        setErrorMessage("")
                      }}
                      placeholder="000000"
                      maxLength={6}
                      className="h-16 border-[#e5e5e5] focus:border-[#0d0b08] font-mono text-3xl text-center tracking-widest rounded-lg"
                    />
                    <p className="text-sm font-sans text-[#aaaaaa]">
                      Enter the 6-digit code from your transfer email
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="flex items-start gap-3 p-4 bg-[#c53929]/10 border border-[#c53929]">
                      <AlertCircle className="w-5 h-5 text-[#c53929] flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-sans text-[#c53929]">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    onClick={handleLookupTransfer}
                    disabled={transferCode.length !== 6 || isProcessing}
                    className="w-full flex items-center justify-center gap-3 text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#aaaaaa] rounded-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Verifying Code...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-8 p-6 bg-[#faf9f7] space-y-3">
                  <p className="text-sm font-sans text-[#0d0b08] font-medium">Didn't receive an email?</p>
                  <ul className="space-y-2 text-sm font-sans text-[#323231]">
                    <li>• Check your spam/junk folder</li>
                    <li>• Verify the email address with the sender</li>
                    <li>• The transfer code expires after 7 days</li>
                    <li>• Contact Louis Vuitton support if you need assistance</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>

        {/* Footer Spacer */}
        <div className="h-24 bg-white" />
      </main>
    )
  }

  if (step === "error") {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#c53929]/10 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-[#c53929]" />
            </div>
            <h1 className="text-4xl font-sans text-[#0d0b08]">Transfer Not Available</h1>
            <p className="text-xl font-sans text-[#323231]">{errorMessage}</p>
            <Link href="/home">
              <button className="text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors rounded-lg mt-8">
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Ownership Transfer</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Claim Your<br />Louis Vuitton
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Complete the ownership transfer to receive your authenticated Digital Product Passport.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Product Info */}
      {transfer && (
        <ScrollSection className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="border border-[#9f8453] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <Package className="w-6 h-6 text-[#9f8453]" />
                  <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Product Details</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">Product ID</p>
                    <p className="text-lg font-mono text-[#0d0b08]">{transfer.productId}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">Certificate ID</p>
                    <p className="text-lg font-mono text-[#9f8453]">{transfer.certificateId}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Step: Claim Ownership */}
      {step === "found" && (
        <ScrollSection className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="w-10 h-10 rounded-full bg-[#9f8453] flex items-center justify-center text-white font-sans text-sm">1</span>
                <h3 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">Confirm Your Information</h3>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-8 max-w-xl">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.3em] text-[#323231] font-sans">
                    Full Name <span className="text-[#c53929]">*</span>
                  </label>
                  <Input
                    type="text"
                    value={newOwnerName}
                    onChange={(e) => setNewOwnerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-14 border-[#e5e5e5] focus:border-[#0d0b08] font-sans text-lg rounded-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.3em] text-[#323231] font-sans">
                    Email Address <span className="text-[#c53929]">*</span>
                  </label>
                  <Input
                    type="email"
                    value={newOwnerEmail}
                    onChange={(e) => setNewOwnerEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-14 border-[#e5e5e5] focus:border-[#0d0b08] font-sans text-lg rounded-lg"
                  />
                </div>

                <div className="flex items-start gap-3 p-6 bg-[#faf9f7]">
                  <Shield className="w-5 h-5 text-[#9f8453] flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-sans text-[#323231]">
                    By claiming this product, you agree that the current owner will be notified and must approve the transfer.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleClaimOwnership}
                    disabled={!newOwnerEmail || !newOwnerName || isProcessing}
                    className="flex items-center gap-3 text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#aaaaaa] rounded-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Request Transfer
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Step: Waiting for Approval */}
      {step === "approve" && (
        <ScrollSection className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="w-10 h-10 rounded-full bg-[#9f8453] flex items-center justify-center text-white font-sans text-sm">2</span>
                <h3 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">Approval Required</h3>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="border border-[#9f8453] p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <Clock className="w-6 h-6 text-[#9f8453] flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="text-xl font-sans text-[#0d0b08]">Waiting for Current Owner Approval</p>
                    <p className="text-base font-sans text-[#323231]">
                      The current owner has been notified of your claim request. Once they approve, you'll receive your Digital Product Passport.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-6 max-w-xl">
                <p className="text-base font-sans text-[#323231]">
                  <strong>For demo purposes:</strong> Enter the approval code shown in the alert to simulate owner approval.
                </p>
                
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-[0.3em] text-[#323231] font-sans">
                    Approval Code
                  </label>
                  <Input
                    type="text"
                    value={approvalCode}
                    onChange={(e) => setApprovalCode(e.target.value)}
                    placeholder="Enter approval code"
                    className="h-14 border-[#e5e5e5] focus:border-[#0d0b08] font-sans text-lg rounded-lg"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-start gap-3 p-4 bg-[#c53929]/10 border border-[#c53929]">
                    <AlertCircle className="w-5 h-5 text-[#c53929] flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-sans text-[#c53929]">{errorMessage}</p>
                  </div>
                )}

                <button
                  onClick={handleApproveTransfer}
                  disabled={!approvalCode || isProcessing}
                  className="flex items-center gap-3 text-base font-sans text-white bg-[#9f8453] px-10 py-4 hover:bg-[#8a7448] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#aaaaaa] rounded-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Complete Transfer
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Step: Completed */}
      {step === "completed" && (
        <ScrollSection className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <ScrollReveal>
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-[#9f8453] flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h3 className="text-4xl md:text-5xl font-sans text-[#0d0b08] mb-6">
                Welcome to Your Louis Vuitton Collection
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-xl font-sans text-[#323231] leading-relaxed max-w-2xl mx-auto mb-8">
                Congratulations! The ownership has been successfully transferred. Your Digital Product Passport is now active and linked to your account.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="p-6 bg-[#faf9f7] mb-12 max-w-xl mx-auto">
                <p className="text-base font-sans text-[#323231]">
                  All product details, authenticity certificates, and blockchain records are now available in your account. A confirmation email has been sent to <strong>{newOwnerEmail}</strong>.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dpp/certificate">
                  <button className="text-base font-sans text-white bg-[#0d0b08] px-12 py-4 hover:bg-[#323231] transition-colors rounded-lg">
                    View Certificate
                  </button>
                </Link>
                <Link href="/home">
                  <button className="text-base font-sans text-[#0d0b08] border border-[#0d0b08] px-12 py-4 hover:bg-[#0d0b08] hover:text-white transition-colors rounded-lg">
                    Go to Home
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Footer Spacer */}
      <div className="h-24 bg-white" />
    </main>
  )
}
