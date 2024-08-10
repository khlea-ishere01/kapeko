module.exports = {
    config: {
        name: "call", //not command
        role: 0,
        author: "Micazhla",
        description: "not a command"
    },
    onStart: async function ({ }) {},
    onChat: async function ({ message, api, event }) {
        const botMessage = ["Hello, how are you?", "How may I help today?", "I'm Xavian, your one and only friendly bot.", "Hey there! My prefix is -", "I'm here! Is there anything I can help?", "Gising pa ako, may maitutulong ba ako?", "How's your day?"];
        const random = Math.floor(Math.random() * botMessage.length);
        const randomIndex = botMessage[random];
        
        if (event.body && event.body.toLowerCase() == "xavian") {
            api.setMessageReaction("✅", event.messageID, () => {}, true);
            api.sendMessage(randomIndex, event.threadID, event.messageID);
        }
    }
};
