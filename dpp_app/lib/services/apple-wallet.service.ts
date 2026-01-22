// Apple Wallet Integration Service using AirWallet API
// API Documentation: https://app.addtowallet.co

const AIRWALLET_API_KEY = process.env.NEXT_PUBLIC_AIRWALLET_API_KEY || '40d51578-0f92-3734-8cbb-3fe011be5533'
const AIRWALLET_BASE_URL = 'https://app.addtowallet.co'

export interface WalletPassData {
  cardTitle: string
  header: string
  subheader?: string
  description?: string
  heroImage?: string
  logoUrl?: string
  barcodeValue?: string
  barcodeType?: 'QR_CODE' | 'AZTEC' | 'PDF417'
  primaryFields?: Array<{ label: string; value: string }>
  secondaryFields?: Array<{ label: string; value: string }>
  auxiliaryFields?: Array<{ label: string; value: string }>
  backFields?: Array<{ label: string; value: string }>
  backgroundColor?: string
  foregroundColor?: string
  labelColor?: string
}

export interface AirWalletPass {
  _id: string
  cardTitle: string
  header: string
  subheader?: string
  description?: string
  heroImage?: string
  logoUrl?: string
  barcodeValue?: string
  barcodeType?: string
  createdAt: string
  updatedAt: string
  url?: string
  walletUrl?: string
}

export interface GetPassesResponse {
  success: boolean
  passes?: AirWalletPass[]
  count?: number
  error?: string
}

export interface CreatePassResponse {
  success: boolean
  passId?: string
  url?: string
  error?: string
}

/**
 * Get all passes from AirWallet
 */
export async function getAllPasses(): Promise<GetPassesResponse> {
  try {
    console.log('Environment check:', {
      hasApiKey: !!AIRWALLET_API_KEY,
      apiKeyPreview: AIRWALLET_API_KEY ? AIRWALLET_API_KEY.substring(0, 8) + '...' : 'MISSING',
      baseUrl: AIRWALLET_BASE_URL
    })

    if (!AIRWALLET_API_KEY) {
      throw new Error('AirWallet API key is not configured')
    }

    console.log('Fetching passes from AirWallet...')

    const response = await fetch(`${AIRWALLET_BASE_URL}/api/card/get`, {
      method: 'GET',
      headers: {
        'apikey': AIRWALLET_API_KEY,
      },
    })

    console.log('Get passes response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Get passes error:', errorText)
      return {
        success: false,
        error: `Failed to fetch passes: ${response.statusText}`
      }
    }

    const data = await response.json()
    console.log('Passes fetched successfully:', { count: data.count, totalCards: data.cards?.length })
    
    return {
      success: true,
      passes: data.cards || [],
      count: data.count || 0,
    }
  } catch (error) {
    console.error('Error fetching passes:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch passes',
    }
  }
}

/**
 * Find a pass by certificate ID or product name
 */
export async function findPassByCertificate(certificateId: string, productName?: string): Promise<AirWalletPass | null> {
  try {
    const result = await getAllPasses()
    
    if (!result.success || !result.passes) {
      return null
    }

    // Try to find pass by matching header (product name) or barcodeValue (verification URL with certificate ID)
    const pass = result.passes.find(p => {
      const matchesName = productName && p.header?.toLowerCase().includes(productName.toLowerCase())
      const matchesCertId = p.barcodeValue?.includes(certificateId)
      return matchesName || matchesCertId
    })

    return pass || null
  } catch (error) {
    console.error('Error finding pass:', error)
    return null
  }
}

/**
 * Delete a pass from AirWallet (marks as EXPIRED)
 */
export async function deletePass(passId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!AIRWALLET_API_KEY) {
      throw new Error('AirWallet API key is not configured')
    }

    const response = await fetch(`${AIRWALLET_BASE_URL}/api/card/delete/${passId}`, {
      method: 'DELETE',
      headers: {
        'apikey': AIRWALLET_API_KEY,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        success: false,
        error: `Failed to delete pass: ${response.statusText}`
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting pass:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete pass',
    }
  }
}

/**
 * Upload an image to AirWallet
 */
export async function uploadImageToAirWallet(
  imageData: string | Blob,
  imageType: 'heroImage' | 'googleHeroImage' | 'appleHeroImage' | 'logoUrl' | 'rectangleLogo' | 'barcodeImage'
): Promise<string | null> {
  try {
    const formData = new FormData()
    
    if (typeof imageData === 'string' && imageData.startsWith('data:')) {
      // Convert base64 to blob
      const response = await fetch(imageData)
      const blob = await response.blob()
      formData.append('image', blob, 'image.png')
    } else if (imageData instanceof Blob) {
      formData.append('image', imageData, 'image.png')
    } else {
      throw new Error('Invalid image data format')
    }

    const response = await fetch(`${AIRWALLET_BASE_URL}/api/upload?type=${imageType}`, {
      method: 'POST',
      headers: {
        'apikey': AIRWALLET_API_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      console.error(`Upload failed (${response.status}):`, errorText)
      return null // Return null instead of throwing, so pass creation can continue
    }

    const data = await response.json()
    return data.url || data.imageUrl || null
  } catch (error) {
    console.error('Error uploading image to AirWallet:', error)
    return null
  }
}

/**
 * Create a wallet pass using AirWallet API
 */
export async function createWalletPass(passData: WalletPassData): Promise<CreatePassResponse> {
  try {
    const requestBody = {
      cardTitle: passData.cardTitle,
      header: passData.header,
      subheader: passData.subheader,
      description: passData.description,
      heroImage: passData.heroImage,
      appleHeroImage: passData.heroImage, // Use same image for Apple
      logoUrl: passData.logoUrl,
      barcodeValue: passData.barcodeValue,
      barcodeType: passData.barcodeType || 'QR_CODE',
      primaryFields: passData.primaryFields,
      secondaryFields: passData.secondaryFields,
      auxiliaryFields: passData.auxiliaryFields,
      backFields: passData.backFields,
      backgroundColor: passData.backgroundColor || '#0d0b08', // Louis Vuitton black
      foregroundColor: passData.foregroundColor || '#ffffff',
      labelColor: passData.labelColor || '#9f8453', // Louis Vuitton gold
    }

    console.log('Sending request to AirWallet:', {
      url: `${AIRWALLET_BASE_URL}/api/card/create`,
      apiKey: AIRWALLET_API_KEY ? AIRWALLET_API_KEY.substring(0, 8) + '...' : 'MISSING',
      bodyKeys: Object.keys(requestBody)
    })

    if (!AIRWALLET_API_KEY) {
      throw new Error('AirWallet API key is not configured. Please check your .env.local file.')
    }

    const response = await fetch(`${AIRWALLET_BASE_URL}/api/card/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': AIRWALLET_API_KEY,
      },
      body: JSON.stringify(requestBody),
    })

    console.log('AirWallet API response status:', response.status)
    console.log('AirWallet API response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('AirWallet API error response:', errorText)
      let errorData: any = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        // Not JSON, use raw text
        return {
          success: false,
          error: `API error (${response.status}): ${errorText || response.statusText}`
        }
      }
      return {
        success: false,
        error: errorData.message || errorData.error || `API request failed: ${response.statusText}`
      }
    }

    const data = await response.json()
    console.log('AirWallet API success response:', data)
    
    return {
      success: true,
      passId: data.id || data.passId,
      url: data.url || data.walletUrl,
    }
  } catch (error) {
    console.error('Error creating wallet pass:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create wallet pass',
    }
  }
}

/**
 * Generate wallet pass URL from pass ID
 */
export function getWalletPassUrl(passId: string): string {
  return `${AIRWALLET_BASE_URL}/pass/${passId}`
}

/**
 * Create Louis Vuitton certificate wallet pass
 */
export async function createLVCertificatePass(
  productData: {
    name: string
    productId: string
    certificateId: string
    collection?: string
    manufactureDate?: string
    madeIn?: string
    ownerName?: string
    blockchainHash?: string
    verificationUrl?: string
  },
  qrCodeDataUrl?: string
): Promise<CreatePassResponse> {
  try {
    // Upload QR code if provided (optional - pass will still work without it)
    let barcodeImageUrl: string | null = null
    if (qrCodeDataUrl) {
      barcodeImageUrl = await uploadImageToAirWallet(qrCodeDataUrl, 'barcodeImage')
      if (barcodeImageUrl) {
        console.log('QR code uploaded successfully:', barcodeImageUrl)
      } else {
        console.warn('QR code upload failed, pass will use generated barcode instead')
      }
    }

    // Prepare pass data
    const passData: WalletPassData = {
      cardTitle: 'LOUIS VUITTON',
      header: productData.name,
      subheader: 'Certificate of Authenticity',
      description: 'Blockchain-verified Digital Product Passport',
      
      // Barcode/QR Code
      barcodeValue: productData.verificationUrl || `https://yourapp.com/dpp/certificate?verify=${productData.certificateId}`,
      barcodeType: 'QR_CODE',
      
      // Primary fields (most prominent)
      primaryFields: [
        { label: 'PRODUCT ID', value: productData.productId },
        { label: 'CERTIFICATE', value: productData.certificateId },
      ],
      
      // Secondary fields
      secondaryFields: [
        { label: 'COLLECTION', value: productData.collection || 'N/A' },
        { label: 'YEAR', value: productData.manufactureDate || 'N/A' },
      ],
      
      // Auxiliary fields
      auxiliaryFields: [
        { label: 'MADE IN', value: productData.madeIn || 'N/A' },
        ...(productData.ownerName ? [{ label: 'OWNER', value: productData.ownerName }] : []),
      ],
      
      // Back of card fields
      backFields: [
        { label: 'Product Name', value: productData.name },
        { label: 'Product ID', value: productData.productId },
        { label: 'Certificate ID', value: productData.certificateId },
        ...(productData.collection ? [{ label: 'Collection', value: productData.collection }] : []),
        ...(productData.manufactureDate ? [{ label: 'Production Year', value: productData.manufactureDate }] : []),
        ...(productData.madeIn ? [{ label: 'Made In', value: productData.madeIn }] : []),
        ...(productData.blockchainHash ? [{ label: 'Blockchain Hash', value: productData.blockchainHash }] : []),
        { label: 'About', value: 'This digital certificate is permanently recorded on the Aura Blockchain network for authenticity verification.' },
      ],
      
      // Louis Vuitton brand colors
      backgroundColor: '#0d0b08', // Black
      foregroundColor: '#ffffff', // White
      labelColor: '#9f8453',      // Gold
    }

    // Create the pass
    return await createWalletPass(passData)
  } catch (error) {
    console.error('Error creating LV certificate pass:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create certificate pass',
    }
  }
}
