module.exports = {
    config: {
        name: "botsay",
        role: 0,
        author: "Annaleiah",
        description: "make bot say",
        category: "fun",
        cooldown: 5,
        guide: "botsay [message]"
    },
    onStart: async function ({ args, message, event, api }) {
        const res = args.join(" ")
        
        if (!res) {
            return message.reply("please enter text")
        }
        else message.send(res)
    }
};