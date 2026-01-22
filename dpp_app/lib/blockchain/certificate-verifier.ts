/**
 * Certificate Verification Service
 * Validates blockchain certificate integrity
 */

import productDataArray from "@/app/data/product.json"
import certificateDataArray from "@/app/data/certificate.json"
import ownershipDataArray from "@/app/data/ownership.json"
import transactionDataArray from "@/app/data/transaction.json"
import { generateBlockchainHash } from "./hash-generator"

// Get the first item from each array as the default/current
const productData = productDataArray[0]
const certificateData = certificateDataArray[0]
const ownershipData = ownershipDataArray[0]
const transactionData = transactionDataArray[0]

export interface VerificationResult {
  isValid: boolean
  certificateId: string
  productId: string
  transactionId: string
  blockchainHash: string | null
  verifiedAt: string
  errors: string[]
}

/**
 * Verify blockchain certificate hash integrity
 * Ensures all linked data matches the stored hash
 */
export function verifyBlockchainHash(blockchainHash: string, ownerId: string): VerificationResult {
  const errors: string[] = []

  // Validate product ID match
  if (productData?.productId !== ownershipData?.productId) {
    errors.push("Product ID mismatch between product and ownership records")
  }

  // Validate transaction ID match
  if (ownershipData?.ownership?.firstActivation?.transactionId !== transactionData?.transaction?.transactionId) {
    errors.push("Transaction ID mismatch between ownership and transaction records")
  }

  // Validate certificate ID
  if (!certificateData?.certificate?.certificateId) {
    errors.push("Certificate ID not found")
  }

  // Reconstruct hash to verify
  const expectedHash = generateBlockchainHash({
    productId: productData?.productId,
    transactionId: transactionData?.transaction?.transactionId,
    ownerId: ownerId,
    timestamp: ownershipData?.ownership?.firstActivation?.activatedAt,
  })

  // Validate hash match
  if (blockchainHash !== expectedHash) {
    errors.push("Blockchain hash verification failed - tamper detected")
  }

  return {
    isValid: errors.length === 0,
    certificateId: certificateData?.certificate?.certificateId,
    productId: productData?.productId,
    transactionId: transactionData?.transaction?.transactionId,
    blockchainHash: blockchainHash,
    verifiedAt: new Date().toISOString(),
    errors,
  }
}

/**
 * Check if certificate is blockchain-verified
 */
export function isCertificateVerified(): boolean {
  return (
    certificateData?.certificate?.ownershipEventsAnchored === true &&
    certificateData?.certificate?.authenticationStatus === "AUTHENTIC"
  )
}

/**
 * Get blockchain network info
 */
export function getBlockchainNetwork() {
  return {
    name: certificateData?.certificate?.blockchainNetwork || "Aura Blockchain",
    type: "Private Consortium",
    description: "Aura Blockchain - Luxury goods authentication network",
  }
}
