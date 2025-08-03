const { google } = require('googleapis')

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk'
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Early Access Signups'
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'boarddecks@boarddecks-early-access.iam.gserviceaccount.com'
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDgGmQ5Peck4XUg\nJ/W4C+TXtQvhzWf+lpqf0NGqdW0eZgCL1C00cHyirdBSe4jskDhCanLi1ZxouGf0\nZV9gaTVcJTNyjie2fCW+IggkICYBbD6oSP5/dga/TfgELb8WqGb/j4qnw6qZhWlH\nvS3F3eJHytl+5OfM6R0De3B/b4Cic/TdnIJNXvVLg0SNR4ic5AlgzjNpu+Vez+zD\narHHQw23LcKqQJL2YllhBvZY7gZfMbJob+E5L8dxVRfpwLRNlVAWvIuAIAxeSInL\nbmQ3G2RpHLt9uiCf1wfPEI7Qnz5hor9w6KcJaR3aUU4CYAaO/FSf+Fzx2PgnMH+h\nWnf2Pho/AgMBAAECggEALx5tbzmsRW1gFoxAVlut2IrY/jeVg4p/5VVfGCOLd2ZD\n/CJ3BL0X/45jLEyMHA0wvwopsLbwJXaMaO79kERes0qhGBd6kxxkRSdbpdjalNcB\nD5oVZJBY19VZbet+b5Gl4lr4cNCrqI7L9Yj5vE4sWyLz+wG/GS70ajyEiU7U8ZLi\nBSroySvfE6FVjusUATHxzNlQT2FYECYzUd5xIePyxI0BfTQTZeEwmTQpL2SmuoJn\nZrpAoXiLbI6GrARzTOfMl+j7TI83RsFqi6/KRfwa0v98vAoKrxpTxR5HNCz6dRfn\nIugJ2jpWRiroAj0Sq/MWTj94A0EdiB0tGS3kptZtFQKBgQD+Ms/vL9gv8N6Z0Fcz\nD2LJcJugV0+yK1csDDbKHg6eeLHd+r75a8Ovni7ubpTRHdXn3Q3Zmr/tH5lEtR7E\n7spZUCpGE5T7cFNDtMBaFbycRh/su321cC/zNSvZQWtQhbKavd3b1rh/JwiD8uQO\nqHNkoSQEq7eOlsOu68o6RB4TywKBgQDhsPpL+jmG5MsVWrZyEL47smwqEq4NSshX\nyLLcIH6m6f5zpFImGxxt8z6wAHWvs7lotWUba1Mfli+7HjTM0TliXj5P1h1AseZs\nkll4xxm2DHu/vzif4+F5eSEvWbZkl4RF+gk1s9yJ/qTZ1K6t97luc6w4V8vOs0Yt\nfffMudyM3QKBgQCJG7UmSUMtUJlwk3yFMPZSuudmS9HTwybIvmnLCP1PosAlgDsD\n44lwLz0XJBQm2xXmc0gmKB7/cnzEH4FSLY59MA0tMSC5onN24Iaj0HekPvq3QMXk\nWHe0kehtzahpjUOxzVleW2m2Q8KHETrLYTakf3oi/tAKG+2+arXwSY+DkwKBgQDA\nQ1oW24WiSspO2MZQCb9lb6wBc4RewnRFhC4KpIwAeZpQvY1V9QaVDAE9Qkb/dSXf\n85e8cgOQBwuGZkcorJwsFokSzh6BfIwFte8Omt5mXeAWCzqbyy/LocsJYW2l6AXA\n7y5lV2HrFMku4KYmgcCwPU5beT+gSMzh+EvfVf5y6QKBgQCHe0Z8vAWTx6K8B1MM\nUI0v3uzIqZ/+kY5SRrDWEXnA0zKwC1hsif5iREF/C4OHaRW5dymhebR1m0s8zeu/\nDwtsv8+TmZ+N6O5HL+2uL82YbhusyCOZvcsgGB6o95aetEcNut+O7b1094asSq7G\n+9LQTA+IxAHZof9Cbp0b+E/hlg==\n-----END PRIVATE KEY-----\n'

// Initialize Google Sheets with service account (if credentials available)
let sheets = null
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