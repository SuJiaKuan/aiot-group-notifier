const fs = require('fs');
const readline = require('readline');

const { createOAuth2Client } = require('./spreadsheets');
const config = require('./config')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function main() {
  const oAuth2Client = createOAuth2Client(config.spreadsheets.credentialsPath);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        throw err;
      }

      fs.writeFileSync(config.spreadsheets.tokenPath, JSON.stringify(token));
    });

  });
}

main()
