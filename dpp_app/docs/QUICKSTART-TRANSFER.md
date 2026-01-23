# Transfer Ownership - Quick Start Guide

## Overview
Complete working implementation of ownership transfer functionality for Louis Vuitton Digital Product Passport with **email-based transfer codes**, approval workflow, and JSON file updates.

## Features Implemented

### ✅ 1. Transfer Initiation Page
**Location:** `/dpp/certificate/transfer`

- Enter new owner's name and email
- Generate unique 6-digit transfer code
- Send transfer code via email
- Display transfer code for verification
- Copy transfer code to clipboard

### ✅ 2. Email Transfer System
**Location:** `lib/services/email.service.ts`

- Sends transfer email to new owner
- Includes 6-digit transfer code
- Contains claim page link and instructions
- Sends approval requests to current owner
- Professional Louis Vuitton branding

### ✅ 3. Claim Ownership Page
**Location:** `/dpp/certificate/transfer/claim`

- Enter 6-digit transfer code from email
- Validates transfer code
- Checks expiration (7 days)
- Collects new owner information
- Sends approval request to current owner

### ✅ 4. Approval System
**Location:** `/dpp/certificate/transfer/approve`

- View all pending transfer requests
- See product and new owner details
- Approve or reject transfers
- Secure approval tokens
- Warning about permanent transfer

### ✅ 5. Data Management
**Files:**
- `lib/services/transfer.service.ts` - Transfer logic with code generation
- `lib/services/email.service.ts` - Email templates and sending
- `lib/services/ownership-file.service.ts` - File updates
- `app/data/ownership.json` - Ownership records

**Features:**
- Generates 6-digit transfer codes
- Updates ownership.json with new owner
- Maintains complete transfer history
- Generates blockchain transaction IDs
- Creates new ownership hashes

## How to Test

### Method 1: Complete Flow Test

1. **Start the development server**
   ```bash
   cd dpp_v2
   pnpm install  # If not already done
   pnpm dev
   ```

2. **Navigate to Transfer Page**
   - Go to: `http://localhost:3000/dpp/certificate/transfer`

3. **Initiate Transfer**
   - Enter new owner name: "Jane Smith"
   - Enter new owner email: "jane@example.com"
   - Click "Generate Transfer Code"
   - **Email client will open** with pre-filled email (demo mode)

4. **Note the Transfer Code**
   - 6-digit code displayed: e.g., `847291`
   - Click "Copy Code" to copy to clipboard
   - Or note it down for next step

5. **Simulate New Owner Claim**
   - Open new tab or incognito window
   - Go to: `http://localhost:3000/dpp/certificate/transfer/claim`
   - **Enter the 6-digit code** from step 4
   - Click "Continue"

6. **Complete Claim**
   - Verify product details shown
   - Enter your information (new owner)
   - Click "Request Transfer"
   - Note approval code from alert

7. **Approve Transfer**
   - In original tab, click "Simulate: New Owner Claimed"
   - Review transfer details
   - Click "Confirm Transfer"
   - Blockchain hash will be generated

8. **Verify Completion**
   - Success message displayed
   - Check browser console for ownership update
   - View localStorage: `lv-dpp-ownership-history`

### Method 2: Email Code Flow (Realistic)

1. **Generate Transfer**
   - Follow steps 1-4 above
   - Email client opens with transfer email
   - Note the 6-digit code (e.g., `123456`)

2. **Simulate Receiving Email**
   - Open phone or different device
   - Visit: `yoursite.com/dpp/certificate/transfer/claim`
   - Enter the 6-digit code

3. **Claim on Different Device**
   - Enter transfer code
   - Fill in your information
   - Submit claim request

4. **Approve on Original Device**
   - Check email for approval notification
   - Visit approval page
   - Enter approval code
   - Complete transfer

### Method 3: Quick Demo Test

1. **Create Transfer**
   - Navigate to transfer page
   - Generate code: e.g., `847291`

2. **Use Transfer Code**
   - Go to claim page
   - Enter: `847291`
   - Proceed with claim

3. **Complete Transfer**
   - Use approval code from alert
   - Finalize ownership change

## Data Flow

```
1. INITIATE
   Current Owner → Transfer Page
   ↓
   Generates 6-digit transfer code (e.g., 847291)
   ↓
   Creates TransferRequest in localStorage
   ↓
   Sends email to new owner with code

2. CLAIM
   New Owner → Receives email with code
   ↓
   Visits claim page
   ↓
   Enters 6-digit code
   ↓
   Validates transfer (not expired, pending status)
   ↓
   Completes claim form
   ↓
   Sends approval request to current owner

3. APPROVE
   Current Owner → Receives approval notification email
   ↓
   Reviews transfer details
   ↓
   Approves with secure token
   ↓
   Updates transfer status to 'approved'

4. COMPLETE
   System → Finalizes transfer
   ↓
   Generates new client ID
   ↓
   Creates blockchain hash
   ↓
   Updates ownership.json
   ↓
   Adds to transfer history
   ↓
   Updates transfer status to 'completed'
```

## Transfer Code System
### 2. ownership.json Structure
```json
{
  "productId": "LV-JKT-4521-000987",
  "ownership": {
    "status": "ACTIVE",
    "currentOwner": {
      "clientId": "CL-ABC123",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "firstActivation": {
      "transactionId": "TX-LV-20260122-12345",
      "activatedAt": "2026-01-22T10:30:00Z"
    },
    "transferHistory": [
      {
        "fromClientId": "CL-782134",
        "toClientId": "CL-ABC123",
        "transferDate": "2026-01-22T10:30:00Z",
        "transactionId": "TX-LV-20260122-12345"
      }
    ],
    "transferable": true,
    "resaleEligibility": true,
    "repairHistoryAnchored": true,
    "lostItemAlertOptIn": true
  }
}
```

### 3. Transfer Request Structure
```json
{
  "transferId": "LV-TRANSFER-1737542400000-A1B2C3",
  "transferCode": "847291",
  "productId": "LV-JKT-4521-000987",
  "certificateId": "LV-DPP-9F3A2C",
  "currentOwnerId": "CL-782134",
  "newOwnerEmail": "jane@example.com",
  "newOwnerName": "Jane Smith",
  "status": "pending",
  "createdAt": "2026-01-22T10:00:00Z",
  "expiresAt": "2026-01-29T10:00:00Z",
  "approvalToken": "abc123xyz789"
}
```productId": "LV-JKT-4521-000987",
  "ownership": {
    "status": "ACTIVE",
    "currentOwner": {
      "clientId": "CL-ABC123",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "firstActivation": {
      "transactionId": "TX-LV-20260122-12345",
      "activatedAt": "2026-01-22T10:30:00Z"
    },
    "transferHistory": [
      {
        "fromClientId": "CL-782134",
        "toClientId": "CL-ABC123",
        "transferDate": "2026-01-22T10:30:00Z",
        "transactionId": "TX-LV-20260122-12345"
      }
    ],
    "transferable": true,
    "resaleEligibility": true,
    "repairHistoryAnchored": true,
    "lostItemAlertOptIn": true
  }
}
```

## Browser Console Testing

Open browser console (F12) to see:

```javascript
// View all transfers
JSON.parse(localStorage.getItem('lv-dpp-transfers'))

// View ownership history
JSON.parse(localStorage.getItem('lv-dpp-ownership-history'))

// View current ownership
JSON.parse(localStorage.getItem('lv-dpp-ownership'))

// Clear data (for testing multiple transfers)
localStorage.removeItem('lv-dpp-transfers')
localStorage.removeItem('lv-dpp-ownership-history')
## Troubleshooting

### Transfer Code Not Working
- Check if all 6 digits are entered correctly
- Verify code hasn't expired (7 days)
- Ensure code hasn't been used already
- Check localStorage for transfers

### Email Not Sending
- Demo mode uses mailto: links (opens email client)
- Check if default email client is configured
- In production, integrate real email service
- Check browser console for errors

### Code Already Used
- Each code can only be used once
- Generate new transfer if needed
- Check transfer status in approve page

### Approval Token Invalid
- Check token matches exactly
- Ensure transfer is still pending
- Verify transfer hasn't expired

### New Files
```
✨ lib/services/transfer.service.ts       (6-digit code generation)
✨ lib/services/email.service.ts          (Email templates & sending)
✨ lib/utils/qrcode-generator.ts          (Optional, not used in email flow)
✨ lib/services/ownership-file.service.ts
✨ app/dpp/certificate/transfer/claim/page.tsx (Code entry interface)
✨ app/dpp/certificate/transfer/approve/page.tsx
✨ README-TRANSFER.md
✨ QUICKSTART-TRANSFER.md
```

### Modified Files
```
📝 app/dpp/certificate/transfer/page.tsx (Email-based flow, no QR)
```

## Key Advantages of Email-Based System

### ✅ Works Across Devices
- No need for same network/server access
- New owner can be anywhere in the world
- Works on phone, tablet, desktop

### ✅ Simple User Experience
- Just enter 6 digits from email
- No QR scanner app required
- No camera permissions needed

### ✅ Email Record
- Automatic email trail
- Easy to forward/share
- Can be printed or saved

### ✅ Phone-Friendly
- Easy to type 6 digits
- Can be sent via SMS too
- Works offline (code saved in email)nsure transfer is still pending
- Verify transfer hasn't expired

### Ownership Not Updating
- Check browser console logs
- Verify localStorage updates
- Ensure all required fields provided

## Files Created/Modified

### New Files
```
✨ lib/services/transfer.service.ts
✨ lib/utils/qrcode-generator.ts
✨ lib/services/ownership-file.service.ts
✨ app/dpp/certificate/transfer/claim/page.tsx
✨ app/dpp/certificate/transfer/approve/page.tsx
✨ README-TRANSFER.md
✨ QUICKSTART-TRANSFER.md
```

### Modified Files
```
📝 app/dpp/certificate/transfer/page.tsx (complete rewrite)
```

## Next Steps

1. **Test the complete flow** following Method 1 above
2. **Try scanning the QR code** with your phone
3. **Check the data updates** in localStorage and console
4. **Review the documentation** in README-TRANSFER.md
5. **Plan production implementation** with backend API

## Support

For questions or issues:
1. Check README-TRANSFER.md for detailed documentation
2. Review code comments in service files
3. Test in browser console with commands above
4. Check browser DevTools for errors

---

**Status:** ✅ Fully Functional Demo Implementation
**Version:** 1.0
**Date:** January 22, 2026
