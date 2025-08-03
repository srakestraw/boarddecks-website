# Google Apps Script Setup Guide

## 🎯 **Step-by-Step Setup**

### 1. Create Google Apps Script
1. Go to: https://script.google.com/
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script.js`
4. Save the project (Ctrl+S or Cmd+S)

### 2. Deploy as Web App
1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the web app URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### 3. Set Environment Variable
Run this command with your actual web app URL:
```bash
netlify env:set GOOGLE_APPS_SCRIPT_URL "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### 4. Deploy the Updated Function
```bash
git add . && git commit -m "Switch to Google Apps Script webhook" && git push origin main
```

## ✅ **Why This Works Better**

- **No crypto issues** - Google Apps Script handles authentication internally
- **No service account setup** - Uses your Google account permissions
- **Reliable** - Google's own infrastructure
- **Simple** - Just a webhook call

## 🔧 **Testing**

Once deployed, test with:
```bash
curl -X POST https://boarddecks.com/.netlify/functions/early-access \
  -H "Content-Type: application/json" \
  -d '{"firstName":"TEST","lastName":"APPS_SCRIPT","company":"TEST COMPANY","email":"test@appsscript.com"}'
```

## 📊 **Check Results**

Check your Google Sheet at: https://docs.google.com/spreadsheets/d/1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk

The data should appear in the "Early Access Signups" sheet. 