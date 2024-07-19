module.exports = {
    config: {
        name: "badwords",
        aliases: ["badword"],
        version: "1.3",
        author: "NTKhang",
        countDown: 5,
        role: 0,
        shortDescription: {
            vi: "Bật/tắt cảnh báo thô tục",
            en: "Turn on/off bad words warning"
        },
        longDescription: {
            vi: "Bật/tắt/thêm/xóa cảnh báo vi phạm từ thô tục, nếu thành viên vi phạm sẽ bị cảnh báo, lần 2 sẽ kick khỏi box chat",
            en: "Turn on/off/add/remove bad words warning, if a member violates, he will be warned, the second time he will be kicked out of the chat box"
        },
        category: "box chat",
        guide: {
            vi: "   {pn} add <words>: thêm từ cấm (có thể thêm nhiều từ cách nhau bằng dấu phẩy \",\" hoặc dấu gạch đứng \"|\""
                + "\n   {pn} delete <words>: xóa từ cấm (có thể xóa nhiều từ cách nhau bằng dấu phẩy \",\" hoặc dấu gạch đứng \"|\""
                + "\n   {pn} list <hide | để trống>: tắt cảnh báo (thêm \"hide\" để ẩn từ cấm)"
                + "\n   {pn} unwarn [<userID> | <@tag>]: xóa 1 lần cảnh báo của 1 thành viên"
                + "\n   {pn} on: tắt cảnh báo"
                + "\n   {pn} off: bật cảnh báo",
            en: "   {pn} add <words>: add banned words (you can add multiple words separated by commas \",\" or vertical bars \"|\")"
                + "\n   {pn} delete <words>: delete banned words (you can delete multiple words separated by commas \",\" or vertical bars \"|\")"
                + "\n   {pn} list <hide | leave blank>: turn off warning (add \"hide\" to hide banned words)"
                + "\n   {pn} unwarn [<userID> | <@tag>]: remove 1 warning of 1 member"
                + "\n   {pn} on: turn off warning"
                + "\n   {pn} off: turn on warning"
                + "\n   {pn} setall <words>: set banned words for all threads (you can add multiple words separated by commas \",\" or vertical bars \"|\")"
        }
    },

    langs: {
        // ... (The langs object remains the same)
    },

    onStart: async function ({ message, event, args, threadsData, usersData, role, getLang }) {
        if (!await threadsData.get(event.threadID, "data.badWords"))
            await threadsData.set(event.threadID, {
                words: [],
                violationUsers: {}
            }, "data.badWords");

        const badWords = await threadsData.get(event.threadID, "data.badWords.words", []);

        switch (args[0]) {
            case "add": {
                if (role < 1)
                    return message.reply(getLang("onlyAdmin"));
                const words = args.slice(1).join(" ").split(/[,|]/);
                if (words.length === 0)
                    return message.reply(getLang("missingWords"));
                const badWordsExist = [];
                const success = [];
                const failed = [];
                for (const word of words) {
                    const oldIndex = badWords.indexOf(word);
                    if (oldIndex === -1) {
                        badWords.push(word);
                        success.push(word);
                    }
                    else if (oldIndex > -1) {
                        badWordsExist.push(word);
                    }
                    else
                        failed.push(word);
                }
                await threadsData.set(event.threadID, badWords, "data.badWords.words");
                message.reply(
                    success.length > 0 ? getLang("addedSuccess", success.length) : ""
                        + (badWordsExist.length > 0 ? getLang("alreadyExist", badWordsExist.length, badWordsExist.map(word => hideWord(word)).join(", ")) : "")
                        + (failed.length > 0 ? getLang("tooShort", failed.length, failed.join(", ")) : "")
                );
                break;
            }
            case "delete":
            case "del":
            case "-d": {
                if (role < 1)
                    return message.reply(getLang("onlyAdmin2"));
                const words = args.slice(1).join(" ").split(/[,|]/);
                if (words.length === 0)
                    return message.reply(getLang("missingWords2"));
                const success = [];
                const failed = [];
                for (const word of words) {
                    const oldIndex = badWords.indexOf(word);
                    if (oldIndex > -1) {
                        badWords.splice(oldIndex, 1);
                        success.push(word);
                    }
                    else
                        failed.push(word);
                }
                await threadsData.set(event.threadID, badWords, "data.badWords.words");
                message.reply(
                    (success.length > 0 ? getLang("deletedSuccess", success.length) : "")
                    + (failed.length > 0 ? getLang("notExist", failed.length, failed.join(", ")) : "")
                );
                break;
            }
            case "list":
            case "all":
            case "-a": {
                if (badWords.length === 0)
                    return message.reply(getLang("emptyList"));
                message.reply(getLang("badWordsList", args[1] === "hide" ? badWords.map(word => hideWord(word)).join(", ") : badWords.join(", ")));
                break;
            }
            case "on": {
                if (role < 1)
                    return message.reply(getLang("onlyAdmin3", getLang("onText")));
                await threadsData.set(event.threadID, true, "settings.badWords");
                message.reply(getLang("turnedOnOrOff", getLang("onText")));
                break;
            }
            case "off": {
                if (role < 1)
                    return message.reply(getLang("onlyAdmin3", getLang("offText")));
                await threadsData.set(event.threadID, false, "settings.badWords");
                message.reply(getLang("turnedOnOrOff", getLang("offText")));
                break;
            }
            case "unwarn": {
                if (role < 1)
                    return message.reply(getLang("onlyAdmin4"));
                let userID;
                if (Object.keys(event.mentions)[0])
                    userID = Object.keys(event.mentions)[0];
                else if (args[1])
                    userID = args[1];
                else if (event.messageReply)
                    userID = event.messageReply.senderID;
                if (isNaN(userID))
                    return message.reply(getLang("missingTarget"));
                const violationUsers = await threadsData.get(event.threadID, "data.badWords.violationUsers", {});
                if (!violationUsers[userID])
                    return message.reply(getLang("notWarned", userID));
                violationUsers[userID]--;
                await threadsData.set(event.threadID, violationUsers, "data.badWords.violationUsers");
                const userName = await usersData.getName(userID);
                message.reply(getLang("unwarned", userID, userName));
            }
            case "setall": {
                if (role < 1)
                    return message.reply(getLang("onlyAdmin"));
                const words = args.slice(1).join(" ").split(/[,|]/);
                if (words.length === 0)
                    return message.reply(getLang("missingWords"));
                
                const allThreadData = await threadsData.getAll();
                const successThreads = [];
                const failedThreads = [];
                
                for (const thread of allThreadData) {
                    if (!thread.data.badWords) {
                        await threadsData.set(thread.threadID, {
                            words: [],
                            violationUsers: {}
                        }, "data.badWords");
                    }
                    
                    const badWordsForThread = thread.data.badWords.words || [];
                    for (const word of words) {
                        if (!badWordsForThread.includes(word)) {
                            badWordsForThread.push(word);
                        }
                    }
                    
                    try {
                        await threadsData.set(thread.threadID, badWordsForThread, "data.badWords.words");
                        successThreads.push(thread.threadID);
                    } catch (error) {
                        failedThreads.push(thread.threadID);
                    }
                }
                
                message.reply(
                    (successThreads.length > 0 ? `✅ | Successfully added words to ${successThreads.length} threads.` : "")
                    + (failedThreads.length > 0 ? `❌ | Failed to add words to ${failedThreads.length} threads.` : "")
                );
                break;
            }
        }
    },

    onChat: async function ({ message, event, api, threadsData, prefix, getLang }) {
        console.log("onChat function called"); // Debug message
        if (!event.body) {
            console.log("No message body"); // Debug message
            return;
        }

        const threadData = global.db.allThreadData.find(t => t.threadID === event.threadID) || await threadsData.create(event.threadID);
        console.log("Thread data fetched"); // Debug message
        const isEnabled = threadData.settings.badWords;
        if (!isEnabled) {
            console.log("Bad words feature is not enabled"); // Debug message
            return;
        }

        const allAliases = [...(global.GoatBot.commands.get("badwords").config.aliases || []), ...(threadData.data.aliases?.["badwords"] || [])];
        const isCommand = allAliases.some(a => event.body.startsWith(prefix + a));
        if (isCommand) {
            console.log("Message is a bot command"); // Debug message
            return;
        }

        const badWordList = threadData.data.badWords?.words;
        if (!badWordList || badWordList.length === 0) {
            console.log("No bad words defined"); // Debug message
            return;
        }

        const violationUsers = threadData.data.badWords?.violationUsers || {};
        console.log("Checking message for bad words"); // Debug message

        for (const word of badWordList) {
            if (event.body.match(new RegExp(`\\b${word}\\b`, "gi"))) {
                if ((violationUsers[event.senderID] || 0) < 1) {
                    console.log(`First violation detected for user ${event.senderID}`); // Debug message
                    message.reply(getLang("warned", word));
                    violationUsers[event.senderID] = (violationUsers[event.senderID] || 0) + 1;
                    await threadsData.set(event.threadID, violationUsers, "data.badWords.violationUsers");
                    return;
                } else {
                    console.log(`Second violation detected for user ${event.senderID}`); // Debug message
                    await message.reply(getLang("warned2", word));
                    api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
                        if (err) {
                            console.log("Bot needs admin rights to kick users"); // Debug message
                            return message.reply(getLang("needAdmin"), (e, info) => {
                                let { onEvent } = global.GoatBot;
                                onEvent.push({
                                    messageID: info.messageID,
                                    onStart: ({ event }) => {
                                        if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
                                            const { TARGET_ID } = event.logMessageData;
                                            if (TARGET_ID == api.getCurrentUserID()) {
                                                api.removeUserFromGroup(event.senderID, event.threadID, () => {
                                                    onEvent = onEvent.filter(item => item.messageID != info.messageID);
                                                });
                                            }
                                        }
                                    }
                                });
                            });
                        }
                    });
                }
            }
        }
    }
};

function hideWord(str) {
        return str.length == 2 ?
                str[0] + "*" :
                str[0] + "*".repeat(str.length - 2) + str[str.length - 1];
}