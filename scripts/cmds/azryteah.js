module.exports = {
        config: {
                        name: "xia",
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
        if (event.body && event.body.toLowerCase() == "xia") return message.reply("I'm here! ❤️ How may I help u today? 🙋");
}
};