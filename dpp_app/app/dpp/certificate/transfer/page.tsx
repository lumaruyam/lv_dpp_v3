"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"
import { Mail, CheckCircle2, AlertCircle, ArrowRight, Shield, User, Copy, Check } from "lucide-react"
import { generateBlockchainHash, generateTransactionId } from "@/lib/blockchain/hash-generator"
import { 
  createTransferRequest, 
  saveTransferRequest,
  type TransferRequest 
} from "@/lib/services/transfer.service"
import { sendTransferEmail } from "@/lib/services/email.service"

export default function TransferOwnershipPage() {
  const { product, ownership, updateOwnership, certificate } = useOwnership()
  const [step, setStep] = useState<"initiate" | "email-sent" | "confirm" | "completed">("initiate")
  const [newOwnerEmail, setNewOwnerEmail] = useState("")
  const [newOwnerName, setNewOwnerName] = useState("")
  const [transferRequest, setTransferRequest] = useState<TransferRequest | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInitiateTransfer = () => {
    if (!newOwnerEmail || !newOwnerName) return
    setIsProcessing(true)
    
    setTimeout(() => {
      // Create transfer request
      const request = createTransferRequest(
        product.productId,
        certificate.certificate.certificateId,
        ownership.currentOwner || "UNKNOWN",
        newOwnerEmail,
        newOwnerName
      )
      
      // Save to localStorage
      saveTransferRequest(request)
      setTransferRequest(request)
      
      // Send email to new owner
      sendTransferEmail({
        recipientEmail: newOwnerEmail,
        recipientName: newOwnerName,
        currentOwnerName: "Current Owner", // Get from user profile in production
        productName: product.name,
        productId: product.productId,
        transferId: request.transferId,
        transferCode: request.transferCode,
        expiresAt: request.expiresAt
      })
      
      setIsProcessing(false)
      setStep("email-sent")
    }, 1500)
  }

  const handleConfirmTransfer = async () => {
    if (!transferRequest) return
    
    setIsProcessing(true)

    setTimeout(() => {
      // Generate new client ID for new owner
      const newOwnerId = `CL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      const newTransactionId = generateTransactionId()

      const newHash = generateBlockchainHash({
        productId: product.productId,
        transactionId: newTransactionId,
        ownerId: newOwnerId,
        timestamp: new Date().toISOString(),
      })

      // Update ownership in context
      updateOwnership({
        currentOwner: newOwnerId,
        activatedAt: new Date().toISOString(),
        blockchainHash: newHash,
        transactionId: newTransactionId,
      })

      // Save updated ownership data
      saveOwnershipToFile(newOwnerId, newTransactionId)

      setIsProcessing(false)
      setStep("completed")
    }, 2500)
  }

  const saveOwnershipToFile = (newOwnerId: string, transactionId: string) => {
    // Prepare ownership update data
    const ownershipUpdate = {
      productId: product.productId,
      ownership: {
        status: "ACTIVE",
        currentOwner: {
          clientId: newOwnerId
        },
        firstActivation: {
          transactionId: transactionId,
          activatedAt: new Date().toISOString()
        },
        transferHistory: [
          {
            fromClientId: ownership.currentOwner,
            toClientId: newOwnerId,
            transferDate: new Date().toISOString(),
            transactionId: transactionId
          }
        ],
        transferable: true,
        resaleEligibility: true,
        repairHistoryAnchored: true,
        lostItemAlertOptIn: true
      }
    }

    // Save to localStorage for demo purposes
    // In production, this would be an API call to update the server
    const existingOwnership = localStorage.getItem('lv-dpp-ownership-history')
    const history = existingOwnership ? JSON.parse(existingOwnership) : []
    history.push(ownershipUpdate)
    localStorage.setItem('lv-dpp-ownership-history', JSON.stringify(history))
    
    console.log("Ownership updated:", ownershipUpdate)
  }

  const copyTransferCode = () => {
    if (!transferRequest) return
    
    navigator.clipboard.writeText(transferRequest.transferCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Secure Transfer</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Transfer<br />Ownership
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Securely transfer ownership of your authenticated Louis Vuitton piece while preserving complete blockchain-verified provenance.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Product Summary */}
      <ScrollSection className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-b border-[#e5e5e5]">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Product</p>
                <p className="text-2xl md:text-3xl font-sans text-[#0d0b08]">{product.name}</p>
                <p className="text-base font-sans text-[#323231]">{product.collection}</p>
              </div>
              <div className="text-left md:text-right space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Certificate ID</p>
                <p className="text-base font-mono text-[#9f8453]">{ownership.currentOwner}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Step 1: Initiate Transfer */}
      {step === "initiate" && (
        <ScrollSection className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="w-10 h-10 rounded-full bg-[#9f8453] flex items-center justify-center text-white font-sans text-sm">1</span>
                <h3 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">New Owner Information</h3>
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
                    placeholder="Enter new owner's full name"
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
                    placeholder="newowner@example.com"
                    className="h-14 border-[#e5e5e5] focus:border-[#0d0b08] font-sans text-lg rounded-lg"
                  />
                  <p className="text-sm font-sans text-[#aaaaaa]">
                    The new owner will receive transfer confirmation at this email
                  </p>
                </div>

                <div className="pt-8">
                  <button
                    onClick={handleInitiateTransfer}
                    disabled={!newOwnerEmail || !newOwnerName || isProcessing}
                    className="flex items-center gap-3 text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#aaaaaa] rounded-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Generate Transfer Code
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

      {/* Step 2: Email Sent */}
      {step === "email-sent" && (
        <ScrollSection className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="w-10 h-10 rounded-full bg-[#9f8453] flex items-center justify-center text-white font-sans text-sm">2</span>
                <h3 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">Transfer Email Sent</h3>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="border border-[#9f8453] p-8 md:p-12 space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#9f8453] flex-shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="text-xl font-sans text-[#0d0b08]">Email sent to {newOwnerName}</p>
                    <p className="text-base font-sans text-[#323231]">
                      An email has been sent to <strong>{newOwnerEmail}</strong> with a unique transfer code.
                      The new owner should check their email and follow the instructions to claim ownership.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-12 space-y-8 bg-[#faf9f7]">
                  <div className="text-center space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Transfer Code</p>
                    <p className="text-5xl font-mono text-[#9f8453] tracking-wider font-bold">
                      {transferRequest?.transferCode}
                    </p>
                    <p className="text-sm font-sans text-[#323231] mt-4">
                      The new owner will need this code to claim ownership
                    </p>
                  </div>

                  <button
                    onClick={copyTransferCode}
                    className="flex items-center gap-2 text-sm font-sans text-[#0d0b08] border border-[#0d0b08] px-6 py-3 hover:bg-[#0d0b08] hover:text-white transition-colors rounded-lg"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4 p-6 bg-white border border-[#e5e5e5]">
                  <p className="text-sm font-sans text-[#0d0b08] font-medium">Instructions for New Owner:</p>
                  <ol className="space-y-2 text-sm font-sans text-[#323231] list-decimal list-inside">
                    <li>Check email inbox (and spam folder)</li>
                    <li>Visit the claim page link in the email</li>
                    <li>Enter the 6-digit transfer code: <span className="font-mono font-bold text-[#9f8453]">{transferRequest?.transferCode}</span></li>
                    <li>Complete the ownership claim form</li>
                    <li>Wait for your approval</li>
                  </ol>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex items-start gap-4 mt-8 p-6 bg-[#faf9f7]">
                <AlertCircle className="w-5 h-5 text-[#9f8453] flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-base font-sans text-[#0d0b08]">Awaiting New Owner Response</p>
                  <p className="text-sm font-sans text-[#323231]">
                    Once the new owner enters the transfer code and completes the claim, you'll be prompted to approve the transfer.
                    The transfer code expires in 7 days.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex gap-4 pt-8">
                <button
                  onClick={() => setStep("confirm")}
                  className="flex items-center gap-3 text-base font-sans text-white bg-[#9f8453] px-10 py-4 hover:bg-[#8a7448] transition-colors rounded-lg"
                >
                  Simulate: New Owner Claimed
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link href="/home">
                  <button className="text-base font-sans text-[#323231] border border-[#323231] px-8 py-4 hover:bg-[#faf9f7] transition-colors rounded-lg">
                    Back to Home
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Step 3: Confirm Transfer */}
      {step === "confirm" && (
        <ScrollSection className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-12">
                <span className="w-10 h-10 rounded-full bg-[#9f8453] flex items-center justify-center text-white font-sans text-sm">3</span>
                <h3 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">Confirm Ownership Transfer</h3>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="flex items-start gap-4 p-6 border border-[#9f8453] mb-12">
                <CheckCircle2 className="w-6 h-6 text-[#9f8453] flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-lg font-sans text-[#0d0b08]">New owner has scanned the transfer code</p>
                  <p className="text-base font-sans text-[#323231]">
                    Please review the transfer details and confirm to complete the ownership change.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6 p-8 border border-[#e5e5e5]">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#aaaaaa]" />
                    <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Current Owner</p>
                  </div>
                  <p className="text-2xl font-sans text-[#0d0b08]">You</p>
                  <p className="text-sm font-mono text-[#323231]">{ownership.currentOwner}</p>
                </div>

                <div className="space-y-6 p-8 bg-[#9f8453]">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-white" />
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-sans">New Owner</p>
                  </div>
                  <p className="text-2xl font-sans text-white">{newOwnerName}</p>
                  <p className="text-sm font-sans text-white/80">{newOwnerEmail}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="p-8 bg-[#faf9f7] mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans mb-4">Blockchain Record</p>
                <p className="text-base font-sans text-[#323231] leading-relaxed">
                  This transfer will be permanently recorded on the Aura Blockchain. The complete ownership history will remain immutably linked to the product's digital certificate.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmTransfer}
                  disabled={isProcessing}
                  className="flex items-center gap-3 text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#aaaaaa] rounded-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Recording on Blockchain...
                    </>
                  ) : (
                    <>
                      Confirm Transfer
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => setStep("qr-generated")}
                  disabled={isProcessing}
                  className="text-base font-sans text-[#323231] border border-[#323231] px-8 py-4 hover:bg-[#faf9f7] transition-colors disabled:opacity-50 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Step 4: Transfer Completed */}
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
              <h3 className="text-4xl md:text-5xl font-sans text-[#0d0b08] mb-6">Ownership Successfully Transferred</h3>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-xl font-sans text-[#323231] leading-relaxed max-w-2xl mx-auto mb-8">
                The certificate has been transferred to {newOwnerName}. The complete ownership history, including your stewardship, is now permanently recorded on the Aura Blockchain.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="p-6 bg-[#faf9f7] mb-12 max-w-xl mx-auto">
                <p className="text-base font-sans text-[#323231]">
                  A confirmation email has been sent to both parties with the updated certificate details and blockchain transaction record.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <Link href="/home">
                <button className="text-base font-sans text-[#0d0b08] border border-[#0d0b08] px-12 py-4 hover:bg-[#0d0b08] hover:text-white transition-colors rounded-lg">
                  Return to Home
                </button>
              </Link>
            </ScrollReveal>
          </div>
        </ScrollSection>
      )}

      {/* Footer Spacer */}
      <div className="h-24 bg-white" />
    </main>
  )
}
