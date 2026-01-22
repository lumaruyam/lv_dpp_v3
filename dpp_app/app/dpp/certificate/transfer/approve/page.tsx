"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"
import { 
  CheckCircle2, 
  XCircle, 
  Clock,
  User,
  Package,
  AlertCircle
} from "lucide-react"
import { 
  getTransferRequests, 
  updateTransferStatus,
  type TransferRequest 
} from "@/lib/services/transfer.service"
import { useOwnership } from "@/app/contexts/OwnershipContext"

export default function ApproveTransfersPage() {
  const { ownership, product } = useOwnership()
  const [pendingTransfers, setPendingTransfers] = useState<TransferRequest[]>([])
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  useEffect(() => {
    loadTransfers()
  }, [])

  const loadTransfers = () => {
    const allTransfers = getTransferRequests()
    // Filter transfers for current owner and pending status
    const pending = allTransfers.filter(
      t => t.currentOwnerId === ownership.currentOwner && t.status === 'pending'
    )
    setPendingTransfers(pending)
  }

  const handleApprove = (transferId: string) => {
    setIsProcessing(transferId)
    
    setTimeout(() => {
      updateTransferStatus(transferId, 'approved')
      setIsProcessing(null)
      loadTransfers()
      
      // Show success message
      alert("Transfer approved! The new owner can now complete the transfer.")
    }, 1500)
  }

  const handleReject = (transferId: string) => {
    setIsProcessing(transferId)
    
    setTimeout(() => {
      updateTransferStatus(transferId, 'rejected')
      setIsProcessing(null)
      loadTransfers()
      
      // Show rejection message
      alert("Transfer rejected.")
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Transfer Management</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Pending<br />Transfer Requests
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Review and approve ownership transfer requests for your authenticated Louis Vuitton products.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Transfer Requests */}
      <ScrollSection className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {pendingTransfers.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-24 border border-[#e5e5e5]">
                <div className="w-16 h-16 rounded-full bg-[#faf9f7] flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-[#aaaaaa]" />
                </div>
                <h3 className="text-2xl font-sans text-[#0d0b08] mb-4">No Pending Requests</h3>
                <p className="text-lg font-sans text-[#323231] mb-8">
                  You don't have any pending transfer requests at the moment.
                </p>
                <Link href="/home">
                  <button className="text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors rounded-lg">
                    Return to Home
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-6">
              {pendingTransfers.map((transfer, index) => (
                <ScrollReveal key={transfer.transferId} delay={index * 100}>
                  <div className="border border-[#e5e5e5] hover:border-[#9f8453] transition-colors">
                    <div className="p-8 md:p-12">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#e5e5e5]">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-[#9f8453]/10 text-[#9f8453] text-xs uppercase tracking-[0.2em] font-sans rounded">
                              Pending Approval
                            </span>
                          </div>
                          <p className="text-sm font-sans text-[#aaaaaa]">
                            Requested: {formatDate(transfer.createdAt)}
                          </p>
                          <p className="text-sm font-sans text-[#aaaaaa]">
                            Expires: {formatDate(transfer.expiresAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans mb-2">
                            Transfer ID
                          </p>
                          <p className="text-sm font-mono text-[#323231]">
                            {transfer.transferId}
                          </p>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mb-8 pb-8 border-b border-[#e5e5e5]">
                        <div className="flex items-center gap-3 mb-4">
                          <Package className="w-5 h-5 text-[#9f8453]" />
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">
                            Product Details
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <p className="text-sm uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">
                              Product ID
                            </p>
                            <p className="text-lg font-mono text-[#0d0b08]">
                              {transfer.productId}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">
                              Certificate ID
                            </p>
                            <p className="text-lg font-mono text-[#9f8453]">
                              {transfer.certificateId}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* New Owner Info */}
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <User className="w-5 h-5 text-[#9f8453]" />
                          <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">
                            Requested By
                          </p>
                        </div>
                        <div className="space-y-3 p-6 bg-[#faf9f7]">
                          <div className="space-y-1">
                            <p className="text-sm uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">
                              Name
                            </p>
                            <p className="text-xl font-sans text-[#0d0b08]">
                              {transfer.newOwnerName || 'Not provided'}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm uppercase tracking-[0.2em] text-[#aaaaaa] font-sans">
                              Email
                            </p>
                            <p className="text-base font-sans text-[#323231]">
                              {transfer.newOwnerEmail || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Warning */}
                      <div className="flex items-start gap-3 p-6 bg-[#fff8f0] border border-[#9f8453]/20 mb-8">
                        <AlertCircle className="w-5 h-5 text-[#9f8453] flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-sans text-[#323231]">
                          By approving this transfer, you permanently relinquish ownership of this product. 
                          The complete transaction will be recorded on the blockchain and cannot be reversed.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => handleApprove(transfer.transferId)}
                          disabled={isProcessing === transfer.transferId}
                          className="flex-1 flex items-center justify-center gap-3 text-base font-sans text-white bg-[#0d0b08] px-8 py-4 hover:bg-[#323231] transition-colors disabled:bg-[#e5e5e5] disabled:text-[#aaaaaa] rounded-lg"
                        >
                          {isProcessing === transfer.transferId ? (
                            <>
                              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              Approve Transfer
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReject(transfer.transferId)}
                          disabled={isProcessing === transfer.transferId}
                          className="flex-1 flex items-center justify-center gap-3 text-base font-sans text-[#c53929] border border-[#c53929] px-8 py-4 hover:bg-[#c53929] hover:text-white transition-colors disabled:opacity-50 rounded-lg"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject Transfer
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </ScrollSection>

      {/* Footer Spacer */}
      <div className="h-24 bg-white" />
    </main>
  )
}
