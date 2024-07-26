const moment = require('moment-timezone');

module.exports.config = {
  name: "autotime",
  version: "2.0.0",
  role: 0,
  author: "pogi", //don't change the author kung ayaw mong ma pwetan!!
  description: "Automatically sends messages based on set times.",
  category: "AutoTime",
  countDown: 3
};

module.exports.onLoad = async ({ api }) => {
  const arrayData = {
    "06:00:00 AM": {
      message: "THIS IS AN AUTOMATED MESSAGE \n▬▬▬▬▬▬▬▬▬▬▬▬\nTIMECHECK: 06:00 AM\n\n Use the command #educgc to be added to Azry's educ/music/fun room! Please add friend bot first before using command."
    },
    "09:00:00 AM": {
      message: "THIS IS AN AUTOMATED MESSAGE \n▬▬▬▬▬▬▬▬▬▬▬▬\nTIMECHECK: 09:00 AM\n\n Use the command #educgc to be added to Azry's educ/music/fun room! Please add friend bot first before using command."
    },
    "12:00:00 PM": {
      message: "THIS IS AN AUTOMATED MESSAGE \n▬▬▬▬▬▬▬▬▬▬▬▬\nTIMECHECK: 12:00 PM\n\n Use the command #educgc to be added to Azry's educ/music/fun room! Please add friend bot first before using command."
    },
    "03:00:00 PM": {
      message: "THIS IS AN AUTOMATED MESSAGE \n▬▬▬▬▬▬▬▬▬▬▬▬\nTIMECHECK: 03:00 PM\n\n Use the command #educgc to be added to Azry's educ/music/fun room! Please add friend bot first before using command."
    },
    "06:00:00 PM": {
      message: "THIS IS AN AUTOMATED MESSAGE \n▬▬▬▬▬▬▬▬▬▬▬▬\nTIMECHECK: 06:00 PM\n\n Use the command #educgc to be added to Azry's educ/music/fun room! Please add friend bot first before using command."
    },
    "09:00:00 PM": {
      message: "THIS IS AN AUTOMATED MESSAGE \n▬▬▬▬▬▬▬▬▬▬▬▬\nTIMECHECK: 09:00 PM\n\n Use the command #educgc to be added to Azry's educ/music/fun room! Please add friend bot first before using command."
    },
    "10:00:00 PM": {
      message: "TIMECHECK: 10:00 PM\nGood night, everyone!"
    }

    // Add more messages for other times as needed
  };

  const checkTimeAndSendMessage = () => {
    const now = moment().tz('Asia/Manila');
    const currentTime = now.format('hh:mm:ss A');

    const messageData = arrayData[currentTime];

    if (messageData) {
      const tid = global.db.allThreadData.map(i => i.threadID);
      tid.forEach(async (threadID) => {
        api.sendMessage({ body: messageData.message }, threadID);
      });
    }

    const nextMinute = moment().add(1, 'minute').startOf('minute');
    const delay = nextMinute.diff(moment());
    setTimeout(checkTimeAndSendMessage, delay);
  };

  checkTimeAndSendMessage();
};

module.exports.onStart = () => {};