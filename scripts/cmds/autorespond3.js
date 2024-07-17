module.exports = {
  config: {
    name: "autorespondv2",
    version: "2.0.0",
    author: "Haru",
    cooldown: 5,
    role: 0,
    shortDescription: "Autoresponds with reactions and replies",
    longDescription: "Autoresponds with reactions and replies based on specific words or triggers.",
    category: "fun",
    guide: "?autorespondv3"
  },
  onStart: async ({ api, event }) => {
    // Blank onStart function as per the request
  },
  onChat: async ({ api, event, message }) => {
    const { body, messageID, threadID } = event;

    // Reactions based on words
    const emojis = {
      "😢": [ ":(", "lungkot", "sad", ":<", "suicide", "su1cide", "depressed", "depression", "sad emoji" ]
    };

    // React based on words
    for (const [emoji, words] of Object.entries(emojis)) {
      for (const word of words) {
        if (body.toLowerCase().includes(word)) {
          api.setMessageReaction(emoji, messageID, () => {}, true);
            message.reply("Cheer up po! Don't be sad na, I'm always here to support you. Kung hindi mo na kaya, chat mo lang nanay ko. Magaling yun mag comfort <3");
        }
      }
    }
  }
};