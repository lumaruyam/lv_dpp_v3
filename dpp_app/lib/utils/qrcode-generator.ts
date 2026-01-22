/**
 * QR Code Generator Utility
 * Generates QR codes using the QRCode.js library or an API
 */

/**
 * Generate QR code as Data URL using qrcode library
 * We'll use the browser-compatible approach
 */
export async function generateQRCode(data: string, size: number = 300): Promise<string> {
  // Use QR Server API as a simple, free solution
  // In production, you might want to use a library like qrcode.react or qrcode
  const encodedData = encodeURIComponent(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`
}

/**
 * Generate QR code with custom styling (using canvas)
 * This is a client-side implementation that can be used with the qrcode library
 */
export async function generateStyledQRCode(
  data: string,
  options: {
    width?: number
    height?: number
    colorDark?: string
    colorLight?: string
  } = {}
): Promise<string> {
  const {
    width = 300,
    height = 300,
    colorDark = '#000000',
    colorLight = '#ffffff'
  } = options

  // For now, use the API approach
  // In a real implementation, you would use a library like qrcode.react
  const encodedData = encodeURIComponent(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${height}&data=${encodedData}&color=${colorDark.replace('#', '')}&bgcolor=${colorLight.replace('#', '')}`
}

/**
 * Download QR code as image
 */
export function downloadQRCode(dataUrl: string, filename: string = 'lv-transfer-qr.png') {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Generate QR code with Louis Vuitton branding
 */
export async function generateLVBrandedQRCode(data: string): Promise<string> {
  // Use LV brand colors
  return generateStyledQRCode(data, {
    width: 400,
    height: 400,
    colorDark: '#0d0b08',  // LV dark brown
    colorLight: '#ffffff'
  })
}
