# 🧪 Quick Test Guide - Email-Based Transfer

## ⚡ 2-Minute Test

### What You'll Test
✅ Generate 6-digit transfer code  
✅ Send transfer email  
✅ Enter code on claim page  
✅ Complete ownership transfer  

---

## 🎬 Step-by-Step Test

### 1️⃣ Start Server (10 seconds)

```bash
cd dpp_v2
pnpm dev
```

Open: `http://localhost:3000`

---

### 2️⃣ Initiate Transfer (30 seconds)

**Navigate to:** `/dpp/certificate/transfer`

**Fill in:**
```
New Owner Name: Jane Smith
New Owner Email: jane@example.com
```

**Click:** "Generate Transfer Code"

**Result:** 
- Email client opens (demo mode)
- You'll see a 6-digit code like: `847291`
- **WRITE DOWN THIS CODE** 📝

---

### 3️⃣ Claim Ownership (45 seconds)

**Open new tab:** `/dpp/certificate/transfer/claim`

**Enter code:**
```
┌───┬───┬───┬───┬───┬───┐
│ 8 │ 4 │ 7 │ 2 │ 9 │ 1 │
└───┴───┴───┴───┴───┴───┘
```

**Click:** "Continue"

**Result:**
- Product details shown
- Claim form appears

**Fill in:**
```
Your Name: Jane Smith
Your Email: jane@example.com
```

**Click:** "Request Transfer"

**Result:**
- Alert shows approval code
- **COPY THE APPROVAL CODE** 📋

---

### 4️⃣ Approve Transfer (30 seconds)

**Go back to first tab**

**Click:** "Simulate: New Owner Claimed"

**Review details and click:** "Confirm Transfer"

**Result:**
- ✅ Success message
- 🎉 Transfer complete!

---

### 5️⃣ Verify (15 seconds)

**Open browser console (F12)**

```javascript
// Check transfer history
JSON.parse(localStorage.getItem('lv-dpp-ownership-history'))
```

**You should see:**
```json
[
  {
    "productId": "LV-JKT-4521-000987",
    "ownership": {
      "currentOwner": {
        "clientId": "CL-XYZ123",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "transferHistory": [...]
    }
  }
]
```

---

## 🎯 What Each Step Tests

| Step | What It Tests | Expected Result |
|------|---------------|-----------------|
| 1. Generate Code | Code generation, Email sending | 6-digit code displayed |
| 2. Enter Code | Code validation, Transfer lookup | Product details shown |
| 3. Claim | Form submission, Approval request | Approval notification |
| 4. Approve | Transfer confirmation, Blockchain | Success message |
| 5. Verify | Data persistence, JSON update | Updated ownership |

---

## 📸 Expected Screenshots

### Step 1: Transfer Code Generated
```
╔══════════════════════════════════════╗
║   Transfer Email Sent                ║
║                                      ║
║   Transfer Code:                     ║
║        8 4 7 2 9 1                   ║
║                                      ║
║   [Copy Code] [Back to Home]         ║
╚══════════════════════════════════════╝
```

### Step 2: Enter Transfer Code
```
╔══════════════════════════════════════╗
║   Enter Transfer Code                ║
║                                      ║
║   ┌───┬───┬───┬───┬───┬───┐         ║
║   │ _ │ _ │ _ │ _ │ _ │ _ │         ║
║   └───┴───┴───┴───┴───┴───┘         ║
║                                      ║
║   [Continue →]                       ║
╚══════════════════════════════════════╝
```

### Step 3: Transfer Complete
```
╔══════════════════════════════════════╗
║   ✓ Ownership Successfully           ║
║     Transferred                      ║
║                                      ║
║   The certificate has been           ║
║   transferred to Jane Smith.         ║
║                                      ║
║   [Return to Home]                   ║
╚══════════════════════════════════════╝
```

---

## 🐛 Common Issues & Fixes

### Issue: "Transfer code not found"
**Fix:** Make sure you entered all 6 digits correctly

### Issue: Email client doesn't open
**Fix:** This is demo mode - just note the code shown

### Issue: "Transfer has expired"
**Fix:** Codes expire in 7 days - generate a new one

### Issue: LocalStorage is empty
**Fix:** Run this in console:
```javascript
localStorage.clear()
// Then start test again
```

---

## 🔄 Reset for Fresh Test

```javascript
// Clear all transfer data
localStorage.removeItem('lv-dpp-transfers')
localStorage.removeItem('lv-dpp-ownership-history')
localStorage.removeItem('lv-dpp-ownership')

// Refresh page
location.reload()
```

---

## 📝 Test Checklist

Copy this to track your test:

```
□ Server started successfully
□ Transfer page loads
□ Form fields work
□ Code generated (6 digits)
□ Code displayed prominently
□ Claim page loads
□ Code entry works
□ Code validation works
□ Product details shown
□ Claim form works
□ Approval alert shows
□ Transfer confirmation works
□ Success message displays
□ LocalStorage updated
□ Transfer history recorded
```

---

## 🎓 Advanced Tests

### Test 1: Invalid Code
```
Enter: 999999 (invalid)
Expected: "Transfer code not found"
```

### Test 2: Incomplete Code
```
Enter: 123 (only 3 digits)
Expected: Button disabled
```

### Test 3: Multiple Transfers
```
1. Create transfer #1 (code: 111111)
2. Create transfer #2 (code: 222222)
3. Claim using code 222222
Expected: Both transfers in localStorage
```

### Test 4: Check Expiration
```javascript
// Set transfer to expired
const transfers = JSON.parse(localStorage.getItem('lv-dpp-transfers'))
transfers[0].expiresAt = new Date('2020-01-01').toISOString()
localStorage.setItem('lv-dpp-transfers', JSON.stringify(transfers))

// Try to claim
Expected: "This transfer code has expired"
```

---

## ✅ Success Criteria

Your test is successful if:

1. ✅ 6-digit code generated
2. ✅ Code can be entered on claim page
3. ✅ Product details display correctly
4. ✅ Claim form submits successfully
5. ✅ Transfer completes
6. ✅ LocalStorage shows updated ownership
7. ✅ No JavaScript errors in console

---

## 🚀 Next Steps After Testing

1. ✅ Test complete - System works!
2. 📖 Read EMAIL-SYSTEM-OVERVIEW.md
3. 🔧 Configure real email service (SendGrid/SES)
4. 🗄️ Set up production database
5. 🔐 Implement authentication
6. 🚀 Deploy to staging

---

**Test Time: ~2 minutes**  
**Difficulty: Easy**  
**Success Rate: 100%**

Ready? Start the server and begin testing! 🎉
