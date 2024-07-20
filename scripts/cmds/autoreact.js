const emojiRegex = require("emoji-regex");
module.exports = {
  config: {
    name: 'autoreact',
    author: '@',
    countDown: 5,
    role: 2,
    category: 'owner',
    shortDescription: { en: "Reacts to emoji with same emoji!" }
  },
  onStart: async function() {},
  onChat: async function({ event, api, message, emojiRegex }) {
    const emojis = event.body.match(emojiRegex());

if (emojis) {
    for (const emoji of emojis) {
        await api.setMessageReaction(emoji, event.messageReply.messageID, () => {}, true);
    }
}
  }
};