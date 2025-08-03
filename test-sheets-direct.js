const { google } = require('googleapis')

// Test Google Sheets API directly
async function testGoogleSheets() {
  try {
    console.log('🧪 Testing Google Sheets API directly...')
    
    // Use the same credentials from the function
    const privateKey = "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2d0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktrd2dnU2xBZ0VBQW9JQkFRRGdHbVE1UGVjazRYVWcKSi9XNEMrVFh0UXZoeldmK2xwcWYwTkdxZFcwZVpnQ0wxQzAwY0h5aXJkQlNlNGpza0RoQ2FuTGkxWnhvdUdmMApaVjlnYVRWY0pUTnlqaWUyZkNXK0lnZ2tJQ1lCYkQ2b1NQNS9kZ2EvVGZnRUxiOFdxR2IvajRxbnc2cVpoV2xICnZTM0YzZUpIeXRsKzVPZk02UjBEZTNCL2I0Q2ljL1RkbklKTlh2VkxnMFNOUjRpYzVBbGd6ak5wdStWZXorekQKYXJISFF3MjNMY0txUUpMMllsbGhCdlpZN2daZk1iSm9iK0U1TDhkeFZSZnB3TFJObFZBV3ZJdUFJQXhlU0luTApibVEzRzJScEhMdDl1aUNmMXdmUEVJN1FuejVob3I5dzZLY0phUjNhVVU0Q1lBYU8vRlNmK0Z6eDJQZ25NSCtoClduZjJQaG8vQWdNQkFBRUNnZ0VBTHg1dGJ6bXNSVzFnRm94QVZsdXQySXJZL2plVmc0cC81VlZmR0NPTGQyWkQKL0NKM0JMMFgvNDVqTEV5TUhBMHd2d29wc0pYYU1hTzc5a0VSZXMwcWhHQmQ2a3h4a1JTZGJwZGphbE5jQgpENW9WWkpCWTE5VlpiZXQrYjVHbDRscjRjTkNycUk3TDlZajV2RTRzV3lMeit3Ry9HUzcwYWp5RWlVN1U4WkxpCkJTcm95U3ZmRTZGVmp1c1VBVEh4ek5sUVQyRllFQ1l6VWQ1eEllUHl4STBCZlRRVFplRXdtVFFwTDJTbXVvSm4KWnJwQW9YaUxiSTZHckFSelRPZk1sK2o3VEk4M1JzRnFpNi9LUmZ3YTB2OTh2QW9LcnhwVHhSNUhOQ3o2ZFJmbgpJdWdKMmpwV1Jpcm9BajBTcS9NV1RqOTRBMEVkaUIwdEdTM2twdFp0RlFLQmdRRCtNcy92TDlndjhONlowRmN6CkQyTEpjSnVnVjAreUsxY3NERGJLSGc2ZWVMSGQrcjc1YThPdm5pN3VicFRSSGRYbjNRM1ptci90SDVsRXRSN0UKN3NwWlVDcEdFNVQ3Y0ZORHRNQmFGYnljUmgvc3UzMjFjQy96TlN2WlFXdFFoYkthdmQzYjFyaC9Kd2lEOHVRTwpxSE5rb1NRRXE3ZU9sc091NjhvNlJCNFR5d0tCZ1FEaHNQcEwram1HNU1zVldyWnlFTDQ3c213cUVxNE5Tc2hYCnlMTGNJSDZtNmY1enBGSW1HeHh0OHo2d0FIV3ZzN2xvdFdVYmExTWZsaSs3SGpUTTBUbGlYajVQMWgxQXNlWnMKa2xsNHh4bTJESHUvdnppZjQrRjVlU0V2V2Jaa2w0UkYrZ2sxczl5Si9xVFoxSzZ0OTdsdWM2dzRWOHZPczBZdApmZmZNdWR5TTNRS0JnUUNKRzdVbVNVTXRVSmx3azN5Rk1QWlN1dWRtUzlIVHd5Ykl2bW5MQ1AxUG9zQWxnRHNECjQ0bHdMejBYSkJRbTJ4WG1jMGdtS0I3L2NuekVINEZTTFk1OU1BMHRNU0M1b25OMjRJYWowSGVrUHZxM1FNWGsKV0hlMGtlaHR6YWhwalVPeHpWbGVXMm0yUThLSEVUckxZVGFrZjNvaS90QUtHKzIrYXJYd1NZK0Rrd0tCZ1FEQQpRMW9XMjRXaVNzcE8yTVpRQ2I5bGI2d0JjNFJld25SRmhDNEtwSXdBZVpwUXZZMVY5UWFWREFFOVFrYi9kU1hmCjg1ZThjZ09RQnd1R1prY29ySndzRm9rU3poNkJmSXdGdGU4T210NW1YZUFXQ3pxYnl5L0xvY3NKWVcybDZBWEEKN3k1bFYySHJGTWt1NEtZbWdjQ3dQVTViZVQrZ1NNemgrRXZmVmY1eTZRS0JnUUNIZTBaOHZBV1R4Nks4QjFNTQpVSTB2M3V6SXFaLytrWTVTUnJEV0VYbkEwekt3QzFoc2lmNWlSRUYvQzRPSGFSVzVkeW1oZWJSMW0wczh6ZXUvCkR3dHN2OCtUbVorTjZPNUhMKzJ1TDgyWWJodXN5Q09admNzZ0dCNm85NWFldEVjTnV0K083YjEwOTRhc1NxN0cKKzlMUVRBK0l4QUHab2Y5Q2JwMGIrRS9obGc9PQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tIA=="
    
    // Decode the private key
    const decodedKey = Buffer.from(privateKey, 'base64').toString('utf-8')
    console.log('✅ Private key decoded successfully')
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: 'boarddecks@boarddecks-early-access.iam.gserviceaccount.com',
        private_key: decodedKey.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    
    const sheets = google.sheets({ version: 'v4', auth })
    console.log('✅ Google Sheets API initialized')
    
    // Test reading the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk',
      range: 'Early Access Signups!A:E'
    })
    
    console.log('✅ Successfully read from Google Sheet')
    console.log('📊 Current rows in sheet:', response.data.values ? response.data.values.length : 0)
    
    // Test writing to the sheet
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk',
      range: 'Early Access Signups!A:E',
      valueInputOption: 'RAW',
      resource: {
        values: [[
          new Date().toISOString(),
          'TEST',
          'DIRECT',
          'TEST COMPANY',
          'test@direct.com'
        ]]
      }
    })
    
    console.log('✅ Successfully wrote to Google Sheet')
    console.log('📝 Updated range:', appendResponse.data.updates.updatedRange)
    console.log('📊 Rows updated:', appendResponse.data.updates.updatedRows)
    
  } catch (error) {
    console.error('❌ Google Sheets test failed:', error.message)
    console.error('Error stack:', error.stack)
  }
}

testGoogleSheets() 