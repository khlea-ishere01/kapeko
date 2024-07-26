module.exports = {
    config: {
        name: "educgc",
        role: 0,
        author: "Annaleiah",
        description: "Join education gc"
    },
    onStart: async function ({ message, event, api }) {
        const userID = event.senderID;
        const targetThread = "26890267070572509";
        
        api.addUserToGroup(targetThread, userID);
    }
}