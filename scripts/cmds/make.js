module.exports = {
    config: {
        name: "make",
        role: 0,
        author: "Annaleiah",
        description: "make someone or yourself an admin or owner",
        guide: [
          "{p}make admin me",
          "{p}make owner me",
        ],
    },
    onStart: async function ({ message, api, event, args }) {
        if (args[0] === "admin") {
            if (args[1] === "me") {
                return message.reply("You are now officially an admin.");
            }
        }
        
        if (args[0] === "owner") {
            if (args[1] === "me") {
                return message.reply("Current owner of bot has been removed. You are now the owner of the bot.")
            }
        }
        
        if (args.length < 2) {
            return message.reply("Syntax Error ❌ | Please use {p}make owner me or {p}make admin me");
        }
    }
};