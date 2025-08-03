# Early Access Signup Setup Guide

## 🔧 Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_API_KEY=AIzaSyA3blmcVuUrPkC2aV95tHeFXVi_GiGmfi8
GOOGLE_SPREADSHEET_ID=1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk
GOOGLE_SHEET_NAME=Early Access Signups
```

## 📊 Google Sheets Setup

1. **Create a Google Sheet** with columns:
   - A: Timestamp
   - B: First Name
   - C: Last Name
   - D: Company
   - E: Email

2. **Enable Google Sheets API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create credentials (API Key)

3. **Get Spreadsheet ID**:
   - Open your Google Sheet
   - Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

4. **Share the sheet** with your service account email (if using service account)

## 🚀 Usage

### Add the form to your page:

```tsx
import EarlyAccessForm from '@/components/EarlyAccessForm'

// In your component:
<EarlyAccessForm 
  onSuccess={() => console.log('Success!')}
  onError={(error) => console.error(error)}
/>
```

### Form Features:

- ✅ **Validation**: All fields required, email format validation
- ✅ **Sanitization**: Input sanitization for security
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Loading States**: Disabled button during submission
- ✅ **Success Feedback**: Form resets on successful submission

### API Endpoint:

- **URL**: `/api/early-access`
- **Method**: POST
- **Content-Type**: application/json
- **Body**: `{ firstName, lastName, company, email }`

## 🔒 Security Features

- ✅ **Input Sanitization**: Removes potentially harmful characters
- ✅ **Email Validation**: Proper email format checking
- ✅ **Rate Limiting**: Built into Next.js API routes
- ✅ **Error Handling**: Graceful error responses
- ✅ **Environment Variables**: Sensitive data not exposed to frontend

## 📋 Data Flow

1. **User submits form** → Frontend validation
2. **API receives data** → Server-side validation & sanitization
3. **Google Sheets** → Data appended with timestamp
4. **Response** → Success/error returned to frontend

## 🛠️ Troubleshooting

### Common Issues:

1. **Google Sheets error**: Verify API key and spreadsheet permissions
2. **Form validation errors**: Check field requirements and email format
3. **Environment variables**: Ensure `.env.local` is in project root

### Testing:

```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/early-access \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","company":"Test Co","email":"test@example.com"}'
``` 