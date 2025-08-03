const { google } = require('googleapis')

// Backup approach using API key (read-only, but we can test connectivity)
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk'
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Early Access Signups'

exports.handler = async (event) => {
  console.log('🚀 Backup Netlify Function triggered')
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
    console.log('=== EARLY ACCESS SIGNUP (BACKUP) ===')
    console.log('Timestamp:', timestamp)
    console.log('Name:', `${sanitizedData.firstName} ${sanitizedData.lastName}`)
    console.log('Company:', sanitizedData.company)
    console.log('Email:', sanitizedData.email)
    console.log('=====================================')

    // Try to read from Google Sheets using API key (read-only test)
    if (GOOGLE_API_KEY) {
      try {
        console.log('🔑 Testing Google Sheets API with API key...')
        
        const sheets = google.sheets({ version: 'v4', auth: GOOGLE_API_KEY })
        
        // Try to read the sheet to test connectivity
        const readResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A:E`
        })
        
        console.log('✅ Successfully connected to Google Sheets')
        console.log('📊 Current rows in sheet:', readResponse.data.values ? readResponse.data.values.length : 0)
        console.log('⚠️ Note: API key is read-only, cannot write data')
        
      } catch (error) {
        console.error('❌ Google Sheets API key test failed:', error.message)
        console.log('ℹ️ API key approach failed - this is expected as API keys are read-only')
      }
    } else {
      console.log('ℹ️ No Google API key configured')
    }

    // For now, just log the data since we can't write with API key
    console.log('📝 Data logged to console (API key is read-only)')
    console.log('🔧 To enable writing, please fix the service account private key format')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Data received successfully. Check logs for details.'
      })
    }

  } catch (error) {
    console.error('Backup early access submission error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process submission. Please try again later.' })
    }
  }
} 