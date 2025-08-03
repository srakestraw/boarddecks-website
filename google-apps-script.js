// Google Apps Script Code
// Copy this to: https://script.google.com/
// Then deploy as a web app

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const { firstName, lastName, company, email } = data;
    
    // Validate required fields
    if (!firstName || !lastName || !company || !email) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'All fields are required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Please enter a valid email address' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the spreadsheet and sheet
    const spreadsheetId = '1TrZEorP3JvvlXjY2wCmOh2T6RrBmh3apJtloOsy6mPk';
    const sheetName = 'Early Access Signups';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Prepare the data row
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      firstName.trim(),
      lastName.trim(),
      company.trim(),
      email.trim()
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in Google Apps Script:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Internal server error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ message: 'Google Apps Script is running' }))
    .setMimeType(ContentService.MimeType.JSON);
} 