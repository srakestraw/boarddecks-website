import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse('', { status: 200, headers })
  }

  try {
    const data = await request.json()
    const { firstName, lastName, company, email } = data

    // Validate required fields
    if (!firstName || !lastName || !company || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400, headers }
      )
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400, headers }
      )
    }

    // Sanitize inputs
    const sanitizeInput = (input: string) => input.trim().replace(/[<>]/g, '')
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      company: sanitizeInput(company),
      email: sanitizeInput(email)
    }

    // Validate minimum length requirements
    if (sanitizedData.firstName.length < 2 || sanitizedData.lastName.length < 2 || sanitizedData.company.length < 2) {
      return NextResponse.json(
        { error: 'All fields must be at least 2 characters long' },
        { status: 400, headers }
      )
    }

    // Log the submission
    const timestamp = new Date().toISOString()
    console.log('=== EARLY ACCESS SIGNUP ===')
    console.log('Timestamp:', timestamp)
    console.log('Name:', `${sanitizedData.firstName} ${sanitizedData.lastName}`)
    console.log('Company:', sanitizedData.company)
    console.log('Email:', sanitizedData.email)
    console.log('========================')

    // For local development, we'll just log the data
    // In production, this would connect to Google Sheets via Netlify Functions
    console.log('📝 Local Development: Data logged successfully')
    console.log('🌐 Production: This would be sent to Google Sheets via Netlify Functions')

    return NextResponse.json(
      { 
        success: true, 
        message: 'Early access request submitted successfully (local development mode)',
        data: sanitizedData
      },
      { status: 200, headers }
    )

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse('', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  })
} 