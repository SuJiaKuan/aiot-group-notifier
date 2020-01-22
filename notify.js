const { authorize, fetchSheetValues } = require('./spreadsheets');
const { sendLineNotification } = require('./line');
const template = require('./template');

async function sendEventNotification(
  spreadsheetsConfig,
  lineNotifyConfig,
  eventConfig,
) {
  const auth = authorize(
    spreadsheetsConfig.credentialsPath,
    spreadsheetsConfig.tokenPath,
  );
  const rows = await fetchSheetValues(
    auth,
    spreadsheetsConfig.spreadsheetId,
    spreadsheetsConfig.range,
  );
  const names = rows.map(row => row[0]).join('\n');
  const message = template
    .replace('[DATE]', eventConfig.date)
    .replace('[NAMES]', names)
    .replace('[FORM-LINK]', eventConfig.formLink);

  sendLineNotification(message, lineNotifyConfig.accessToken);
}

module.exports = {
  sendEventNotification,
}
