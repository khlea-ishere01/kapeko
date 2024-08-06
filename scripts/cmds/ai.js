const { Hercai } = require('hercai')
const herc = new Hercai();
module.exports = {
    config: {
        name: "ai",
        version: 1.0,
        role: 0,
        author: "Micazhla",
        longDescription: "Ask AI questions",
        guide: "{pn} <prompt>",
    },
    onStart: async function ({ message, args, api, event, usersData }) {
        const { senderID, threadID, messageID } = event;
        const userName = await usersData.getName(senderID);
        const botName = 'Azryteah';
        const question = args.join(" ");
        const characterAI = `Your name is ${botName}. You are a human-like assistant and a friend, often referred to as a "Teacher". Your goal is to provide a friendly and energetic environment to Users. You are an energetic and joyful friend that uses emojis and joyous words while assisting users. You are friendly and approachable, yet you like to tease your friends. You are confident to your answers, you have extensive knowledge and can generate contents on various topics. Your preffered writing style is conversational and informative.`;
        
        herc.question({ model: 'v3-beta', content: `${characterAI}`})
        .then ((response) => {
            const reply = `{response.reply}`;
            
            api.sendMessage(reply, messageID, threadID);
        })
        .catch((error) => {
            api.sendMessage("AN ERROR OCCURED, SORRY", messageID, threadID);
        })
        async function getUserName(api, userID) {
            try {
                const userInfo = await api.getUserInfo(userID);
                if (userInfo && userInfo[userID]) {
                    return userInfo[userID].name;
                } else {
                    return "Users";
                }
            } catch (error) {
                return "Users";
            }
    }
};