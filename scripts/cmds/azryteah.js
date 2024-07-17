module.exports = {
        config: {
                        name: "azry",
                        version: "1.0",
                        author: "Jaychris Garcia",
                        countDown: 5,
                        role: 0,
                        shortDescription: "sarcasm",
                        longDescription: "sarcasm",
                        category: "reply",
        },
onStart: async function(){}, 
onChat: async function({
        event,
        message,
        getLang
}) {
        if (event.body && event.body.toLowerCase() == "azry") return message.reply("Hi! I'm Azry 🌞 How may I help you today? 🙋❤️");
}
};