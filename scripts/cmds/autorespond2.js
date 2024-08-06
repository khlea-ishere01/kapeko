module.exports = {
    config: {
        name: "autoreact", // not a command.
        version: 1.0,
        role: 0,
        author: "Micazhla",
        longDescription: "React on chats based on emojis"
    },
    onStart: async function ({ }) {},
    onChat: async function ({ api, event }) = {
        const reactWord = {
            "💗": [ "azry", "azryteah", "az", "mica", "micazhla", "cazhla", "jamaica", "hi", "hii", "hiii", "hiiii", "hello", "helloo", "hellooo", "helloooo", "yo", "ey", "eyy", "eyyy", "hallo", "hallu", "hellu", "hey", "hi'ed", "hello'ed", "ayo" ],
            "🎀": [ "good morning", "good morningg", "good morninggg", "good morningggg", "goodmorning", "goodmorningg", "goodmorninggg", "goodmorningggg", "morning", "morningg", "morningg", "morninggg", "morninggg", "morningggg", "good afternoon", "good afternoonn", "good afternoonnn", "afternoon", "aft", "evening", "eve", "evee", "eveningg", "eveninggg" ],
            "⁉️": [ "asim", "asem", "baho", "bantutt", "bantut", "bantuttt", "bantot", "bantott", "bantottt", "ambaho", "bahu", "nigga", "nigger", "gay", "pangit", "slut", "slutt", "ass", "butthole", "fuck", "tangina", "putangina", "shit", "shet"],
            "😠": [ "no", "noo", "nooo", "ayaw", "ayoko", "ayoq", "ayaw ko", "ayaw kk", "naur" ]
        };
        const reactWords = {
            "😆": [ "haha", "hshs", "love", "orek", "kilala mo binabangga mo" ]
            "🤷": [ "idk", "hindi ko alam", "di ko alam", "alam", "san", "where", "what", "how", "when", "kailan", "kelan", "ano" ]
        };
        
        for (const [reactOne, triggerOne] of Object.entires(reactWord)) {
            for (const reactOnce of triggerOne) {
                if (event.body.includes(reactOnce)) {
                    api.setMessageReaction(reactOne, event.messageID, () => {}, true);
                }
            }
        }
        
        for (const [reactTwo, triggerTwo] of Object.entires(reactWords)) {
            for (const reactTwice of triggerTwo) {
                if (event.body.toLowerCase().includes(reactTwice)) {
                    api.setMessageReaction(reactTwo, event.messageID, () => {}, true);
                }
            }
        }
    }
}