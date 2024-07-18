global.zenLeaf = {};

module.exports = {
    config: {
        name: "chat",
        version: "1.0",
        description: "Command to turn on/off chat",
        guide: {
            en: "Turn on/off chat"
        },
        category: "box chat",
        countDown: 5,
        role: 0,
        author: "Annaleiah",
        startTime: null // Add startTime property to config
    },
    
    langs: {
        en: {
            "onlyAdmin": "You do not have permission to use this command!",
            "chatEnabled": "Chat is now enabled. Members can now freely chat!"
        }
    },

    onStart: async function ({ message, args, role, getLang, event }) {
        if (args[0] === "on") {
            if (role < 1) {
                return message.reply(getLang("onlyAdmin")); 
            }
            
            const threadID = event.threadID; 
            global.zenLeaf[threadID] = global.zenLeaf[threadID] || {};
            global.zenLeaf[threadID].chatEnabled = true;
            
            // Set startTime if provided in args[1] (format: HH:mm:ss)
            if (args[1]) {
                this.config.startTime = args[1]; // Assuming args[1] is in "HH:mm:ss" format
                // Schedule the activation of chat at the specified time
                scheduleChatActivation(this.config.startTime, threadID);
            }
            
            message.reply("Chat off is now disabled. Members can now freely chat.");
        } else if (args[0] === "off") {
            if (role < 1) {
                return message.reply(getLang("onlyAdmin")); 
            }
            
            const threadID = event.threadID; 
            global.zenLeaf[threadID] = global.zenLeaf[threadID] || {};
            global.zenLeaf[threadID].chatEnabled = false;
            
            message.reply("Chat off enabled. Members who chat will be kicked.");
        }
    },

    onChat: async function ({ message, event, api, getLang, role }) {
        const threadID = event.threadID; 
        const chatEnabled = global.zenLeaf[threadID]?.chatEnabled ?? true;

        if (!chatEnabled) {
            if (role < 1) {
                // Kick user if chat is disabled
                api.removeUserFromGroup(event.senderID, threadID, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                message.reply("CHAT DETECTED | The group is currently on chat off. You have been kicked from the group.");
            }
        }
    }
};

// Function to schedule chat activation
function scheduleChatActivation(startTime, threadID) {
    // Parse startTime into hours, minutes, and seconds
    const [hours, minutes, seconds] = startTime.split(':').map(Number);

    // Current time
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    // Calculate milliseconds until startTime
    let millisecondsUntilStartTime = 0;
    if (hours > currentHours || (hours === currentHours && minutes > currentMinutes) || (hours === currentHours && minutes === currentMinutes && seconds > currentSeconds)) {
        // Schedule for today
        const startTimeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
        millisecondsUntilStartTime = startTimeToday.getTime() - now.getTime();
    } else {
        // Schedule for tomorrow
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hours, minutes, seconds);
        millisecondsUntilStartTime = tomorrow.getTime() - now.getTime();
    }

    // Set timeout to activate chat
    setTimeout(() => {
        // Implement logic to activate chat here
        activateChat(threadID);
    }, millisecondsUntilStartTime);
}

function activateChat(threadID) {
    // Implement logic to activate chat functionality here
    // For example:
    global.zenLeaf[threadID].chatEnabled = true;
    const api = require('some_api_module'); // Replace with your API module
    const getLang = (lang) => module.exports.langs.en[lang]; // Language function

    // Notify everyone in the thread that chat is enabled
    api.sendMessage(getLang("chatEnabled"), threadID, (err) => {
        if (err) {
            console.error("Failed to send message:", err);
        }
    });
}