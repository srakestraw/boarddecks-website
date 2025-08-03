# Service Account Setup Guide

## 🔍 **Issue Identified**

The private key you provided (`e880e0c8f108c5ac43004c3418e4c7b7e9b78fab`) appears to be a hash or shortened version, not the full private key format required by Google Sheets API.

## 🔧 **How to Get the Correct Private Key**

### **Step 1: Access Your Service Account**

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Navigate to**: IAM & Admin → Service Accounts
3. **Find your service account**: `boarddecks@boarddecks-early-access.iam.gserviceaccount.com`
4. **Click on the service account** to open details

### **Step 2: Generate New Key**

1. **Go to**: "Keys" tab
2. **Click**: "Add Key" → "Create new key"
3. **Choose**: "JSON" format
4. **Click**: "Create"
5. **Download** the JSON file

### **Step 3: Extract the Private Key**

Open the downloaded JSON file. You'll see something like this:

```json
{
  "type": "service_account",
  "project_id": "boarddecks-early-access",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "boarddecks@boarddecks-early-access.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/boarddecks%40boarddecks-early-access.iam.gserviceaccount.com"
}
```

### **Step 4: Copy the Private Key**

Copy the entire `private_key` value, including:
- `-----BEGIN PRIVATE KEY-----`
- All the encoded content
- `-----END PRIVATE KEY-----`

**Example format:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----
```

## 🔧 **Alternative: Use Environment Variables**

Instead of hardcoding the private key, you can:

1. **Set environment variables** in Netlify:
   ```bash
   GOOGLE_SERVICE_ACCOUNT_EMAIL=boarddecks@boarddecks-early-access.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SPREADSHEET_ID=1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk
   GOOGLE_SHEET_NAME=Early Access Signups
   ```

2. **Update the Netlify function** to use environment variables only:
   ```javascript
   const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
   const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
   ```

## 🚀 **Next Steps**

1. **Download the JSON file** from Google Cloud Console
2. **Extract the full private key** from the JSON
3. **Share your Google Sheet** with the service account email
4. **Set environment variables** in Netlify
5. **Test the integration**

## 📊 **Current Status**

- ✅ **Service account email**: `boarddecks@boarddecks-early-access.iam.gserviceaccount.com`
- ✅ **Spreadsheet ID**: `1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk`
- ❌ **Private key**: Need full format from JSON file
- ❌ **Spreadsheet sharing**: Need to share with service account

**Once you get the correct private key format, your Google Sheets integration will work perfectly!** 🚀 