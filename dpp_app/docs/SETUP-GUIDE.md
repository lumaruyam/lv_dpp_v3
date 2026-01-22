# 🚀 Complete Setup Guide - Google Wallet with QR Codes

## ✅ What You Have

You have **two** Flask backend files:
1. **`google_wallet.py`** - Original version (no QR code)
2. **`wallet_backend.py`** - NEW version with real QR code generation ✨

## 🎯 Recommended: Use `wallet_backend.py`

The new `wallet_backend.py` generates **real, scannable QR codes** that match your certificate page perfectly!

---

## 🚀 Quick Start (30 Seconds)

### Option 1: Use the Startup Script (Easiest!)

```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
./start_wallet.sh
```

**That's it!** The script will:
- ✅ Install all dependencies automatically
- ✅ Start the Flask server with QR code support
- ✅ Run on port 5000

### Option 2: Manual Start

```bash
# 1. Navigate to project
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2

# 2. Install dependencies (only needed once)
python3 -m pip install --user flask flask-cors qrcode pillow

# 3. Start server
python3 wallet_backend.py
```

---

## 📋 What Each File Does

### `google_wallet.py` (Original)
```python
❌ Placeholder QR code (just visual mockup)
❌ Not scannable
✅ Nice wallet design
✅ Works for demos
```

### `wallet_backend.py` (NEW - Recommended!)
```python
✅ REAL QR code generation
✅ Fully scannable
✅ Matches certificate page colors (#0d0b08)
✅ Same URL format
✅ Professional wallet design
✅ Production-ready
```

---

## 🎨 Which One Should You Use?

### Use `wallet_backend.py` If:
- ✅ You want real, scannable QR codes
- ✅ QR codes should match certificate page
- ✅ You want professional functionality
- ✅ Ready for client demos
- ✅ **RECOMMENDED FOR YOUR PROJECT**

### Use `google_wallet.py` If:
- ⚠️ Just testing basic layout
- ⚠️ Don't need working QR codes
- ⚠️ Quick mockup only

---

## 🔧 Troubleshooting

### Error: "ModuleNotFoundError: No module named 'qrcode'"

**Solution:**
```bash
python3 -m pip install --user qrcode pillow
```

### Error: "Address already in use - Port 5000"

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Then start again
python3 wallet_backend.py
```

### Error: "can't open file"

**Solution:**
```bash
# Make sure you're in the right directory
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2

# Check file exists
ls -la wallet_backend.py

# Then run
python3 wallet_backend.py
```

---

## 🧪 Testing

### Terminal 1 - Start Backend
```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
./start_wallet.sh
```

**You should see:**
```
============================================================
🎨 Louis Vuitton Digital Product Passport - Wallet Service
============================================================
✅ Server running on: http://127.0.0.1:5000
📱 Wallet Preview: http://127.0.0.1:5000/preview-wallet
🔗 API Endpoint: http://127.0.0.1:5000/generate-wallet-link
============================================================

💡 Features:
   ✅ Real QR code generation (matches certificate page)
   ✅ Same styling (#0d0b08 on #ffffff)
   ✅ Same verification URL format
   ✅ Scannable QR code in wallet preview
```

### Terminal 2 - Start Next.js
```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
pnpm dev
```

### Browser - Test
1. Open: http://localhost:3000/dpp/certificate
2. Click "Add to Google Wallet"
3. See real QR code in wallet! 📱
4. Scan with phone - it works! ✅

---

## 📦 Dependencies

Both files need these packages:

```bash
# Core Flask
flask>=3.0.0
flask-cors>=4.0.0

# QR Code generation (only wallet_backend.py uses these)
qrcode>=7.4.2
pillow>=10.1.0
```

**Install all at once:**
```bash
python3 -m pip install --user flask flask-cors qrcode pillow
```

---

## 🎯 Comparison Table

| Feature | google_wallet.py | wallet_backend.py |
|---------|-----------------|-------------------|
| **QR Code** | Placeholder | Real & Scannable ✅ |
| **Colors Match** | No | Yes (#0d0b08) ✅ |
| **Scannable** | No | Yes ✅ |
| **URL Format** | Different | Matches Certificate ✅ |
| **Dependencies** | Flask, CORS | Flask, CORS, QRCode |
| **Production Ready** | No | Yes ✅ |
| **Recommended** | ⚠️ | ✅ **USE THIS** |

---

## 💡 Recommendation

**Use `wallet_backend.py`** - It's better in every way!

### Why?
1. ✅ Real QR codes that actually work
2. ✅ Matches your certificate page perfectly
3. ✅ Professional and complete
4. ✅ Same colors, same URL format
5. ✅ Ready for production

### Migration from google_wallet.py

No migration needed! Just:
1. Stop `google_wallet.py` if running
2. Start `wallet_backend.py` instead
3. Everything else stays the same
4. Your Next.js app doesn't need any changes

---

## 📁 File Structure

```
dpp_v2/
├── wallet_backend.py      ← ✅ USE THIS (with QR codes)
├── google_wallet.py       ← ⚠️  Old version (no QR)
├── start_wallet.sh        ← 🚀 Easy startup script
├── requirements.txt       ← 📦 Dependencies list
└── ...
```

---

## 🚀 Production Deployment

When deploying, use `wallet_backend.py`:

```bash
# On your server
cd /path/to/dpp_v2
pip install -r requirements.txt
python3 wallet_backend.py
```

Or with Gunicorn (production server):
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 wallet_backend:app
```

---

## ✅ Final Checklist

- [ ] Install dependencies: `python3 -m pip install --user flask flask-cors qrcode pillow`
- [ ] Make startup script executable: `chmod +x start_wallet.sh`
- [ ] Test startup script: `./start_wallet.sh`
- [ ] Verify server runs on port 5000
- [ ] Test Next.js integration
- [ ] Click "Add to Google Wallet"
- [ ] Verify QR code appears
- [ ] Scan QR code with phone
- [ ] QR code should open certificate page

---

## 🎉 Summary

**Simple Answer: Use `wallet_backend.py`**

It has everything `google_wallet.py` has, PLUS:
- ✅ Real QR code generation
- ✅ Matches certificate page
- ✅ Fully functional
- ✅ Production-ready

**Start it with:**
```bash
cd /Users/luli/Documents/albert_school/alberthon_lvmh/dpp_v2
./start_wallet.sh
```

**Done!** 🎉

---

**Questions? Both files work, but `wallet_backend.py` is simply better!**
