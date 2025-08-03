const { google } = require('googleapis')

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk'
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Early Access Signups'
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyA3blmcVuUrPkC2aV95tHeFXVi_GiGmfi8'

// Initialize Google Sheets with API key
let sheets = null
try {
  const auth = new google.auth.GoogleAuth({
    key: GOOGLE_API_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  sheets = google.sheets({ version: 'v4', auth })
} catch (error) {
  console.error('Google Sheets initialization error:', error)
}

exports.handler = async (event) => {
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
        await sheets.spreadsheets.values.append({
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
        console.log('✅ Data saved to Google Sheets')
        console.log(`📊 Sheet: ${SHEET_NAME}`)
        console.log(`🆔 Spreadsheet ID: ${SPREADSHEET_ID}`)
      } catch (error) {
        console.error('❌ Google Sheets error:', error)
        console.error('Error details:', error.message)
        // Continue without failing the request
      }
    } else {
      console.log('ℹ️ Google Sheets not configured - data logged to console only')
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