// Google Apps Script webhook URL
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

console.log('🔧 Using Google Apps Script webhook approach')
console.log('📡 Webhook URL:', GOOGLE_APPS_SCRIPT_URL)

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

    // Save to Google Sheets via Google Apps Script webhook
    try {
      console.log('📝 Sending data to Google Apps Script webhook...')
      
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: sanitizedData.firstName,
          lastName: sanitizedData.lastName,
          company: sanitizedData.company,
          email: sanitizedData.email
        }),
        redirect: 'follow'
      })
      
      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))
      
      const responseText = await response.text()
      console.log('📡 Response body:', responseText)
      
      try {
        const result = JSON.parse(responseText)
        if (result.success) {
          console.log('✅ Data saved to Google Sheets via webhook successfully')
        } else {
          console.error('❌ Google Apps Script webhook error:', result.error)
        }
      } catch (parseError) {
        console.log('⚠️ Response is not JSON, but webhook was called')
        console.log('📝 Response text:', responseText)
      }
      
    } catch (error) {
      console.error('❌ Google Apps Script webhook error:', error)
      console.error('Error details:', error.message)
      console.error('Error stack:', error.stack)
      // Continue without failing the request
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