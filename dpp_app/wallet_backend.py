from flask import Flask, jsonify, render_template_string, request
from flask_cors import CORS
import qrcode
import io
import base64

app = Flask(__name__)
CORS(app)  # Allow requests from Next.js frontend

# This would normally come from your Next.js frontend or database
def get_product_data_from_request():
    """
    In production, you'd receive product data from the Next.js frontend
    or fetch it from your database using the product ID
    """
    return {
        "name": "Tailored Wool Jacket",
        "id": "LV-JKT-4521-000987",
        "cert": "LV-DPP-9F3A2C",
        "image": "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tailored-bomber--HTB40WLGT151_PM2_Front%20view.png?wid=2400&hei=2400",
        "owner": "You",
        "blockchainHash": "0x1234...abcd",
        # Add this for QR code generation
        "verificationUrl": "http://localhost:3000/dpp/certificate?verify=LV-CERT-998234"
    }

def generate_qr_code_base64(url):
    """
    Generate a QR code and return it as base64 string
    This matches the QR code generated in the Next.js certificate page
    """
    # Create QR code with same settings as frontend
    qr = qrcode.QRCode(
        version=1,  # Auto-adjust
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=2,  # Same margin as frontend
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    # Create image with same colors as frontend
    img = qr.make_image(fill_color="#0d0b08", back_color="#ffffff")
    
    # Convert to base64
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    return f"data:image/png;base64,{img_base64}"

# Google Wallet simulation HTML template
HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Google Wallet - Louis Vuitton</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm w-full border border-gray-200">
        <!-- Header -->
        <div class="bg-gradient-to-r from-black to-gray-900 p-6 text-white flex justify-between items-center">
            <div>
                <span class="font-bold tracking-widest text-sm">LOUIS VUITTON</span>
                <p class="text-[10px] text-gray-300 mt-1 tracking-wide">DIGITAL PRODUCT PASSPORT</p>
            </div>
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span class="font-serif text-sm">LV</span>
            </div>
        </div>
        
        <!-- Success Banner -->
        <div class="bg-green-50 border-b border-green-100 p-4">
            <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p class="text-green-700 font-medium text-sm">Successfully Added to Wallet</p>
            </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 space-y-4">
            <!-- Product Image -->
            <div class="flex justify-center">
                <img src="{{data.image}}" class="w-56 h-56 object-cover rounded-xl shadow-lg border border-gray-100">
            </div>
            
            <!-- Product Info -->
            <div class="text-center space-y-2">
                <h1 class="text-xl font-semibold text-gray-900">{{data.name}}</h1>
                <div class="flex items-center justify-center gap-2">
                    <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <p class="text-sm text-amber-700 font-medium">Blockchain Authenticated</p>
                </div>
            </div>
            
            <!-- Certificate Details -->
            <div class="bg-gray-50 rounded-xl p-4 space-y-3">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Product ID</p>
                        <p class="font-mono font-semibold text-sm text-gray-900">{{data.productId}}</p>
                    </div>
                    <div>
                        <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Certificate</p>
                        <p class="font-mono font-semibold text-sm text-amber-700">{{data.certificateId}}</p>
                    </div>
                </div>
                
                {% if data.owner %}
                <div class="border-t border-gray-200 pt-3">
                    <p class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Owner</p>
                    <p class="text-sm text-gray-900 font-medium">{{data.owner}}</p>
                </div>
                {% endif %}
            </div>
            
            <!-- QR Code - Now with REAL scannable QR code matching the certificate page -->
            <div class="flex justify-center py-2">
                <div class="bg-white p-3 border-2 border-gray-200 rounded-xl shadow-sm">
                    {% if data.qrCode %}
                    <!-- Real QR Code from same generation as certificate page -->
                    <div class="w-32 h-32 flex items-center justify-center">
                        <img src="{{data.qrCode}}" alt="Verification QR Code" class="w-full h-full object-contain">
                    </div>
                    {% else %}
                    <!-- Fallback placeholder -->
                    <div class="w-32 h-32 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white text-[9px] text-center p-4 rounded-lg">
                        <div class="space-y-1">
                            <svg class="w-8 h-8 mx-auto opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                            <p class="italic opacity-75">SECURE QR CODE</p>
                            <p class="font-mono text-[8px]">{{data.certificateId}}</p>
                        </div>
                    </div>
                    {% endif %}
                </div>
            </div>
            <p class="text-center text-[10px] text-gray-500">Scan to verify authenticity</p>
            
            <!-- Blockchain Badge -->
            <div class="text-center">
                <div class="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
                    <svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <span class="text-xs text-amber-800 font-medium">Aura Blockchain Verified</span>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 border-t border-gray-200 p-4 text-center">
            <p class="text-[10px] text-gray-500 leading-relaxed">
                This digital passport is permanently recorded on the<br>
                Aura Blockchain network for authenticity verification
            </p>
        </div>
    </div>
    
    <!-- Info Box -->
    <div class="fixed bottom-4 left-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg md:left-auto md:right-4 md:max-w-sm">
        <div class="flex gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            <div>
                <p class="text-xs font-medium text-blue-900 mb-1">Demo Mode</p>
                <p class="text-[11px] text-blue-700 leading-relaxed">
                    This is a simulation. In production, this would be a real Google Wallet pass. The QR code is fully functional and matches your certificate!
                </p>
            </div>
        </div>
    </div>
</body>
</html>
"""

@app.route('/generate-wallet-link', methods=['GET', 'POST'])
def generate_link():
    """
    Generate a Google Wallet link.
    In production, this would create a JWT token and return a real Google Wallet URL.
    For now, we return a link to our preview page with real QR code.
    """
    # Get product data (from request body if POST, or use default)
    if request.method == 'POST':
        product_data = request.json
    else:
        product_data = get_product_data_from_request()
    
    # In production, you would:
    # 1. Create a Google Wallet pass object with product data
    # 2. Sign it with your Google Wallet API credentials
    # 3. Return the official Google Wallet URL
    
    # For demo, return our preview URL
    return jsonify({
        "url": "http://127.0.0.1:5000/preview-wallet",
        "success": True,
        "message": "Wallet preview generated with real QR code"
    })

@app.route('/preview-wallet')
def preview_wallet():
    """Display the Google Wallet simulation page with real QR code"""
    product_data = get_product_data_from_request()
    
    # Generate QR code matching the certificate page
    if product_data.get('verificationUrl'):
        qr_code_data = generate_qr_code_base64(product_data['verificationUrl'])
        product_data['qrCode'] = qr_code_data
    
    return render_template_string(HTML_TEMPLATE, data=product_data)

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "service": "LV DPP Wallet Service"})

if __name__ == '__main__':
    print("=" * 60)
    print("🎨 Louis Vuitton Digital Product Passport - Wallet Service")
    print("=" * 60)
    print("✅ Server running on: http://127.0.0.1:5000")
    print("📱 Wallet Preview: http://127.0.0.1:5000/preview-wallet")
    print("🔗 API Endpoint: http://127.0.0.1:5000/generate-wallet-link")
    print("=" * 60)
    print("\n💡 Features:")
    print("   ✅ Real QR code generation (matches certificate page)")
    print("   ✅ Same styling (#0d0b08 on #ffffff)")
    print("   ✅ Same verification URL format")
    print("   ✅ Scannable QR code in wallet preview")
    print("\n💡 Make sure your Next.js app is calling this endpoint!")
    print("   Frontend URL: http://localhost:3000/dpp/certificate\n")
    
    app.run(port=5000, debug=True)
