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
        scheduledTurnOn: null // Store scheduled turn on time
    },
    
    langs: {
        en: {
            "onlyAdmin": "You do not have permission to use this command!",
            "chatEnabled": "Chat is now enabled. Members can now freely chat!",
            "chatDisabled": "Chat is now disabled. Members who chat will be kicked!",
            "chatWillEnableAt": "Chat is now disabled. It will be enabled again at {{time}}."
        }
    },

    onStart: async function ({ message, args, role, getLang, event }) {
        const command = args[0];
        const time = args[1];

        if (command === "on") {
            if (role < 1) {
                return message.reply(getLang("onlyAdmin")); 
            }
            
            const threadID = event.threadID; 
            global.zenLeaf[threadID] = global.zenLeaf[threadID] || {};
            global.zenLeaf[threadID].chatEnabled = true;
            
            message.reply("Chat is now enabled. Members can now freely chat.");
        } else if (command === "off") {
            if (role < 1) {
                return message.reply(getLang("onlyAdmin")); 
            }
            
            const threadID = event.threadID; 
            global.zenLeaf[threadID] = global.zenLeaf[threadID] || {};
            global.zenLeaf[threadID].chatEnabled = false;

            // Schedule chat to be enabled at the specified time
            if (time) {
                this.config.scheduledTurnOn = time;
                scheduleChatActivation(time, threadID);
                message.reply(getLang("chatWillEnableAt").replace("{{time}}", time));
            } else {
                message.reply("Chat is now disabled. Members who chat will be kicked.");
            }
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
                message.reply(getLang("chatDisabled"));
            }
        }
    }
};

// Function to schedule chat activation
function scheduleChatActivation(time, threadID) {
    // Parse time into hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(':').map(Number);

    // Current time in UTC
    const now = new Date();
    const utcNow = new Date(now.toISOString());

    // Scheduled time in UTC+8
    const scheduledTime = new Date(
        utcNow.getUTCFullYear(),
        utcNow.getUTCMonth(),
        utcNow.getUTCDate(),
        hours - 8, // Adjust hours for UTC
        minutes,
        seconds
    );

    // If the scheduled time is earlier in the day, schedule for the next day
    if (scheduledTime <= utcNow) {
        scheduledTime.setUTCDate(scheduledTime.getUTCDate() + 1);
    }

    const millisecondsUntilTime = scheduledTime - utcNow;

    console.log(`Scheduling chat activation for ${scheduledTime.toISOString()} which is in ${millisecondsUntilTime} milliseconds.`);

    // Set timeout to activate chat
    setTimeout(() => {
        console.log(`Activating chat for threadID: ${threadID} at ${new Date().toISOString()}`);
        activateChat(threadID);
    }, millisecondsUntilTime);
}

function activateChat(threadID) {
    global.zenLeaf[threadID].chatEnabled = true;
    const api = require('api'); // Replace with your API module
    const getLang = (lang) => module.exports.langs.en[lang]; // Language function

    // Notify everyone in the thread that chat is enabled
    api.sendMessage(getLang("chatEnabled"), threadID, (err) => {
        if (err) {
            console.error("Failed to send message:", err);
        } else {
            console.log(`Chat enabled message sent to threadID: ${threadID}`);
        }
    });
}