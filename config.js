module.exports = {
  spreadsheets: {
    credentialsPath: 'credentials.json',
    tokenPath: 'token.json',
    spreadsheetId: 'your spreadsheet ID',
    range: 'Form Responses 1!D2:D500',
  },
  lineNotify: {
    accessToken: 'your LINE Notify access token',
  },
  event: {
    date: 'the event date',
    formLink: 'link to the event registration form ',
  },
  schedule: {
    endTime: '2099-12-31 23:59:59',
    cronjob: '0 22 * * *',
  },
}
