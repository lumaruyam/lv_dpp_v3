# Transfer Ownership Feature - Louis Vuitton DPP

## Overview

The Transfer Ownership feature enables secure, blockchain-verified transfer of Louis Vuitton Digital Product Passports from one owner to another. This implements a complete transfer workflow with QR code generation, approval mechanisms, and persistent data updates.

## Architecture

### Core Components

1. **Transfer Service** (`lib/services/transfer.service.ts`)
   - Manages transfer requests and lifecycle
   - Generates unique transfer IDs
   - Handles transfer state (pending, approved, rejected, completed)
   - Stores transfer data in localStorage

2. **QR Code Generator** (`lib/utils/qrcode-generator.ts`)
   - Generates QR codes for transfer links
   - Supports Louis Vuitton branded styling
   - Uses QR Server API for generation

3. **Ownership File Manager** (`lib/services/ownership-file.service.ts`)
   - Handles reading/writing to `ownership.json`
   - Updates ownership records with transfer history
   - Manages blockchain transaction records

### Pages

1. **Transfer Page** (`app/dpp/certificate/transfer/page.tsx`)
   - Current owner initiates transfer
   - Generates QR code with transfer link
   - Shows transfer confirmation flow
   - 4-step process: Initiate → QR Generated → Confirm → Completed

2. **Claim Page** (`app/dpp/certificate/transfer/claim/page.tsx`)
   - New owner scans QR or uses transfer link
   - Validates transfer request
   - Collects new owner information
   - Handles approval workflow

3. **Approve Page** (`app/dpp/certificate/transfer/approve/page.tsx`)
   - Shows pending transfer requests
   - Allows current owner to approve/reject
   - Displays product and new owner details

## Transfer Workflow

### Step 1: Initiate Transfer (Current Owner)

```
Current Owner → /dpp/certificate/transfer
1. Enter new owner's name and email
2. Click "Generate Transfer Code"
3. System creates TransferRequest
4. QR code and transfer link generated
```

### Step 2: Claim Ownership (New Owner)

```
New Owner → Scan QR or use link → /dpp/certificate/transfer/claim?id={transferId}
1. System validates transfer request
2. New owner confirms information
3. Request sent to current owner for approval
```

### Step 3: Approve Transfer (Current Owner)

```
Current Owner → /dpp/certificate/transfer/approve
1. View pending transfer requests
2. Review new owner details
3. Approve or reject transfer
4. Blockchain transaction created
```

### Step 4: Complete Transfer

```
System:
1. Updates ownership.json with new owner
2. Adds transfer to transferHistory
3. Generates new blockchain hash
4. Updates certificate records
5. Sends confirmation to both parties
```

## Data Structures

### TransferRequest

```typescript
{
  transferId: string              // LV-TRANSFER-{timestamp}-{random}
  productId: string               // Product identifier
  certificateId: string           // Certificate identifier
  currentOwnerId: string          // Current owner's client ID
  newOwnerEmail?: string          // New owner's email
  newOwnerName?: string           // New owner's name
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  createdAt: string               // ISO timestamp
  expiresAt: string               // ISO timestamp (7 days)
  approvalToken?: string          // Secure approval token
}
```

### OwnershipRecord (in ownership.json)

```typescript
{
  productId: string
  ownership: {
    status: "ACTIVE"
    currentOwner: {
      clientId: string
      name?: string
      email?: string
    }
    firstActivation: {
      transactionId: string
      activatedAt: string
    }
    transferHistory: [{
      fromClientId: string
      toClientId: string
      transferDate: string
      transactionId: string
    }]
    transferable: boolean
    resaleEligibility: boolean
    repairHistoryAnchored: boolean
    lostItemAlertOptIn: boolean
  }
}
```

## QR Code Implementation

The system generates QR codes containing transfer data:

```typescript
{
  type: 'ownership_transfer'
  transferId: string
  productId: string
  certificateId: string
  timestamp: string
  claimUrl: string  // Full URL to claim page
}
```

QR codes are generated using the QR Server API with Louis Vuitton branding (dark brown color scheme).

## Security Features

1. **Unique Transfer IDs**: Each transfer has a unique, time-stamped ID
2. **Expiration**: Transfers expire after 7 days
3. **Approval Tokens**: Secure tokens prevent unauthorized approvals
4. **Blockchain Recording**: All transfers recorded on Aura Blockchain
5. **Transfer History**: Complete audit trail maintained

## Storage

### Development/Demo
- Transfer requests: `localStorage` key `lv-dpp-transfers`
- Ownership history: `localStorage` key `lv-dpp-ownership-history`
- Current ownership: React Context + localStorage

### Production Recommendations
- Replace localStorage with backend API
- Use secure database for transfer requests
- Implement real-time notifications (email/push)
- Add multi-factor authentication for approvals
- Integrate with actual blockchain networks

## API Integration Points (For Production)

```typescript
// Create transfer
POST /api/transfers
Body: { productId, certificateId, currentOwnerId, newOwnerEmail, newOwnerName }
Response: { transferId, qrCodeData, transferUrl }

// Get transfer by ID
GET /api/transfers/:transferId
Response: TransferRequest

// Approve transfer
POST /api/transfers/:transferId/approve
Body: { approvalToken }
Response: { success, newOwnerId, blockchainHash }

// Complete transfer
POST /api/transfers/:transferId/complete
Body: { newOwnerName, newOwnerEmail }
Response: { success, ownershipRecord }

// Update ownership.json
PUT /api/ownership/:productId
Body: OwnershipRecord
Response: { success }
```

## Testing the Feature

### Demo Flow

1. **Start Transfer**:
   - Navigate to `/dpp/certificate/transfer`
   - Enter new owner info
   - Generate QR code

2. **Claim Ownership**:
   - Copy the transfer URL or click "Simulate: New Owner Scanned"
   - Visit claim page
   - Enter your information
   - Submit claim request

3. **Approve Transfer**:
   - Note the approval token from the alert
   - Enter the approval token
   - Complete transfer

4. **Verify**:
   - Check browser console for ownership update
   - View localStorage for updated records
   - Check `ownership.json` (in production would be updated)

## Future Enhancements

1. **Email Notifications**: Send automated emails at each step
2. **SMS Verification**: Add phone verification for security
3. **Multi-signature**: Require both parties to sign with crypto wallets
4. **NFT Integration**: Mint NFTs for certificates
5. **Mobile App**: Native app with NFC scanning
6. **Resale Marketplace**: Integrated marketplace for transfers
7. **Transfer Insurance**: Optional insurance for high-value items
8. **Video Verification**: Optional video call for verification

## Dependencies

```json
{
  "next": "16.0.10",
  "react": "^19",
  "lucide-react": "^0.454.0",
  "jspdf": "4.0.0"
}
```

## File Structure

```
dpp_v2/
├── app/
│   ├── dpp/
│   │   └── certificate/
│   │       └── transfer/
│   │           ├── page.tsx           # Main transfer page
│   │           ├── claim/
│   │           │   └── page.tsx       # Claim ownership page
│   │           └── approve/
│   │               └── page.tsx       # Approve transfers page
│   └── data/
│       └── ownership.json             # Ownership records
├── lib/
│   ├── services/
│   │   ├── transfer.service.ts        # Transfer logic
│   │   └── ownership-file.service.ts  # File management
│   ├── utils/
│   │   └── qrcode-generator.ts        # QR code generation
│   └── blockchain/
│       └── hash-generator.ts          # Blockchain hashes
└── README-TRANSFER.md                  # This file
```

## License

Proprietary - Louis Vuitton Digital Product Passport System
