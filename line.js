const axios = require('axios');
const querystring = require('querystring');

function sendLineNotification(message, accessToken) {
  return axios({
    method: 'post',
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: querystring.stringify({
      message,
    })
  });
}

module.exports = {
  sendLineNotification,
}
