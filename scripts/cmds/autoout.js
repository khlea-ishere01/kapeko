module.exports = {
    config: {
        name: "autoout",
        role: 2,
        author: "Annaleiah",
        description: "Make bot leave specific gc",
        usage: "{pn} [on|off] [threadID]"
    },
    onStart: async function ({ api, event, message, threadsData, args }) {
        const mode = args[0];
        const threadID = args[1];

        if (mode === 'on' && threadID) {
            // Save the threadID in a global variable or some persistent storage
            global.autoOutThreadID = threadID;

            // Start a loop to continuously check if the bot is in the specified thread
            if (!global.autoOutInterval) {
                global.autoOutInterval = setInterval(async () => {
                    try {
                        const threadInfo = await api.getThreadInfo(global.autoOutThreadID);
                        const botID = api.getCurrentUserID();
                        if (threadInfo.participantIDs.includes(botID)) {
                            await api.removeUserFromGroup(botID, global.autoOutThreadID);
                            console.log(`Bot has left the thread ${global.autoOutThreadID}`);
                        }
                    } catch (error) {
                        console.error('Error checking thread info or removing bot:', error);
                    }
                }, 60000); // Check every 60 seconds (adjust as needed)
            }
        } else if (mode === 'off') {
            // Clear the interval if "off" mode is set
            if (global.autoOutInterval) {
                clearInterval(global.autoOutInterval);
                global.autoOutInterval = null;
                global.autoOutThreadID = null;
                console.log('Auto leave functionality has been disabled.');
            }
        }
    }
};