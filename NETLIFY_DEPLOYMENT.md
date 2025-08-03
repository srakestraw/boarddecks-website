# Netlify Deployment Guide

## 🚀 **Deploy Your Next.js App to Netlify**

### **✅ Current Setup (Static Export)**

Your app is already configured for Netlify with:
- ✅ `output: 'export'` - Static file generation
- ✅ `trailingSlash: true` - Netlify compatibility
- ✅ `images.unoptimized: true` - Static image handling

---

## 📋 **Option 1: Static Export + External API (Recommended)**

### **Step 1: Deploy Frontend to Netlify**

1. **Build your app**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `out` folder
   - Or connect your GitHub repo

3. **Your site will be live** at: `https://your-site.netlify.app`

### **Step 2: Deploy API Separately**

Since Netlify doesn't support full Node.js apps, deploy your API to:

#### **A. Vercel (Recommended)**
```bash
# Deploy API to Vercel
npx vercel --prod
```

#### **B. Railway**
```bash
# Deploy API to Railway
railway login
railway init
railway up
```

#### **C. Render**
```bash
# Deploy API to Render
# Connect your GitHub repo to Render
```

### **Step 3: Update API Endpoint**

Update your form to point to the external API:

```tsx
// In EarlyAccessForm.tsx
const response = await fetch('https://your-api-domain.vercel.app/api/early-access', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
```

---

## 🔧 **Option 2: Netlify Functions (Limited)**

### **Convert API to Netlify Function**

1. **Create `netlify/functions/early-access.js`**:
   ```javascript
   exports.handler = async (event) => {
     if (event.httpMethod !== 'POST') {
       return { statusCode: 405, body: 'Method Not Allowed' }
     }

     try {
       const data = JSON.parse(event.body)
       
       // Your API logic here
       console.log('=== EARLY ACCESS SIGNUP ===')
       console.log('Name:', `${data.firstName} ${data.lastName}`)
       console.log('Company:', data.company)
       console.log('Email:', data.email)
       console.log('==========================')

       return {
         statusCode: 200,
         body: JSON.stringify({ success: true })
       }
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: 'Internal server error' })
       }
     }
   }
   ```

2. **Update form to use Netlify function**:
   ```tsx
   const response = await fetch('/.netlify/functions/early-access', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
   ```

---

## 📦 **Option 3: Full Netlify Deployment (Advanced)**

### **Use Netlify with Build Plugins**

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Create `netlify.toml`**:
   ```toml
   [build]
     command = "npm run build"
     publish = "out"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

---

## 🎯 **Recommended Setup**

### **Frontend (Netlify) + API (Vercel)**

1. **Deploy frontend to Netlify**:
   - Static files only
   - Fast CDN
   - Free tier

2. **Deploy API to Vercel**:
   - Full Node.js support
   - API routes work perfectly
   - Free tier

3. **Connect them**:
   - Update form to point to Vercel API
   - CORS configuration if needed

---

## ✅ **Quick Deployment Steps**

### **Step 1: Deploy Frontend**
```bash
# Build for static export
npm run build

# Deploy to Netlify
# Go to netlify.com and drag the 'out' folder
```

### **Step 2: Deploy API**
```bash
# Deploy API to Vercel
npx vercel --prod
```

### **Step 3: Update API URL**
```tsx
// Update the fetch URL in your form
const API_URL = 'https://your-api.vercel.app/api/early-access'
```

---

## 💰 **Costs**

- **Netlify**: Free tier (100GB bandwidth/month)
- **Vercel**: Free tier (100GB bandwidth/month)
- **Total**: ~$0/month for typical usage

---

## 🚀 **Your URLs will be**:

- **Frontend**: `https://your-site.netlify.app`
- **API**: `https://your-api.vercel.app/api/early-access`

**Ready to deploy!** 🎯 