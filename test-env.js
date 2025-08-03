// Simple test to check environment variables
console.log('🔧 Testing environment variables...')
console.log('📧 GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'SET' : 'NOT SET')
console.log('🔑 GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'SET' : 'NOT SET')
console.log('📊 SPREADSHEET_ID:', process.env.GOOGLE_SPREADSHEET_ID || 'NOT SET')
console.log('📋 SHEET_NAME:', process.env.GOOGLE_SHEET_NAME || 'NOT SET')

if (process.env.GOOGLE_PRIVATE_KEY) {
  console.log('🔍 Private key length:', process.env.GOOGLE_PRIVATE_KEY.length)
  console.log('🔍 Private key starts with:', process.env.GOOGLE_PRIVATE_KEY.substring(0, 50))
  
  // Test base64 decoding
  try {
    const decoded = Buffer.from(process.env.GOOGLE_PRIVATE_KEY, 'base64').toString('utf-8')
    console.log('✅ Base64 decode successful')
    console.log('🔍 Decoded starts with:', decoded.substring(0, 50))
  } catch (error) {
    console.log('❌ Base64 decode failed:', error.message)
  }
} 