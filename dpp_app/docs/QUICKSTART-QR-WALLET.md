# 🚀 Quick Start: QR Code & Google Wallet

## What's New

✅ **Real QR codes** now display on certificate page and in PDF downloads
✅ **Google Wallet integration** via Flask backend (simulation mode)

---

## 🏃 Start in 3 Steps

### 1️⃣ Start Flask Backend (Terminal 1)

```bash
cd /Users/luli/Downloads
python3 main_improved.py
```

**Expected output:**
```
============================================================
🎨 Louis Vuitton Digital Product Passport - Wallet Service
============================================================
✅ Server running on: http://127.0.0.1:5000
```

### 2️⃣ Start Next.js App (Terminal 2)

```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
pnpm dev
```

### 3️⃣ Test Features

Open: http://localhost:3000/dpp/certificate

**Test QR Code:**
- ✅ You should see a real QR code in the certificate
- ✅ Scan it with your phone camera
- ✅ Download PDF and verify QR code is embedded

**Test Google Wallet:**
- ✅ Click "Add to Google Wallet" button
- ✅ New tab opens with beautiful wallet preview
- ✅ See product info formatted as digital pass

---

## 📱 What You'll See

### Certificate Page
- Real scannable QR code (160x160px)
- Contains verification URL
- High quality black on white

### PDF Download
- QR code embedded in bottom right
- Scannable from printed PDF
- "SCAN TO VERIFY" label below

### Google Wallet Preview
- Product image and details
- Certificate ID and blockchain badge
- Owner information
- Professional wallet-style layout
- Mobile responsive design

---

## ❓ Troubleshooting

**QR code not showing?**
- Wait 1-2 seconds for generation
- Check browser console for errors
- Refresh the page

**PDF has no QR code?**
- Wait for QR code to load before downloading
- Check that QR code is visible on page first

**Google Wallet button doesn't work?**
- Make sure Flask server is running on port 5000
- Check terminal for Flask errors
- Verify URL: http://127.0.0.1:5000/health

**CORS error?**
- Flask has CORS enabled by default
- Restart Flask server if needed

---

## 🎯 Next: Production Setup

For real Google Wallet integration, see detailed guide in:
`QR-WALLET-INTEGRATION.md`

Steps include:
1. Google Cloud Console setup
2. API credentials configuration
3. JWT token signing
4. Real wallet pass creation

---

## 📂 Files Changed

- `app/dpp/certificate/page.tsx` - QR code generation + wallet integration
- `/Users/luli/Downloads/main_improved.py` - Enhanced Flask backend
- `QR-WALLET-INTEGRATION.md` - Complete documentation

---

**Ready to test? Start both servers and visit the certificate page!** 🎉
