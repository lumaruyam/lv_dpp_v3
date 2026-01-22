# QR Code & Google Wallet Integration Guide

## 🎯 Overview

This guide covers the implementation of:
1. **QR Code Generation** - Real QR codes displayed on certificate page and exported to PDF
2. **Google Wallet Integration** - Flask backend service to simulate Google Wallet passes

---

## 📦 What's Been Implemented

### 1. QR Code Generation

#### Frontend Implementation
- **Library**: `qrcode` package for generating QR codes
- **Display**: QR code shown on certificate page
- **PDF Export**: QR code embedded in downloaded PDF certificates
- **URL Format**: `https://your-domain.com/dpp/certificate?verify=CERT-ID`

#### Features
- ✅ Generates unique QR code for each certificate
- ✅ Contains verification URL with certificate ID
- ✅ Displayed in certificate card (160x160px)
- ✅ Embedded in PDF downloads (40x40mm)
- ✅ High quality PNG format with proper contrast

### 2. Google Wallet Integration

#### Backend Service
- **Framework**: Flask with CORS enabled
- **Port**: 5000
- **Purpose**: Simulate Google Wallet pass creation
- **Files**: 
  - Original: `/Users/luli/Downloads/main.py`
  - Improved: `/Users/luli/Downloads/main_improved.py`

#### Features
- ✅ Beautiful wallet pass preview page
- ✅ Product information display
- ✅ Certificate details
- ✅ Blockchain verification badge
- ✅ QR code placeholder
- ✅ Responsive mobile design

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
pnpm install
```

The `qrcode` package has been installed automatically.

### Step 2: Start Flask Backend

```bash
# Option A: Use improved version (recommended)
cd /Users/luli/Downloads
python3 main_improved.py

# Option B: Use original version
python3 main.py
```

You should see:
```
============================================================
🎨 Louis Vuitton Digital Product Passport - Wallet Service
============================================================
✅ Server running on: http://127.0.0.1:5000
📱 Wallet Preview: http://127.0.0.1:5000/preview-wallet
🔗 API Endpoint: http://127.0.0.1:5000/generate-wallet-link
============================================================
```

### Step 3: Start Next.js Frontend

```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
pnpm dev
```

### Step 4: Test Features

1. **Navigate to Certificate Page**
   ```
   http://localhost:3000/dpp/certificate
   ```

2. **Check QR Code Display**
   - Should see actual QR code in certificate section
   - Scan with phone to test verification URL

3. **Download PDF**
   - Click "Download as PDF" button
   - Open PDF and verify QR code is embedded
   - QR code should be scannable from PDF

4. **Test Google Wallet**
   - Click "Add to Google Wallet" button
   - Should open new tab with wallet preview
   - See formatted product passport

---

## 🔧 Technical Details

### QR Code Implementation

#### Code Location
File: `dpp_v2/app/dpp/certificate/page.tsx`

#### Key Functions

**1. QR Code Generation Effect**
```typescript
useEffect(() => {
  const generateQRCode = async () => {
    if (certificate?.certificate?.certificateId && product?.productId) {
      try {
        const verificationUrl = `${window.location.origin}/dpp/certificate?verify=${certificate.certificate.certificateId}`
        const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
          width: 400,
          margin: 2,
          color: {
            dark: '#0d0b08',
            light: '#ffffff'
          }
        })
        setQrCodeDataUrl(qrDataUrl)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }
  }
  generateQRCode()
}, [certificate?.certificate?.certificateId, product?.productId])
```

**2. Display in Certificate**
```tsx
<div className="w-32 h-32 md:w-40 md:h-40 border-2 border-[#e5e5e5] p-2">
  {qrCodeDataUrl ? (
    <img 
      src={qrCodeDataUrl} 
      alt="Certificate Verification QR Code"
      className="w-full h-full object-contain"
    />
  ) : (
    <div>Loading QR Code...</div>
  )}
</div>
```

**3. PDF Export**
```typescript
if (qrCodeDataUrl) {
  const qrSize = 40
  const qrX = pageWidth - margin - qrSize - 10
  const qrY = pageHeight - margin - qrSize - 30
  
  pdf.addImage(qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
  pdf.setFontSize(6)
  pdf.text("SCAN TO VERIFY", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" })
}
```

### Google Wallet Integration

#### Frontend Function
```typescript
const handleAddToGoogleWallet = async () => {
  setIsAddingToWallet(true)
  try {
    const response = await fetch('http://127.0.0.1:5000/generate-wallet-link', {
      method: 'GET',
    })
    const data = await response.json()
    
    if (data.url) {
      window.open(data.url, '_blank')
    }
  } catch (error) {
    console.error('Error adding to Google Wallet:', error)
    alert('Unable to connect to wallet service. Make sure Flask server is running.')
  } finally {
    setIsAddingToWallet(false)
  }
}
```

#### Backend Endpoints

**1. Generate Wallet Link**
```python
@app.route('/generate-wallet-link', methods=['GET', 'POST'])
def generate_link():
    product_data = get_product_data_from_request()
    return jsonify({
        "url": "http://127.0.0.1:5000/preview-wallet",
        "success": True
    })
```

**2. Preview Wallet**
```python
@app.route('/preview-wallet')
def preview_wallet():
    product_data = get_product_data_from_request()
    return render_template_string(HTML_TEMPLATE, data=product_data)
```

---

## 🎨 Customization

### QR Code Styling

Change colors:
```typescript
const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
  width: 400,
  margin: 2,
  color: {
    dark: '#0d0b08',    // Change to your brand color
    light: '#ffffff'    // Background color
  }
})
```

Change size:
```typescript
width: 400,  // Increase for higher resolution
margin: 2,   // Border margin (in modules)
```

### Wallet Pass Customization

Edit `main_improved.py` to change:
- Product information structure
- Visual styling (Tailwind CSS classes)
- Layout and components
- Brand colors and logos

---

## 🚀 Production Setup

### For Real Google Wallet Integration

You'll need to:

1. **Get Google Wallet API Credentials**
   - Create project in Google Cloud Console
   - Enable Google Wallet API
   - Create service account and download JSON key

2. **Install Google Wallet Python Library**
   ```bash
   pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
   ```

3. **Update Flask Backend**
   ```python
   from google.oauth2 import service_account
   from googleapiclient.discovery import build
   import jwt
   import json
   
   # Load your service account credentials
   credentials = service_account.Credentials.from_service_account_file(
       'path/to/service-account-key.json',
       scopes=['https://www.googleapis.com/auth/wallet_object.issuer']
   )
   
   # Create wallet object
   def create_google_wallet_pass(product_data):
       # Define pass class
       pass_class = {
           "id": f"{ISSUER_ID}.lv-certificate-class",
           "classTemplateInfo": {
               "cardTemplateOverride": {
                   "cardRowTemplateInfos": [...]
               }
           }
       }
       
       # Define pass object
       pass_object = {
           "id": f"{ISSUER_ID}.{product_data['cert']}",
           "classId": pass_class["id"],
           "state": "ACTIVE",
           "barcode": {
               "type": "QR_CODE",
               "value": f"https://yourapp.com/verify/{product_data['cert']}"
           }
       }
       
       # Create JWT and return URL
       claims = {
           "iss": credentials.service_account_email,
           "aud": "google",
           "origins": ["https://yourapp.com"],
           "typ": "savetowallet",
           "payload": {
               "genericObjects": [pass_object]
           }
       }
       
       token = jwt.encode(claims, credentials.signer, algorithm='RS256')
       return f"https://pay.google.com/gp/v/save/{token}"
   ```

4. **Update Next.js API Call**
   ```typescript
   const response = await fetch('/api/wallet/generate', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       productId: product?.productId,
       certificateId: certificate?.certificate?.certificateId,
       ownerName: ownership.currentOwner,
       blockchainHash: ownership.blockchainHash
     })
   })
   ```

---

## 🐛 Troubleshooting

### QR Code Not Showing

**Problem**: Blank space where QR code should be

**Solutions**:
1. Check browser console for errors
2. Verify `qrCodeDataUrl` state is populated
3. Ensure certificate data is loaded
4. Check network tab for QR generation errors

### PDF QR Code Missing

**Problem**: PDF downloads but no QR code

**Solutions**:
1. Verify `qrCodeDataUrl` is set before downloading
2. Check PDF generation console logs
3. Ensure jsPDF version supports image embedding
4. Try increasing PDF generation delay

### Google Wallet Connection Failed

**Problem**: "Unable to connect to wallet service"

**Solutions**:
1. Verify Flask server is running on port 5000
   ```bash
   curl http://127.0.0.1:5000/health
   ```
2. Check CORS is enabled in Flask
3. Verify Next.js is running on port 3000
4. Check browser console for CORS errors
5. Make sure Flask and Next.js are on same network

### QR Code Quality Issues

**Problem**: QR code is blurry or pixelated

**Solutions**:
1. Increase width parameter:
   ```typescript
   width: 800  // Higher resolution
   ```
2. For PDF, generate separate high-res version
3. Use SVG format for scalability (requires different library)

---

## 📚 Resources

### QR Code Library
- **NPM Package**: https://www.npmjs.com/package/qrcode
- **Documentation**: https://github.com/soldair/node-qrcode
- **Examples**: https://github.com/soldair/node-qrcode#usage

### Google Wallet
- **API Documentation**: https://developers.google.com/wallet
- **Pass Design**: https://developers.google.com/wallet/generic/resources/design
- **Best Practices**: https://developers.google.com/wallet/generic/resources/guidelines

### Flask CORS
- **Package**: https://flask-cors.readthedocs.io/
- **Configuration**: https://flask-cors.readthedocs.io/en/latest/

---

## ✅ Testing Checklist

- [ ] QR code displays on certificate page
- [ ] QR code is scannable with phone camera
- [ ] QR code opens correct verification URL
- [ ] PDF downloads successfully
- [ ] QR code appears in PDF
- [ ] QR code in PDF is scannable
- [ ] Flask server starts without errors
- [ ] Google Wallet button triggers wallet preview
- [ ] Wallet preview displays product info correctly
- [ ] Error handling works (Flask offline scenario)
- [ ] Mobile responsive design works
- [ ] Cross-browser compatibility (Chrome, Safari, Firefox)

---

## 🎯 Next Steps

1. **Enhanced QR Codes**
   - Add logo in center of QR code
   - Custom colors per product line
   - Dynamic QR codes with analytics

2. **Real Google Wallet**
   - Set up Google Cloud project
   - Implement JWT signing
   - Create pass templates
   - Test on real Android devices

3. **Apple Wallet**
   - Similar approach for iOS
   - Use PassKit framework
   - Generate .pkpass files
   - Sign with Apple certificates

4. **Analytics**
   - Track QR code scans
   - Monitor wallet adds
   - User engagement metrics

---

## 💡 Tips

1. **QR Code Best Practices**
   - Keep URLs short for simpler QR codes
   - Test on multiple QR readers
   - Ensure high contrast (dark on light)
   - Leave adequate margin/quiet zone

2. **Wallet Integration**
   - Test on actual devices, not just emulators
   - Keep pass design simple and clear
   - Include essential info only
   - Follow platform guidelines

3. **Performance**
   - Generate QR codes once, cache result
   - Use Web Workers for heavy operations
   - Lazy load wallet integration
   - Optimize images and assets

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review implementation code in `page.tsx`
3. Test Flask endpoints directly with curl
4. Check browser console for detailed errors
5. Verify all dependencies are installed

---

**Last Updated**: January 22, 2026
**Version**: 1.0.0
