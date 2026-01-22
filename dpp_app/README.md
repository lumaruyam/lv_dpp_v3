# Louis Vuitton Digital Product Passport (DPP)

A blockchain-verified digital product passport system built with Next.js 16, featuring QR code generation, wallet integration (Apple & Google), and ownership transfer functionality.

## 🎯 Overview

This Digital Product Passport (DPP) system provides luxury product authentication and lifecycle tracking through blockchain technology. Each Louis Vuitton product receives a unique certificate of authenticity recorded on the Aura Blockchain network.

### Key Features

- **Blockchain Verification**: Certificate authenticity verified on Aura private consortium network
- **QR Code Generation**: Real, scannable QR codes for certificate verification
- **Digital Wallet Integration**: Add certificates to Apple Wallet and Google Wallet
- **PDF Export**: Download certificates as professional PDF documents with embedded QR codes
- **Ownership Transfer**: Secure transfer of ownership via QR code scanning
- **Product Care & Sustainability**: Access care instructions, materials info, and sustainability metrics
- **Repair History**: Track all service history and repairs
- **Achievement Badges**: Unlock badges based on product care and sustainability

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm)
- Python 3.8+ (for Google Wallet backend)
- AirWallet API key (for Apple Wallet integration)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd dpp_v2
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   # Create .env.local file in dpp_v2/ directory
   echo "NEXT_PUBLIC_AIRWALLET_API_KEY=your-airwallet-api-key" > .env.local
   ```
   *Note: Replace `your-airwallet-api-key` with your actual AirWallet API key*

3. **Install Python dependencies (for Google Wallet)**
   ```bash
   python3 -m pip install --user flask flask-cors qrcode pillow
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Start Google Wallet backend (optional, in separate terminal)**
   ```bash
   ./start_wallet.sh
   # Or manually:
   python3 wallet_backend.py
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📱 How It Works

### 1. Product Activation Flow

```
Landing Page (/) → Login (/login) → Welcome (/welcome) → Activate (/activate) → Home (/home)
```

**Step-by-step:**

1. **Start at Landing Page** (`http://localhost:3000`)
   - Click "Get Started" or "Login"

2. **Login Page** (`/login`)
   - Enter email (demo: any email works)
   - Click "Continue"

3. **Welcome Page** (`/welcome`)
   - See your product details
   - Review ownership information
   - Click "Activate My Product"

4. **Activation Page** (`/activate`)
   - Scan NFC tag (simulated in demo)
   - System creates blockchain certificate
   - Generates unique QR code for verification

5. **Home Dashboard** (`/home`)
   - View your activated product
   - Access all DPP features

### 2. Main Features

#### **Certificate & Ownership** (`/dpp/certificate`)

- View blockchain-verified certificate of authenticity
- See product details (ID, collection, manufacture date, location)
- Check blockchain verification status
- View ownership record and activation date

**Actions Available:**
- **Download PDF**: Export certificate as PDF with embedded QR code
- **Add to Apple Wallet**: Opens AirWallet preview (`https://app.addtowallet.co/card/69728c8f72708b4433af1b1e`)
- **Add to Google Wallet**: Opens Flask backend preview (`http://localhost:5000/preview-wallet`)
- **Transfer Ownership**: Initiate secure ownership transfer

#### **Materials & Craftsmanship** (`/dpp/materials`)

- Explore materials used in your product
- View craftsmanship details
- See material sourcing information
- Learn about production techniques

#### **Care Instructions** (`/dpp/care`)

- Access detailed care guides
- View cleaning recommendations
- Book repair services
- See storage best practices

#### **Sustainability** (`/dpp/sustainability`)

- Check carbon footprint metrics
- View recyclability information
- See water usage data
- Access circular economy initiatives

#### **Achievements** (`/achievements`)

- Unlock badges based on actions:
  - First Owner Badge
  - Early Adopter
  - Care Enthusiast
  - Sustainability Champion
  - Product Longevity
  - Community Member

#### **Product Collection** (`/collection`)

- View all your owned products
- See collection statistics
- Access each product's DPP

## 🔧 Technical Architecture

### Frontend (Next.js 16)

```
app/
├── page.tsx                    # Landing page
├── login/                      # Authentication
├── welcome/                    # Product introduction
├── activate/                   # NFC activation simulation
├── home/                       # Main dashboard
├── dpp/
│   ├── certificate/           # Certificate & ownership
│   ├── materials/             # Materials info
│   ├── care/                  # Care instructions
│   └── sustainability/        # Sustainability metrics
├── achievements/              # Badge system
├── collection/                # Product collection
└── wallet/apple/              # Apple Wallet preview (custom)
```

### Backend Services

#### **1. Google Wallet (Flask - Python)**
- **File**: `wallet_backend.py`
- **Port**: 5000
- **Features**: 
  - QR code generation matching frontend
  - HTML preview template
  - CORS enabled for Next.js integration

**Endpoints:**
- `GET /generate-wallet-link` - Get wallet preview URL
- `GET /preview-wallet` - HTML preview page

#### **2. Apple Wallet (AirWallet API)**
- **Service**: `lib/services/apple-wallet.service.ts`
- **API**: `https://app.addtowallet.co`
- **Features**:
  - Fetch existing passes
  - Pass preview integration
  - Direct link to pass download

### Key Libraries

- **QR Code**: `qrcode` (npm) - Frontend QR generation
- **QR Code**: `qrcode` (python) - Backend QR generation
- **PDF Export**: `jspdf` - PDF generation with embedded images
- **Blockchain**: Custom hash verification system
- **Styling**: Tailwind CSS with Louis Vuitton brand colors

## 📋 Demo Data

The system uses JSON files for demo data:

- `app/data/product.json` - Product information
- `app/data/certificate.json` - Certificate data
- `app/data/ownership.json` - Ownership records
- `app/data/materials.json` - Materials information
- `app/data/repairs.json` - Repair history
- `app/data/sustainability.json` - Sustainability metrics
- `app/data/badges.json` - Achievement badge definitions
- `app/data/nfc_mapping.json` - NFC tag mappings

## 🎨 Brand Colors

```css
--lv-black: #0d0b08
--lv-gold: #9f8453
--lv-brown: #423723
--lv-gray: #aaaaaa
--lv-light: #faf9f7
--lv-beige: #bda476
```

## 🔐 Security Features

- **Blockchain Hash Verification**: SHA-256 hash linking
- **Lost Item Alert**: Toggle to enable/disable scan notifications
- **Ownership Transfer**: Secure QR code-based transfer system
- **Certificate Immutability**: Blockchain-recorded provenance

## 🌐 Wallet Integration

### Apple Wallet
- Uses AirWallet service (https://app.addtowallet.co)
- Pass ID: `69728c8f72708b4433af1b1e`
- Direct link to pass preview page
- No backend required (API-based)

### Google Wallet
- Custom Flask backend simulation
- Generates matching QR codes
- HTML preview template
- Port 5000 (localhost)

**Start Google Wallet Backend:**
```bash
./start_wallet.sh
# Or:
python3 wallet_backend.py
```

## 📄 QR Code System

### Certificate QR Code
- **URL**: `https://yourapp.com/dpp/certificate?verify={certificateId}`
- **Settings**: 400px width, 2px margin
- **Colors**: Dark `#0d0b08`, Light `#ffffff`
- **Locations**: 
  - Certificate page display
  - PDF download (bottom right, 40mm)
  - Google Wallet pass
  - Apple Wallet pass (via barcode value)

### Transfer QR Code
- **URL**: `https://yourapp.com/transfer/{transferId}`
- **Purpose**: Secure ownership transfer
- **Expiry**: 24 hours
- **One-time use**: Cannot be reused

## 🛠️ Development Scripts

```bash
# Start Next.js dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Start Google Wallet backend
./start_wallet.sh

# Install Python dependencies
python3 -m pip install --user flask flask-cors qrcode pillow

# Clear port 5000 (if occupied)
lsof -ti:5000 | xargs kill -9
```

## 📖 Additional Documentation

- `QR-WALLET-INTEGRATION.md` - Complete QR & Wallet technical guide
- `QUICKSTART-QR-WALLET.md` - Quick start for QR and Google Wallet
- `SETUP-GUIDE.md` - Complete setup guide for both wallet backends
- `WALLET-QR-GUIDE.md` - Same QR code usage guide
- `README-TRANSFER.md` - Ownership transfer documentation
- `QUICKSTART-TRANSFER.md` - Transfer quick reference
- `TEST-GUIDE.md` - Testing instructions
- `DEMO-VS-PRODUCTION.md` - Comparison of demo vs production setup
- `IMPLEMENTATION-SUMMARY.md` - Technical implementation summary

## 🐛 Troubleshooting

### Port 5000 Already in Use
```bash
lsof -ti:5000 | xargs kill -9
```

### Python Module Not Found
```bash
python3 -m pip install --user flask flask-cors qrcode pillow
```

### Environment Variable Not Loading
1. Ensure `.env.local` exists in `dpp_v2/` directory
2. Restart Next.js dev server completely
3. Clear `.next` cache: `rm -rf .next && pnpm dev`

### QR Code Not Showing
- Check browser console for errors
- Verify `qrcode` npm package is installed: `pnpm install qrcode`
- Ensure certificate data exists

### Apple Wallet Not Opening
- Verify API key in `.env.local`
- Check network connection
- Open browser console to see API response

## 🚢 Production Deployment

### Environment Variables
```bash
# .env.local (or hosting platform environment)
NEXT_PUBLIC_AIRWALLET_API_KEY=your-production-api-key
```

### Build Steps
```bash
# Install dependencies
pnpm install

# Build Next.js app
pnpm build

# Deploy to hosting platform (Vercel, Netlify, etc.)
```

### Google Wallet Backend
- Deploy Flask app to cloud service (AWS, Google Cloud, Heroku)
- Update frontend URLs to production backend
- Enable CORS for production domain

## 📞 Support

For issues or questions:
1. Check documentation in `/dpp_v2/*.md` files
2. Review browser console for errors
3. Check Python backend logs for API issues

## 📝 License

This is a demonstration project for Louis Vuitton Digital Product Passport system.

---

