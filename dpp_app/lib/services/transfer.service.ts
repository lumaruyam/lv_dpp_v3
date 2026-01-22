/**
 * Transfer Service
 * Handles ownership transfer logic, QR code generation, and transfer state management
 */

export interface TransferRequest {
  transferId: string
  transferCode: string  // 6-digit code for email entry
  productId: string
  certificateId: string
  currentOwnerId: string
  newOwnerEmail?: string
  newOwnerName?: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  createdAt: string
  expiresAt: string
  approvalToken?: string
}

export interface TransferQRData {
  type: 'ownership_transfer'
  transferId: string
  productId: string
  certificateId: string
  timestamp: string
  claimUrl: string
}

/**
 * Generate a unique transfer ID
 */
export function generateTransferId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `LV-TRANSFER-${timestamp}-${random}`
}

/**
 * Generate a simple 6-digit transfer code for email entry
 */
export function generateTransferCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Generate transfer data for QR code
 */
export function generateTransferQRData(
  transferId: string,
  productId: string,
  certificateId: string
): TransferQRData {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lv-dpp.vercel.app'
  
  return {
    type: 'ownership_transfer',
    transferId,
    productId,
    certificateId,
    timestamp: new Date().toISOString(),
    claimUrl: `${baseUrl}/dpp/certificate/transfer/claim?id=${transferId}`
  }
}
/**
 * Create a transfer request
 */
export function createTransferRequest(
  productId: string,
  certificateId: string,
  currentOwnerId: string,
  newOwnerEmail?: string,
  newOwnerName?: string
): TransferRequest {
  const transferId = generateTransferId()
  const transferCode = generateTransferCode()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  
  const approvalToken = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15)

  return {
    transferId,
    transferCode,
    productId,
    certificateId,
    currentOwnerId,
    newOwnerEmail,
    newOwnerName,
    status: 'pending',
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    approvalToken
  }
}

/**
 * Get transfer request by transfer code
 */
export function getTransferRequestByCode(transferCode: string): TransferRequest | null {
  const transfers = getTransferRequests()
  return transfers.find(t => t.transferCode === transferCode) || null
}

/**
 * Save transfer request to localStorage
 */
export function saveTransferRequest(request: TransferRequest): void {
  const transfers = getTransferRequests()
  transfers.push(request)
  localStorage.setItem('lv-dpp-transfers', JSON.stringify(transfers))
}

/**
 * Get all transfer requests from localStorage
 */
export function getTransferRequests(): TransferRequest[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem('lv-dpp-transfers')
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

/**
 * Get transfer request by ID
 */
export function getTransferRequestById(transferId: string): TransferRequest | null {
  const transfers = getTransferRequests()
  return transfers.find(t => t.transferId === transferId) || null
}

/**
 * Update transfer request status
 */
export function updateTransferStatus(
  transferId: string,
  status: TransferRequest['status']
): boolean {
  const transfers = getTransferRequests()
  const index = transfers.findIndex(t => t.transferId === transferId)
  
  if (index === -1) return false
  
  transfers[index].status = status
  localStorage.setItem('lv-dpp-transfers', JSON.stringify(transfers))
  return true
}

/**
 * Approve transfer request
 */
export function approveTransferRequest(transferId: string, approvalToken: string): boolean {
  const transfer = getTransferRequestById(transferId)
  
  if (!transfer) return false
  if (transfer.approvalToken !== approvalToken) return false
  if (transfer.status !== 'pending') return false
  
  // Check if expired
  if (new Date(transfer.expiresAt) < new Date()) {
    updateTransferStatus(transferId, 'rejected')
    return false
  }
  
  return updateTransferStatus(transferId, 'approved')
}

/**
 * Complete transfer and update ownership data
 */
export async function completeTransfer(
  transferId: string,
  newOwnerId: string,
  newOwnerName: string
): Promise<boolean> {
  const transfer = getTransferRequestById(transferId)
  
  if (!transfer) return false
  if (transfer.status !== 'approved') return false
  
  // Update transfer status
  updateTransferStatus(transferId, 'completed')
  
  return true
}

/**
 * Generate a new client ID for the new owner
 */
export function generateClientId(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `CL-${random}`
}

/**
 * Update ownership.json file data
 * This function prepares the data structure that needs to be saved
 */
export function prepareOwnershipUpdate(
  productId: string,
  oldOwnerId: string,
  newOwnerId: string,
  transactionId: string
) {
  return {
    productId,
    ownership: {
      status: "ACTIVE",
      currentOwner: {
        clientId: newOwnerId
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
}
