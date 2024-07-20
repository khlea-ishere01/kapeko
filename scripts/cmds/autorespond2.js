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
guide: "?autorespondv3",
},
onStart: async ({ api, event }) => {
// Blank onStart function as per the request
},
onChat: async ({ api, event }) => {
const { body, messageID, threadID } = event;

// Reactions based on words
const emojis = {
"🌸": ["Goddess", "Kaycee", "Zen", "Beautiful", "Pretty", "pretty", "maganda", "beautiful", "ganda", "yeppeo", "beauty", "Beauty", "Flower", "flower", "julianne", "Julianne", "yesha", "Yesha"],
"😆": ["haha", "hahaha", "hahahaha", "hahahahaha", "pfft", "pft", "pffft", "HAHA", "HAHAHA", "HAHAHAHA", "HAHAHAHAHA", "HAHAHAHAHAHA", "hshs", "HSHS", "hshshs", "HSHSHS"],
"😠": ["🤨", "no", "talong", "galit", "nagagalit", "mad", "angry", "magalit", "ayoko", "ayoq", "ayaw"],
"🙈": ["wtf", "fck", "haaays", "stfu", "ngi ", "ngek", "nge ", "luh", "lah", "hays", "wth", "fuck", "tangina", "putangina", "tanginamo", "putanginamo", "Tangina", "Putangina", "Tanginamo", "Putanginamo"],
"⏳": ["prodia", "sdxl", "bardv3", "tanongv2", "-imagine", "genimg", "Tanongv4", "kamla", "-shortcut"],
"👋": ["Hi", "hi", "Hii", "hii", "hello", "Hello", "hiii", "Hiii", "loe", "Loe", "loee", "Loee"],
"🌊": ["ok", "cool", "bien", "super", "d'accord", "génial", "merveille"], 
"🌞": ["morning", "gomo", "gm"],
"😮": ["wow", "woww", "WOW", "WOWW", "wah", "wahh", "nigga", "nigger", "bulag", "pangit", "blind", "bakla", "tomboy", "gay", "lesbian", "bobo", "tanga", "burat", "puki", "pussy", "posay", "tite", "ekup", "etit", "tits", "puke", "finger", "fingering", "cum", "cúm", "cûm", "cùm", "cüm", "cūm", "NIGGA", "NIGGER", "BULAG", "PANGIT", "BLIND", "BAKLA", "TOMBOY", "GAY", "LESBIAN", "BOBO", "TANGA", "BURAT", "PUKI", "PUSSY", "POSAY", "TITE", "EKUP", "ETIT", "TITS", "PUKE", "FINGER", "FINGERING", "CUM", "CÚM", "CÛM", "CÙM", "CÜM", "CŪM", "Nigga", "Nigger", "Bulag", "Pangit", "Blind", "Bakla", "Tomboy", "Gay", "Lesbian", "Bobo", "Tanga", "Burat", "Puki", "Pussy", "Posay", "Tite", "Ekup", "Etit", "Tits", "Puke", "Finger", "Fingering", "Cum", "Cúm", "Cûm", "Cùm", "Cüm", "Cūm"]
};

// Replies to specific words
const replies = {
"Bye": "bye babe",
"muah": "💋🌷",
"azry, who is your mother?": "Annaleiah, pinaka mamahal na nanay ko",
"mahal kita": "love you too, baby",
"mahal na mahal kita": "love you too, baby",
"fuck": "bakit ka nagmumura?",
"tangina": "bakit ka nagmumura?",
"fck": "bakit ka nagmumura?",
"shit": "bakit ka nagmumura?",
"misskonasya": "hindi ka miss, duh",
"misskonasiya": "hindi ka miss, duh",
"miss ko na sya": "hindi ka miss, duh",
"miss ko na siya": "hindi ka miss, duh",
"thanks": "you're welcome!",
"thank you": "you're welcome!",
"thx": "you're welcome!",
"ty": "you're welcome!",};

// React based on words
for (const [emoji, words] of Object.entries(emojis)) {
for (const word of words) {
if (body.toLowerCase().includes(word)) {
api.setMessageReaction(emoji, messageID, () => {}, true);
}
}
}

// Reply based on triggers
for (const [trigger, reply] of Object.entries(replies)) {
if (body.toLowerCase().includes(trigger)) {
api.sendMessage(reply, threadID, messageID);
}
}
},
};