const { google } = require('googleapis')

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk'
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Early Access Signups'
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

// Initialize Google Sheets with service account (if credentials available)
let sheets = null
console.log('🔧 Environment check:')
console.log('📧 GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'SET' : 'NOT SET')
console.log('🔑 GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'SET' : 'NOT SET')
console.log('📊 SPREADSHEET_ID:', process.env.GOOGLE_SPREADSHEET_ID || SPREADSHEET_ID)
console.log('📋 SHEET_NAME:', process.env.GOOGLE_SHEET_NAME || SHEET_NAME)

if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    sheets = google.sheets({ version: 'v4', auth })
    console.log('✅ Google Sheets service account initialized')
  } catch (error) {
    console.error('Google Sheets service account initialization error:', error)
  }
} else {
  console.log('ℹ️ Google Sheets service account credentials not configured')
}

exports.handler = async (event) => {
  console.log('🚀 Netlify Function triggered')
  console.log('📋 Event method:', event.httpMethod)
  console.log('📋 Event path:', event.path)
  console.log('📋 Event body length:', event.body ? event.body.length : 0)
  
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const data = JSON.parse(event.body)
    const { firstName, lastName, company, email } = data

    // Validate required fields
    if (!firstName || !lastName || !company || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      }
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please enter a valid email address' })
      }
    }

    // Sanitize inputs
    const sanitizeInput = (input) => input.trim().replace(/[<>]/g, '')
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      company: sanitizeInput(company),
      email: sanitizeInput(email)
    }

    // Validate minimum length requirements
    if (sanitizedData.firstName.length < 2 || sanitizedData.lastName.length < 2 || sanitizedData.company.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields must be at least 2 characters long' })
      }
    }

    // Log the submission
    const timestamp = new Date().toISOString()
    console.log('=== EARLY ACCESS SIGNUP ===')
    console.log('Timestamp:', timestamp)
    console.log('Name:', `${sanitizedData.firstName} ${sanitizedData.lastName}`)
    console.log('Company:', sanitizedData.company)
    console.log('Email:', sanitizedData.email)
    console.log('==========================')

    // Save to Google Sheets
    if (sheets && SPREADSHEET_ID) {
      try {
        console.log('📝 Attempting to save to Google Sheets...')
        console.log(`📊 Sheet: ${SHEET_NAME}`)
        console.log(`🆔 Spreadsheet ID: ${SPREADSHEET_ID}`)
        
        const appendResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A:E`,
          valueInputOption: 'RAW',
          resource: {
            values: [[
              timestamp,
              sanitizedData.firstName,
              sanitizedData.lastName,
              sanitizedData.company,
              sanitizedData.email
            ]]
          }
        })
        
        console.log('✅ Data saved to Google Sheets successfully')
        console.log(`📝 Updated range: ${appendResponse.data.updates.updatedRange}`)
        console.log(`📊 Rows updated: ${appendResponse.data.updates.updatedRows}`)
        
        // Verify the write by reading the current data
        const verifyResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A:E`
        })
        console.log(`🔍 Verification: Total rows in sheet: ${verifyResponse.data.values ? verifyResponse.data.values.length : 0}`)
        
      } catch (error) {
        console.error('❌ Google Sheets error:', error)
        console.error('Error details:', error.message)
        console.error('Error stack:', error.stack)
        // Continue without failing the request
      }
    } else {
      console.log('ℹ️ Google Sheets not configured - data logged to console only')
      console.log('🔧 Check environment variables: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY')
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    }

  } catch (error) {
    console.error('Early access submission error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process submission. Please try again later.' })
    }
  }
} 