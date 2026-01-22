"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import productDataArray from "@/app/data/product.json"
import ownershipDataArray from "@/app/data/ownership.json"
import certificateDataArray from "@/app/data/certificate.json"
import { generateBlockchainHash, generateTransactionId } from "@/lib/blockchain/hash-generator"

// Get the first product, ownership, and certificate as the default/current
const productData = productDataArray[0]
const ownershipData = ownershipDataArray[0]
const certificateData = certificateDataArray[0]

interface OwnershipState {
  status: "pending" | "active"
  currentOwner: string | null
  activatedAt: string | null
  blockchainHash: string | null
  transactionId: string | null
}

interface OwnershipContextType {
  ownership: OwnershipState
  product: typeof productData
  products: typeof productDataArray
  certificate: typeof certificateData
  currentUser: string | null
  setCurrentUser: (email: string) => void
  activateOwnership: () => void
  updateOwnership: (updates: Partial<OwnershipState>) => void
  isActivated: boolean
}

const OwnershipContext = createContext<OwnershipContextType | undefined>(undefined)

export function OwnershipProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<string | null>(null)
  const [ownership, setOwnership] = useState<OwnershipState>({
    status: ownershipData?.ownership?.status === "ACTIVE" ? "active" : "pending",
    currentOwner: ownershipData?.ownership?.currentOwner?.clientId || null,
    activatedAt: ownershipData?.ownership?.firstActivation?.activatedAt || null,
    blockchainHash: certificateData?.certificate?.manufacturingProofHash || null,
    transactionId: ownershipData?.ownership?.firstActivation?.transactionId || null,
  })

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("lv-dpp-user")
    const savedOwnership = localStorage.getItem("lv-dpp-ownership")

    if (savedUser) {
      setCurrentUserState(savedUser)
    }

    if (savedOwnership) {
      setOwnership(JSON.parse(savedOwnership))
    }
  }, [])

  const setCurrentUser = (email: string) => {
    // Generate mock client ID from email
    const clientId = `CL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    setCurrentUserState(email)
    localStorage.setItem("lv-dpp-user", email)
    localStorage.setItem("lv-dpp-client-id", clientId)
  }

  const activateOwnership = () => {
    const clientId = localStorage.getItem("lv-dpp-client-id") || "CL-GUEST"
    const now = new Date().toISOString()

    const transactionId = generateTransactionId()

    const blockchainHash = generateBlockchainHash({
      productId: productData.productId,
      transactionId: transactionId,
      ownerId: clientId,
      timestamp: now,
    })

    const newOwnership: OwnershipState = {
      status: "active",
      currentOwner: clientId,
      activatedAt: now,
      blockchainHash,
      transactionId,
    }

    setOwnership(newOwnership)
    localStorage.setItem("lv-dpp-ownership", JSON.stringify(newOwnership))
  }

  const updateOwnership = (updates: Partial<OwnershipState>) => {
    const newOwnership = { ...ownership, ...updates }
    setOwnership(newOwnership)
    localStorage.setItem("lv-dpp-ownership", JSON.stringify(newOwnership))
  }

  return (
    <OwnershipContext.Provider
      value={{
        ownership,
        product: productData,
        products: productDataArray,
        certificate: certificateData,
        currentUser,
        setCurrentUser,
        activateOwnership,
        updateOwnership,
        isActivated: ownership.status === "active",
      }}
    >
      {children}
    </OwnershipContext.Provider>
  )
}

export function useOwnership() {
  const context = useContext(OwnershipContext)
  if (context === undefined) {
    throw new Error("useOwnership must be used within OwnershipProvider")
  }
  return context
}
