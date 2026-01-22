/**
 * Ownership File Manager
 * Handles reading and writing to ownership.json file
 * Note: In production, this would be handled by a backend API
 */

import fs from 'fs'
import path from 'path'

export interface OwnershipRecord {
  productId: string
  ownership: {
    status: string
    currentOwner: {
      clientId: string
      name?: string
      email?: string
    }
    firstActivation: {
      transactionId: string
      activatedAt: string
    }
    transferHistory: Array<{
      fromClientId: string
      toClientId: string
      transferDate: string
      transactionId: string
    }>
    transferable: boolean
    resaleEligibility: boolean
    repairHistoryAnchored: boolean
    lostItemAlertOptIn: boolean
  }
}

/**
 * Read ownership data from file
 */
export function readOwnershipData(): OwnershipRecord[] {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'ownership.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading ownership file:', error)
    return []
  }
}

/**
 * Write ownership data to file
 */
export function writeOwnershipData(data: OwnershipRecord[]): boolean {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'ownership.json')
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing ownership file:', error)
    return false
  }
}

/**
 * Update ownership for a specific product
 */
export function updateProductOwnership(
  productId: string,
  newOwnerId: string,
  oldOwnerId: string,
  transactionId: string,
  newOwnerName?: string,
  newOwnerEmail?: string
): boolean {
  const ownershipData = readOwnershipData()
  const productIndex = ownershipData.findIndex(item => item.productId === productId)
  
  if (productIndex === -1) {
    // Product not found, create new entry
    const newRecord: OwnershipRecord = {
      productId,
      ownership: {
        status: "ACTIVE",
        currentOwner: {
          clientId: newOwnerId,
          name: newOwnerName,
          email: newOwnerEmail
        },
        firstActivation: {
          transactionId,
          activatedAt: new Date().toISOString()
        },
        transferHistory: [
          {
            fromClientId: oldOwnerId,
            toClientId: newOwnerId,
            transferDate: new Date().toISOString(),
            transactionId
          }
        ],
        transferable: true,
        resaleEligibility: true,
        repairHistoryAnchored: true,
        lostItemAlertOptIn: true
      }
    }
    ownershipData.push(newRecord)
  } else {
    // Update existing record
    const currentOwnership = ownershipData[productIndex].ownership
    
    ownershipData[productIndex].ownership = {
      ...currentOwnership,
      currentOwner: {
        clientId: newOwnerId,
        name: newOwnerName,
        email: newOwnerEmail
      },
      transferHistory: [
        ...(currentOwnership.transferHistory || []),
        {
          fromClientId: oldOwnerId,
          toClientId: newOwnerId,
          transferDate: new Date().toISOString(),
          transactionId
        }
      ]
    }
  }
  
  return writeOwnershipData(ownershipData)
}

/**
 * Get ownership record by product ID
 */
export function getProductOwnership(productId: string): OwnershipRecord | null {
  const ownershipData = readOwnershipData()
  return ownershipData.find(item => item.productId === productId) || null
}
