"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getAllPasses, type AirWalletPass } from "@/lib/services/apple-wallet.service"
import Image from "next/image"

export default function AppleWalletPreview() {
  const searchParams = useSearchParams()
  const passId = searchParams.get('id')
  const [pass, setPass] = useState<AirWalletPass | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const result = await getAllPasses()
        
        if (!result.success || !result.passes) {
          throw new Error(result.error || 'Failed to fetch passes')
        }

        // Find the pass by ID or use first pass
        let selectedPass = result.passes[0]
        if (passId) {
          const found = result.passes.find(p => p._id === passId)
          if (found) selectedPass = found
        }

        setPass(selectedPass)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pass')
      } finally {
        setLoading(false)
      }
    }

    fetchPass()
  }, [passId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-gray-300 border-t-[#9f8453] rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading wallet pass...</p>
        </div>
      </div>
    )
  }

  if (error || !pass) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Pass</h2>
          <p className="text-gray-600 mb-6">{error || 'Pass not found'}</p>
          <a 
            href="/dpp/certificate" 
            className="inline-block bg-[#0d0b08] text-white px-6 py-3 rounded-lg hover:bg-[#323231] transition"
          >
            Back to Certificate
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
            <svg className="w-12 h-12 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Apple Wallet Pass</h1>
          <p className="text-gray-600">Preview Mode</p>
        </div>

        {/* Wallet Pass Card */}
        <div 
          className="rounded-3xl shadow-2xl overflow-hidden mb-6"
          style={{ backgroundColor: pass.hexBackgroundColor || '#0d0b08' }}
        >
          {/* Hero Image */}
          {pass.appleHeroImage && (
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={pass.appleHeroImage} 
                alt="Pass hero"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Pass Content */}
          <div className="p-6">
            {/* Logo and Title */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <p 
                  className="text-sm uppercase tracking-wider mb-2" 
                  style={{ color: pass.appleFontColor || '#ffffff', opacity: 0.7 }}
                >
                  {pass.cardTitle}
                </p>
                <h2 
                  className="text-2xl font-bold mb-1"
                  style={{ color: pass.appleFontColor || '#ffffff' }}
                >
                  {pass.header}
                </h2>
                {pass.subheader && (
                  <p 
                    className="text-base"
                    style={{ color: pass.appleFontColor || '#ffffff', opacity: 0.9 }}
                  >
                    {pass.subheader}
                  </p>
                )}
              </div>
              {pass.logoUrl && (
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden ml-4">
                  <img src={pass.logoUrl} alt="Logo" className="max-w-full max-h-full" />
                </div>
              )}
            </div>

            {/* Description */}
            {pass.description && (
              <p 
                className="text-sm mb-6"
                style={{ color: pass.appleFontColor || '#ffffff', opacity: 0.8 }}
              >
                {pass.description}
              </p>
            )}

            {/* Barcode/QR Code */}
            {pass.barcodeValue && (
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="text-6xl">
                    {pass.barcodeType === 'QR_CODE' ? '▦' : '|||'}
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-mono break-all">
                  {pass.barcodeValue}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => {
              const downloadUrl = `https://app.addtowallet.co/pass/${pass._id}`
              window.open(downloadUrl, '_blank')
            }}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Add to Apple Wallet
          </button>

          <a
            href="/dpp/certificate"
            className="block w-full text-center bg-gray-300 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-400 transition"
          >
            Back to Certificate
          </a>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>This is a preview of your Apple Wallet pass.</p>
          <p className="mt-2">Click "Add to Apple Wallet" to download the actual pass file.</p>
        </div>
      </div>
    </div>
  )
}
