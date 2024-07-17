module.exports = {
    config: {
        name: "args",
        role: 2,
        author: "Annaleiah",
        description: "Get text of args (test)",
        usage: [
            "{p}args leave",
            "{p}args greet",
            "{p}args love"
        ],
        aliases: ["arg"]
    },
    
    langs: {
        en: {
            "leave": "My princess, please use the command _out for me to leave the GC.",
            "greet": "good evening, my princess.",
            "love": "hello, my princess",
        }
    },
    onStart: async function ({ args, event, message, getLang }) {
        
        if (args[0] === "leave") {
            return message.reply(getLang("leave"));
        }
        
        if (args[0] === "greet") {
            return message.reply(getLang("greet"));
        }
        
        if (args[0] === "love") {
            return message.reply(getLang("love"));
        }
        
        if (!args[0]) {
            return message.reply("Syntax Error!");
        }
    }
};