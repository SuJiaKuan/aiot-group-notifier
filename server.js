const { CronJob } = require('cron');
const moment = require('moment');

const { sendEventNotification } = require('./notify');
const config = require('./config');

function main() {
  new CronJob(config.schedule.cronjob, async () => {
    const now = moment()
    const endTime = moment(config.schedule.endTime);

    if (now <= endTime) {
      sendEventNotification(
        config.spreadsheets,
        config.lineNotify,
        config.event,
      ).then((res) => {
        console.log(`Success to send event notification at ${now}`);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, null, true);
}

main();
