/**
 * Email Service for Transfer Notifications
 * Handles sending transfer emails with codes
 * 
 * NOTE: This is a demo implementation using mailto links.
 * In production, replace with actual email service (SendGrid, AWS SES, etc.)
 */

export interface TransferEmailData {
  recipientEmail: string
  recipientName: string
  currentOwnerName?: string
  productName: string
  productId: string
  transferId: string
  transferCode: string
  expiresAt: string
}

/**
 * Generate email content for transfer notification
 */
export function generateTransferEmail(data: TransferEmailData): {
  subject: string
  body: string
} {
  const expiryDate = new Date(data.expiresAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const subject = `Louis Vuitton - Ownership Transfer for ${data.productName}`
  
  const body = `Dear ${data.recipientName},

You have been invited to claim ownership of a Louis Vuitton product.

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Product: ${data.productName}
Product ID: ${data.productId}
${data.currentOwnerName ? `Current Owner: ${data.currentOwnerName}` : ''}

TRANSFER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Transfer Code: ${data.transferCode}
Transfer ID: ${data.transferId}
Valid Until: ${expiryDate}

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Visit: ${typeof window !== 'undefined' ? window.location.origin : 'https://lv-dpp.vercel.app'}/dpp/certificate/transfer/claim

2. Enter your Transfer Code: ${data.transferCode}

3. Follow the instructions to claim your product

IMPORTANT NOTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• This transfer code will expire on ${expiryDate}
• Keep this code secure and do not share it with anyone else
• The current owner must approve the transfer before it is complete
• You will receive a confirmation email once the transfer is finalized

If you did not expect this transfer or have any questions, please contact Louis Vuitton customer service immediately.

Best regards,
Louis Vuitton Digital Product Passport Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated message. Please do not reply to this email.
For support, visit: support.louisvuitton.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

  return { subject, body }
}

/**
 * Send transfer email (demo version using mailto)
 * In production, replace with actual email API
 */
export function sendTransferEmail(data: TransferEmailData): void {
  const { subject, body } = generateTransferEmail(data)
  
  // For demo: Open mailto link
  const mailtoLink = `mailto:${data.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  // Open in new window
  if (typeof window !== 'undefined') {
    window.open(mailtoLink, '_blank')
  }
  
  // Log for demo purposes
  console.log('Transfer Email Sent:')
  console.log('To:', data.recipientEmail)
  console.log('Transfer Code:', data.transferCode)
  console.log('Transfer ID:', data.transferId)
}

/**
 * Production implementation example using fetch
 * Uncomment and modify when integrating with real email service
 */
export async function sendTransferEmailProduction(data: TransferEmailData): Promise<boolean> {
  try {
    const response = await fetch('/api/email/send-transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.recipientEmail,
        ...generateTransferEmail(data),
        transferId: data.transferId,
        transferCode: data.transferCode
      })
    })
    
    return response.ok
  } catch (error) {
    console.error('Failed to send transfer email:', error)
    return false
  }
}

/**
 * Generate approval notification email
 */
export function generateApprovalRequestEmail(data: {
  currentOwnerEmail: string
  currentOwnerName: string
  newOwnerName: string
  newOwnerEmail: string
  productName: string
  transferId: string
  approvalCode: string
}): { subject: string; body: string } {
  const subject = `Louis Vuitton - Transfer Approval Required for ${data.productName}`
  
  const body = `Dear ${data.currentOwnerName},

A new ownership claim has been submitted for your Louis Vuitton product.

NEW OWNER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.newOwnerName}
Email: ${data.newOwnerEmail}

PRODUCT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.productName}

APPROVAL CODE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.approvalCode}

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Visit: ${typeof window !== 'undefined' ? window.location.origin : 'https://lv-dpp.vercel.app'}/dpp/certificate/transfer/approve

2. Review the transfer request

3. Use the approval code above to confirm the transfer

IMPORTANT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Approving this transfer permanently transfers ownership
• The transfer will be recorded on the blockchain
• You will lose access to this product's Digital Product Passport
• This action cannot be undone

If you did not initiate this transfer, please reject it immediately and contact customer service.

Best regards,
Louis Vuitton Digital Product Passport Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated message. Please do not reply to this email.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`

  return { subject, body }
}

/**
 * Send approval notification to current owner
 */
export function sendApprovalRequestEmail(data: {
  currentOwnerEmail: string
  currentOwnerName: string
  newOwnerName: string
  newOwnerEmail: string
  productName: string
  transferId: string
  approvalCode: string
}): void {
  const { subject, body } = generateApprovalRequestEmail(data)
  
  const mailtoLink = `mailto:${data.currentOwnerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  if (typeof window !== 'undefined') {
    window.open(mailtoLink, '_blank')
  }
  
  console.log('Approval Request Email Sent:')
  console.log('To:', data.currentOwnerEmail)
  console.log('Approval Code:', data.approvalCode)
}
