/**
 * API Route: Update Ownership
 * 
 * Production-ready API endpoint to update ownership.json file
 * This replaces localStorage updates with server-side file management
 * 
 * Route: POST /api/ownership/update
 */

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface OwnershipUpdateRequest {
  productId: string
  newOwnerId: string
  newOwnerName: string
  newOwnerEmail: string
  previousOwnerId: string
  transactionId: string
  blockchainHash: string
}

interface OwnershipRecord {
  productId: string
  ownership: {
    status: string
    currentOwner: {
      clientId: string
      name: string
      email: string
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

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: OwnershipUpdateRequest = await request.json()
    
    // Validate required fields
    if (!body.productId || !body.newOwnerId || !body.transactionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read current ownership data
    const ownershipFilePath = path.join(process.cwd(), 'app', 'data', 'ownership.json')
    const fileContent = fs.readFileSync(ownershipFilePath, 'utf-8')
    const ownershipData: OwnershipRecord[] = JSON.parse(fileContent)

    // Find product index
    const productIndex = ownershipData.findIndex(
      item => item.productId === body.productId
    )

    const transferEntry = {
      fromClientId: body.previousOwnerId,
      toClientId: body.newOwnerId,
      transferDate: new Date().toISOString(),
      transactionId: body.transactionId
    }

    if (productIndex === -1) {
      // Product not found - create new entry
      const newRecord: OwnershipRecord = {
        productId: body.productId,
        ownership: {
          status: "ACTIVE",
          currentOwner: {
            clientId: body.newOwnerId,
            name: body.newOwnerName,
            email: body.newOwnerEmail
          },
          firstActivation: {
            transactionId: body.transactionId,
            activatedAt: new Date().toISOString()
          },
          transferHistory: [transferEntry],
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
          clientId: body.newOwnerId,
          name: body.newOwnerName,
          email: body.newOwnerEmail
        },
        transferHistory: [
          ...(currentOwnership.transferHistory || []),
          transferEntry
        ]
      }
    }

    // Write updated data back to file
    fs.writeFileSync(
      ownershipFilePath,
      JSON.stringify(ownershipData, null, 2),
      'utf-8'
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Ownership updated successfully',
      data: {
        productId: body.productId,
        newOwnerId: body.newOwnerId,
        transactionId: body.transactionId,
        transferDate: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error updating ownership:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update ownership',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Example usage in client code:
/*
const response = await fetch('/api/ownership/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productId: 'LV-JKT-4521-000987',
    newOwnerId: 'CL-ABC123',
    newOwnerName: 'Jane Smith',
    newOwnerEmail: 'jane@example.com',
    previousOwnerId: 'CL-782134',
    transactionId: 'TX-LV-20260122-12345',
    blockchainHash: '0x1234567890abcdef'
  })
})

const result = await response.json()
console.log(result)
*/
