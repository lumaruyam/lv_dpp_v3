"use client"

import Link from "next/link"
import Image from "next/image"
import { useOwnership } from "@/app/contexts/OwnershipContext"
import { verifyBlockchainHash, getBlockchainNetwork } from "@/lib/blockchain/certificate-verifier"
import { useState, useEffect, useRef } from "react"
import { ScrollReveal, ScrollSection } from "@/components/scroll-reveal"
import { Shield, CheckCircle2, Download } from "lucide-react"
import QRCode from "qrcode"
import { findPassByCertificate, getAllPasses } from "@/lib/services/apple-wallet.service"

export default function CertificatePage() {
  const { product, certificate, ownership, isActivated } = useOwnership()
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean
    errors: string[]
  } | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [lostItemAlertEnabled, setLostItemAlertEnabled] = useState(true)
  const certificateRef = useRef<HTMLDivElement>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [isAddingToWallet, setIsAddingToWallet] = useState(false)

  useEffect(() => {
    if (isActivated && ownership.blockchainHash && ownership.currentOwner) {
      setIsVerifying(true)
      setTimeout(() => {
        const result = verifyBlockchainHash(ownership.blockchainHash!, ownership.currentOwner!)
        setVerificationResult(result)
        setIsVerifying(false)
      }, 1000)
    }
  }, [isActivated, ownership.blockchainHash, ownership.currentOwner])

  // Generate QR code for certificate verification
  useEffect(() => {
    const generateQRCode = async () => {
      if (certificate?.certificate?.certificateId && product?.productId) {
        try {
          const verificationUrl = `${window.location.origin}/dpp/certificate?verify=${certificate.certificate.certificateId}`
          const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
            width: 400,
            margin: 2,
            color: {
              dark: '#0d0b08',
              light: '#ffffff'
            }
          })
          setQrCodeDataUrl(qrDataUrl)
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }
    }
    generateQRCode()
  }, [certificate?.certificate?.certificateId, product?.productId])

  const blockchainNetwork = getBlockchainNetwork()

  const handleAddToAppleWallet = async () => {
    setIsAddingToWallet(true)
    try {
      // Open AirWallet preview page directly
      const passId = '69728c8f72708b4433af1b1e'
      const airWalletUrl = `https://app.addtowallet.co/card/${passId}`
      window.open(airWalletUrl, '_blank')
    } catch (error) {
      console.error('Error opening Apple Wallet:', error)
      alert(`Unable to open Apple Wallet preview`)
    } finally {
      setIsAddingToWallet(false)
    }
  }

  const handleAddToGoogleWallet = async () => {
    setIsAddingToWallet(true)
    try {
      // Call your Flask backend
      const response = await fetch('http://127.0.0.1:5000/generate-wallet-link', {
        method: 'GET',
      })
      const data = await response.json()
      
      if (data.url) {
        // Open the wallet preview in a new tab
        window.open(data.url, '_blank')
      }
    } catch (error) {
      console.error('Error adding to Google Wallet:', error)
      alert('Unable to connect to wallet service. Make sure the Flask server is running on port 5000.')
    } finally {
      setIsAddingToWallet(false)
    }
  }

  const handleDownloadPDF = async () => {
    const { jsPDF } = await import("jspdf")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20

    // Background
    pdf.setFillColor(255, 255, 255)
    pdf.rect(0, 0, pageWidth, pageHeight, "F")

    // Border
    pdf.setDrawColor(159, 132, 83)
    pdf.setLineWidth(0.5)
    pdf.rect(margin - 5, margin - 5, pageWidth - 2 * (margin - 5), pageHeight - 2 * (margin - 5))

    // Inner border
    pdf.setDrawColor(229, 229, 229)
    pdf.setLineWidth(0.25)
    pdf.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin)

    // Header
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.setTextColor(170, 170, 170)
    pdf.text("LOUIS VUITTON", pageWidth / 2, margin + 15, { align: "center" })

    // Title
    pdf.setFontSize(24)
    pdf.setTextColor(13, 11, 8)
    pdf.text("CERTIFICATE OF AUTHENTICITY", pageWidth / 2, margin + 35, { align: "center" })

    // Gold line
    pdf.setDrawColor(159, 132, 83)
    pdf.setLineWidth(0.5)
    pdf.line(pageWidth / 2 - 30, margin + 42, pageWidth / 2 + 30, margin + 42)

    // Product Details
    let yPos = margin + 60

    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("PRODUCT NAME", margin + 10, yPos)
    pdf.setFontSize(14)
    pdf.setTextColor(13, 11, 8)
    pdf.text(product?.name || "N/A", margin + 10, yPos + 8)

    yPos += 25

    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("COLLECTION", margin + 10, yPos)
    pdf.setFontSize(12)
    pdf.setTextColor(13, 11, 8)
    pdf.text(product?.collection || "N/A", margin + 10, yPos + 8)

    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("PRODUCTION YEAR", pageWidth / 2 + 10, yPos)
    pdf.setFontSize(12)
    pdf.setTextColor(13, 11, 8)
    pdf.text(product?.manufactureDate || "N/A", pageWidth / 2 + 10, yPos + 8)

    yPos += 25

    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("PRODUCT ID", margin + 10, yPos)
    pdf.setFontSize(10)
    pdf.setTextColor(13, 11, 8)
    pdf.text(product?.productId || "N/A", margin + 10, yPos + 8)

    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("MADE IN", pageWidth / 2 + 10, yPos)
    pdf.setFontSize(12)
    pdf.setTextColor(13, 11, 8)
    pdf.text(product?.madeIn || "N/A", pageWidth / 2 + 10, yPos + 8)

    yPos += 25

    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("CERTIFICATE ID", margin + 10, yPos)
    pdf.setFontSize(10)
    pdf.setTextColor(159, 132, 83)
    pdf.text(certificate?.certificate?.certificateId || "N/A", margin + 10, yPos + 8)

    // Divider
    yPos += 20
    pdf.setDrawColor(229, 229, 229)
    pdf.setLineWidth(0.25)
    pdf.line(margin + 10, yPos, pageWidth - margin - 10, yPos)

    // Blockchain Details
    yPos += 15
    pdf.setFontSize(12)
    pdf.setTextColor(13, 11, 8)
    pdf.text("BLOCKCHAIN VERIFICATION", margin + 10, yPos)

    yPos += 15
    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text("NETWORK", margin + 10, yPos)
    pdf.setFontSize(10)
    pdf.setTextColor(13, 11, 8)
    pdf.text(`${blockchainNetwork.name} ${blockchainNetwork.type}`, margin + 10, yPos + 8)

    if (ownership.blockchainHash) {
      yPos += 20
      pdf.setFontSize(8)
      pdf.setTextColor(170, 170, 170)
      pdf.text("BLOCKCHAIN HASH", margin + 10, yPos)
      pdf.setFontSize(7)
      pdf.setTextColor(159, 132, 83)
      const hashLines = pdf.splitTextToSize(ownership.blockchainHash, pageWidth - 2 * margin - 20)
      pdf.text(hashLines, margin + 10, yPos + 8)
      yPos += hashLines.length * 5
    }

    if (ownership.transactionId) {
      yPos += 15
      pdf.setFontSize(8)
      pdf.setTextColor(170, 170, 170)
      pdf.text("TRANSACTION ID", margin + 10, yPos)
      pdf.setFontSize(7)
      pdf.setTextColor(159, 132, 83)
      const txLines = pdf.splitTextToSize(ownership.transactionId, pageWidth - 2 * margin - 20)
      pdf.text(txLines, margin + 10, yPos + 8)
    }

    // QR Code - Add actual QR code to PDF
    if (qrCodeDataUrl) {
      const qrSize = 40
      const qrX = pageWidth - margin - qrSize - 10
      const qrY = pageHeight - margin - qrSize - 30
      
      try {
        pdf.addImage(qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
        pdf.setFontSize(6)
        pdf.setTextColor(170, 170, 170)
        pdf.text("SCAN TO VERIFY", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" })
      } catch (error) {
        console.error('Error adding QR code to PDF:', error)
        // Fallback to placeholder
        pdf.setDrawColor(229, 229, 229)
        pdf.setLineWidth(0.25)
        pdf.rect(qrX, qrY, qrSize, qrSize)
        pdf.setFontSize(6)
        pdf.setTextColor(170, 170, 170)
        pdf.text("SCAN TO VERIFY", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" })
      }
    } else {
      // Fallback placeholder if QR code not generated
      const qrSize = 40
      const qrX = pageWidth - margin - qrSize - 10
      const qrY = pageHeight - margin - qrSize - 30
      pdf.setDrawColor(229, 229, 229)
      pdf.setLineWidth(0.25)
      pdf.rect(qrX, qrY, qrSize, qrSize)
      pdf.setFontSize(6)
      pdf.setTextColor(170, 170, 170)
      pdf.text("SCAN TO VERIFY", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" })
    }

    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(170, 170, 170)
    pdf.text(
      `Issued: ${new Date(certificate?.certificate?.issuedAt || Date.now()).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
      margin + 10,
      pageHeight - margin - 10
    )

    pdf.setFontSize(7)
    pdf.text(
      "This certificate is permanently recorded on the Aura Blockchain",
      pageWidth / 2,
      pageHeight - margin - 5,
      { align: "center" }
    )

    pdf.save(`LV-Certificate-${product?.productId || "unknown"}.pdf`)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Verification Status Banner */}
      {isActivated && verificationResult?.isValid && (
        <div className="bg-[#9f8453] py-4">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-white" />
              <p className="text-sm font-sans text-white">Verified on Aura Blockchain</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {isVerifying && (
        <div className="bg-[#faf9f7] py-4">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center gap-4">
            <div className="animate-spin w-5 h-5 border-2 border-[#aaaaaa] border-t-[#9f8453] rounded-full" />
            <p className="text-sm font-sans text-[#323231]">Verifying blockchain certificate...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <ScrollSection className="pt-8 md:pt-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f8453] font-sans mb-6">Blockchain Verified</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-sans text-[#0d0b08] leading-[1.1] tracking-tight mb-8">
              Certificate &<br />Ownership
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl font-sans text-[#323231] leading-relaxed max-w-2xl">
              Your blockchain-verified certificate of authenticity. Recorded on the Aura private blockchain network, this immutable proof of provenance travels with your product throughout its lifetime.
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Certificate Document Card */}
      <ScrollSection className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div 
              ref={certificateRef}
              className="bg-white border-2 border-[#9f8453] p-8 md:p-12 shadow-2xl relative"
            >
              {/* Inner Border */}
              <div className="absolute inset-4 border border-[#e5e5e5] pointer-events-none" />

              {/* Certificate Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#aaaaaa] font-sans mb-4">Louis Vuitton</p>
                  <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] uppercase tracking-[0.15em]">
                    Certificate of Authenticity
                  </h3>
                  <div className="w-20 h-0.5 bg-[#9f8453] mx-auto mt-6" />
                </div>

                {/* Product Details Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Product Name</p>
                      <p className="text-xl md:text-2xl font-sans text-[#0d0b08]">{product?.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Collection</p>
                      <p className="text-lg font-sans text-[#0d0b08]">{product?.collection}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Production Year</p>
                      <p className="text-lg font-sans text-[#0d0b08]">{product?.manufactureDate}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Product ID</p>
                      <p className="text-base font-mono text-[#0d0b08]">{product?.productId}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Manufacturing Location</p>
                      <p className="text-lg font-sans text-[#0d0b08]">{product?.madeIn}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Certificate ID</p>
                      <p className="text-base font-mono text-[#9f8453]">{certificate?.certificate?.certificateId}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e5e5e5] mb-12" />

                {/* Blockchain Details */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Blockchain Network</p>
                      <p className="text-lg font-sans text-[#0d0b08]">{blockchainNetwork.name} {blockchainNetwork.type}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Certificate Issued</p>
                      <p className="text-base font-sans text-[#0d0b08]">
                        {new Date(certificate?.certificate?.issuedAt || Date.now()).toLocaleString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "UTC",
                        })}
                      </p>
                    </div>
                    {isActivated && ownership.blockchainHash && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Blockchain Hash</p>
                        <p className="text-xs font-mono text-[#9f8453] break-all leading-relaxed">{ownership.blockchainHash}</p>
                      </div>
                    )}
                  </div>

                  {/* QR Code Section */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-[#e5e5e5] flex items-center justify-center bg-[#faf9f7] p-2">
                      {qrCodeDataUrl ? (
                        <img 
                          src={qrCodeDataUrl} 
                          alt="Certificate Verification QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-24 h-24 md:w-32 md:h-32 bg-[#e5e5e5] flex items-center justify-center">
                            <span className="text-xs text-[#aaaaaa] font-sans uppercase tracking-wider">QR Code</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#aaaaaa] font-sans mt-3">Scan to Verify</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-[#e5e5e5]">
                  <p className="text-xs font-sans text-[#aaaaaa] leading-relaxed">
                    This certificate is permanently recorded on the Aura Blockchain—a tamper-proof ledger ensuring complete authenticity verification.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal delay={100}>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-3 px-8 py-4 bg-[#0d0b08] text-white font-sans text-sm uppercase tracking-wider hover:bg-[#323231] transition-colors rounded-lg"
              >
                <Download className="w-5 h-5" />
                Download as PDF
              </button>
            </div>
          </ScrollReveal>

          {/* Wallet Buttons */}
          <ScrollReveal delay={200}>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href="#" 
                className="transition-opacity hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault()
                  handleAddToAppleWallet()
                }}
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/30/Add_to_Apple_Wallet_badge.svg"
                  alt="Add to Apple Wallet"
                  width={156}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
              <a 
                href="#" 
                className="transition-opacity hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault()
                  handleAddToGoogleWallet()
                }}
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Add_to_Google_Wallet_badge.svg"
                  alt="Add to Google Wallet"
                  width={156}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Ownership Record */}
      <ScrollSection className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Ownership Record</h3>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-12 border-b border-[#e5e5e5]">
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Current Owner</p>
                  <p className="text-3xl md:text-4xl font-sans text-[#0d0b08]">{isActivated ? "You" : "Not Yet Activated"}</p>
                </div>
                {isActivated && ownership.activatedAt && (
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Ownership Date</p>
                    <p className="text-xl font-sans text-[#323231]">
                      {new Date(ownership.activatedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
                {isActivated && ownership.currentOwner && (
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#aaaaaa] font-sans">Owner ID</p>
                    <p className="text-base font-mono text-[#323231]">{ownership.currentOwner}</p>
                  </div>
                )}
              </div>
              <span className={`text-sm uppercase tracking-[0.2em] font-sans px-6 py-2 ${isActivated ? 'text-[#9f8453] border border-[#9f8453]' : 'text-[#aaaaaa] border border-[#aaaaaa]'}`}>
                {isActivated ? "Active" : "Pending"}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Security Settings - Lost Item Alert */}
      {isActivated && (
        <ScrollSection className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h3 className="text-3xl md:text-4xl font-sans text-[#0d0b08] mb-16">Security Settings</h3>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-[#e5e5e5]">
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-[#9f8453]" />
                    <h4 className="text-xl md:text-2xl font-sans text-[#0d0b08]">Lost Item Alert</h4>
                  </div>
                  <p className="text-base font-sans text-[#323231] leading-relaxed">
                    When enabled, if someone scans your product while reported as lost, you will be notified immediately. This helps protect your Louis Vuitton piece and aids in recovery.
                  </p>
                </div>
                
                {/* Toggle Switch */}
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-sans uppercase tracking-wider ${!lostItemAlertEnabled ? 'text-[#0d0b08]' : 'text-[#aaaaaa]'}`}>
                    Off
                  </span>
                  <button
                    onClick={() => setLostItemAlertEnabled(!lostItemAlertEnabled)}
                    className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                      lostItemAlertEnabled ? 'bg-[#9f8453]' : 'bg-[#e5e5e5]'
                    }`}
                    aria-label={lostItemAlertEnabled ? "Disable Lost Item Alert" : "Enable Lost Item Alert"}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        lostItemAlertEnabled ? 'translate-x-8' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-sans uppercase tracking-wider ${lostItemAlertEnabled ? 'text-[#9f8453]' : 'text-[#aaaaaa]'}`}>
                    On
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {lostItemAlertEnabled && (
              <ScrollReveal delay={200}>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#9f8453]" />
                  <p className="text-sm font-sans text-[#9f8453]">
                    Lost Item Alert is active. You will be notified if this product is scanned while marked as lost.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </ScrollSection>
      )}

      {/* Thin Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Transfer Ownership CTA */}
      {isActivated && (
        <ScrollSection className="py-24 md:py-32 bg-[#faf9f7]">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="space-y-4 max-w-xl">
                  <h4 className="text-2xl md:text-3xl font-sans text-[#0d0b08]">Transfer Ownership</h4>
                  <p className="text-lg font-sans text-[#323231] leading-relaxed">
                    Securely transfer your certificate to a new owner while preserving complete blockchain-verified provenance. All ownership history remains permanently recorded.
                  </p>
                </div>
                <Link href="/dpp/certificate/transfer">
                  <button className="text-base font-sans text-white bg-[#0d0b08] px-10 py-4 hover:bg-[#323231] transition-colors rounded-lg">
                    Initiate Transfer
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
