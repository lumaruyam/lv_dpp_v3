#!/bin/bash

# Start Google Wallet Backend with QR Code Support
# Navigate to correct directory
cd "$(dirname "$0")"

echo "============================================================"
echo "🎨 Louis Vuitton Digital Product Passport - Wallet Service"
echo "============================================================"
echo ""
echo "📦 Installing dependencies..."
python3 -m pip install --user --quiet flask flask-cors qrcode pillow

echo "✅ Dependencies installed"
echo ""
echo "🚀 Starting Flask server on port 5000..."
echo ""

# Run the wallet backend
python3 wallet_backend.py
