const moment = require('moment-timezone');

module.exports.config = {
  name: "autotime",
  version: "2.0.0",
  role: 0,
  author: "kylepogi",//don't change the author kung ayaw mong ma pwetan!! 
  description: "Automatically sends messages based on set times.",
  category: "AutoTime",
  countDown: 3
};

module.exports.onLoad = async ({ api }) => {
  const arrayData = {
     "12:00:00 PM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 12:00 PM\n\n📌 Tumulog na kayo, midnight na. 💤 Good night sainyoooo ❤️"
      },
      "01:30:00 AM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 01:30 AM\n\n📌 Ano itong nakikita kong gising pa kayo? 🤨 magsitulog na kayo kundi i papa chat off ko ito sa nanay ko 💤😠"
        
      },
      "06:00:00 AM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 06:00 AM\n\n📌 RISE AND SHINE 🌞 Kaka gising niyo palang, noh? sige kape muna kayo ☕"
        
      },
      "08:00:00 AM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 08:00 AM\n\n📌 GOOD MORNING 🌞 RISE AND SHINE, It's new a day to slay again! 😁 Let's enjoy this day better than yesterday! 🥞"
        
      },
      "11:00:00 AM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 11:00 AM\n\n📌  Good evening guysss, don't forget to eat your lunch! 🍽️🥞"
        
      },
      "12:00:00 PM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 12:00 PM\n\n📌  Good noon to everyone! 🥞 Gentle reminder na makipag interact din kayo sa ibang members here sa gc 👥 Anyway, don't forget to eat your lunch! 🍽️"
        
      },
      "03:00:00 PM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 03:00 PM\n\n📌 Good afternoon! Let's eat some snacks. 🥞 Don't forget to eat snacks! 🍽️"
        
      },
      "06:00:00 PM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 06:00 PM\n\n📌 Good eveningggg!! It's already evening na, which means it's dinner time 🍽️ Don't forget to eat y'all dinner! ❤️"
        
      },
      "07:00:00 PM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 07:00 PM\n\n📌 What's up, guyz'ed? Nagsi kain na kayo gaya ng sabi ko kanina? if hindi pa, kain na kayooo. ‘Wag kayo palipas ng gutom! ❤️"
          
      },
      "11:00:00 PM": {
        message: "🔔 Automated Message:\n╌╌╌╌╌╌╌╌╌╮\n⏰ time now - 11:00 PM\n\n📌 11 pm na, magsi tulog na ang mga gising pa kundi mumultohin ko kayo 👻. Good night, everyone! 💤"
      }

    // Add more messages for other times as needed
  };

  const checkTimeAndSendMessage = () => {
    const now = moment().tz('Asia/Manila');
    const currentTime = now.format('hh:mm:ss A');

    const messageData = arrayData[currentTime];

    if (messageData) {
      const tid = global.db.allThreadData.map(i => i.threadID);
      tid.forEach(async (threadID, index) => {
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