# Google Sheets Deployment Guide

## 🚀 **Your Google Sheets Setup**

### **✅ Your Credentials:**
- **API Key**: `AIzaSyA3blmcVuUrPkC2aV95tHeFXVi_GiGmfi8`
- **Spreadsheet ID**: `1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk`
- **Sheet Name**: `Early Access Signups`

---

## 📋 **Step 1: Prepare Your Google Sheet**

1. **Open your Google Sheet**: `https://docs.google.com/spreadsheets/d/1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk/edit`

2. **Set up headers** in row 1:
   ```
   A1: Timestamp | B1: First Name | C1: Last Name | D1: Company | E1: Email
   ```

3. **Make sure the sheet is accessible** (not private)

---

## 🚀 **Step 2: Deploy to Netlify**

### **Option A: Deploy via GitHub (Recommended)**

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add Google Sheets integration"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Select your repository: `srakestraw/boarddecks-website`

3. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`

4. **Deploy** - Netlify will automatically build and deploy

### **Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## ⚙️ **Step 3: Set Environment Variables**

In your Netlify dashboard:

1. **Go to Site settings** → **Environment variables**
2. **Add these variables**:

```bash
GOOGLE_API_KEY=AIzaSyA3blmcVuUrPkC2aV95tHeFXVi_GiGmfi8
GOOGLE_SPREADSHEET_ID=1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk
GOOGLE_SHEET_NAME=Early Access Signups
```

3. **Redeploy** after adding environment variables

---

## ✅ **Step 4: Test Your Deployment**

### **Test the API endpoint**:
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/early-access \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","company":"Test Co","email":"test@example.com"}'
```

### **Expected response**:
```json
{"success":true}
```

### **Check your Google Sheet** for new entries

---

## 📊 **Step 5: Monitor Your Data**

### **Console Logs** (in Netlify dashboard):
```
🎉 NEW EARLY ACCESS SIGNUP 🎉
================================
📅 Timestamp: 2024-01-15T10:30:00.000Z
👤 Name: John Doe
🏢 Company: Test Company
📧 Email: john@example.com
================================
✅ Data saved to Google Sheets
📊 Sheet: Early Access Signups
🆔 Spreadsheet ID: 1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk
```

### **Google Sheet** will show:
```
A: 2024-01-15T10:30:00.000Z | B: John | C: Doe | D: Test Company | E: john@example.com
```

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"API key not valid"**
   - Verify the API key is correct
   - Make sure Google Sheets API is enabled

2. **"Spreadsheet not found"**
   - Check the spreadsheet ID is correct
   - Ensure the sheet is not private

3. **"Permission denied"**
   - Make sure the sheet is accessible
   - Check if the API key has proper permissions

4. **"Sheet name not found"**
   - Verify the sheet name is exactly "Early Access Signups"
   - Check for typos in the sheet name

### **Testing Commands:**

```bash
# Test with curl
curl -X POST https://your-site.netlify.app/.netlify/functions/early-access \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","company":"Test Co","email":"test@example.com"}'

# Check Netlify logs
netlify logs --tail
```

---

## 🎯 **Success Indicators**

- ✅ **Form submission** works without errors
- ✅ **Console logs** show "Data saved to Google Sheets"
- ✅ **Google Sheet** shows new rows with data
- ✅ **No permission errors** in logs
- ✅ **Real-time updates** in your spreadsheet

---

## 🚀 **Your URLs**

- **Website**: `https://your-site.netlify.app`
- **API**: `https://your-site.netlify.app/.netlify/functions/early-access`
- **Google Sheet**: `https://docs.google.com/spreadsheets/d/1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk/edit`

**Ready to deploy! Your Google Sheets integration is configured and ready to go!** 🎯 