const fs = require('fs');
const { google } = require('googleapis');

function createOAuth2Client(credentialsPath) {
  const content = fs.readFileSync(credentialsPath);
  const credentials = JSON.parse(content)
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  return oAuth2Client;
}

function authorize(credentialsPath, tokenPath) {
  const oAuth2Client = createOAuth2Client(credentialsPath);
  const token = fs.readFileSync(tokenPath);

  oAuth2Client.setCredentials(JSON.parse(token));

  return oAuth2Client;
}

async function fetchSheetValues(auth, spreadsheetId, range) {
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return res.data.values;
}

module.exports = {
  createOAuth2Client,
  authorize,
  fetchSheetValues,
}
