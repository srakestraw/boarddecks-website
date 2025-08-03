# Google Sheets Setup Guide

## 🚀 **Step-by-Step Google Sheets Integration**

### **Step 1: Create Google Sheet**

1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Create a new spreadsheet** named "Board Decks Early Access"
3. **Set up headers** in row 1:
   ```
   A1: Timestamp | B1: First Name | C1: Last Name | D1: Company | E1: Email
   ```

### **Step 2: Get Your Spreadsheet ID**

1. **Copy the URL** from your browser
2. **Extract the ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```
3. **Save this ID** - you'll need it later

### **Step 3: Create Google Cloud Project**

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Create a new project** or select existing
3. **Enable Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### **Step 4: Create Service Account**

1. **Go to "APIs & Services" → "Credentials"**
2. **Click "Create Credentials" → "Service Account"**
3. **Fill in details**:
   - Name: "Board Decks API"
   - Description: "Service account for early access signups"
4. **Click "Create and Continue"**
5. **Skip role assignment** (click "Continue")
6. **Click "Done"**

### **Step 5: Generate Service Account Key**

1. **Click on your service account** in the list
2. **Go to "Keys" tab**
3. **Click "Add Key" → "Create new key"**
4. **Choose "JSON" format**
5. **Download the JSON file**

### **Step 6: Extract Credentials**

Open the downloaded JSON file and copy these values:

```json
{
  "client_email": "your-service-account@project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
}
```

### **Step 7: Share Your Google Sheet**

1. **Open your Google Sheet**
2. **Click "Share"** in the top right
3. **Add your service account email** with "Editor" permissions
4. **Click "Send"**

### **Step 8: Set Environment Variables**

In your Netlify dashboard:

1. **Go to Site settings** → **Environment variables**
2. **Add these variables**:

```bash
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### **Step 9: Deploy and Test**

1. **Push your changes** to GitHub
2. **Netlify will auto-deploy**
3. **Test the form** on your live site
4. **Check your Google Sheet** for new entries

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"Service account not found"**
   - Check the service account email is correct
   - Make sure the service account exists in your project

2. **"Spreadsheet not found"**
   - Verify the spreadsheet ID is correct
   - Make sure the service account has access to the sheet

3. **"Permission denied"**
   - Share the Google Sheet with the service account email
   - Give "Editor" permissions

4. **"Invalid private key"**
   - Make sure the private key includes the full format
   - Include the `\n` characters for line breaks

### **Testing:**

```bash
# Test your API endpoint
curl -X POST https://your-site.netlify.app/.netlify/functions/early-access \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","company":"Test Co","email":"test@example.com"}'
```

---

## ✅ **Success Indicators**

- ✅ **Form submission works** without errors
- ✅ **Console logs** show "Data saved to Google Sheets"
- ✅ **Google Sheet** shows new rows with data
- ✅ **No permission errors** in logs

---

## 🎯 **Next Steps**

1. **Monitor your sheet** for new signups
2. **Set up email notifications** (optional)
3. **Create a dashboard** to view signups
4. **Export data** to CSV when needed

**Your early access data will now be automatically saved to Google Sheets!** 🚀 