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

    // Log the submission with clear formatting
    const timestamp = new Date().toISOString()
    console.log('')
    console.log('🎉 NEW EARLY ACCESS SIGNUP 🎉')
    console.log('================================')
    console.log(`📅 Timestamp: ${timestamp}`)
    console.log(`👤 Name: ${sanitizedData.firstName} ${sanitizedData.lastName}`)
    console.log(`🏢 Company: ${sanitizedData.company}`)
    console.log(`📧 Email: ${sanitizedData.email}`)
    console.log('================================')
    console.log('')

    // TODO: Add your preferred storage method here:
    // - Google Sheets (see GOOGLE_SHEETS_SETUP.md)
    // - Email notification
    // - Database (Supabase, Firebase, etc.)
    // - File storage

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    }

  } catch (error) {
    console.error('❌ Early access submission error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process submission. Please try again later.' })
    }
  }
} 