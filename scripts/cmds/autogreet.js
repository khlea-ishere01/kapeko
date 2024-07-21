module.exports = {
  config: {
    name: "autogreet", // not a command.
    role: 0,
    author: "Annaleiah",
    description: "Reply based off of the message you send",
    category: "auto",
  },
  onStart: async function ({}) {},
  onChat: async function ({ api, event, args, message }) {
    const reply = {
      "morning": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morning": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morninggg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningggg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morninggg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningggg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorning": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorninggg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningggg": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "gm": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "gomo": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorning, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorninggg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningggg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morning, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morninggg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningggg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morning, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morninggg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningggg, everyone": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      // split here
            "goodmorning, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorninggg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningggg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morning, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morninggg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningggg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morning, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morninggg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningggg, everyonee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      // split here
            "goodmorning, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorninggg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "goodmorningggg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morning, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morninggg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "good morningggg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morning, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morninggg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      "morningggg, everyoneee": "Good morning! 🌞 Don't forget to have breakfast and hydrate yourself! 💦",
      // split afternoon
      "aft": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoon": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoonn": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoonnn": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoon": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoonn": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoonnn": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoon": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoonn": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoonnn": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      // split everyone
            "aft, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoon, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoonn, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoonnn, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoon, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoonn, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoonnn, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoon, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoonn, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoonnn, everyone": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      // split here
                  "aft, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoon, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoonn, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "afternoonnn, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoon, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoonn, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "good afternoonnn, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoon, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoonn, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      "goodafternoonnn, everyonee": "Good afternoon! 🌤️ Don't forget to hydrate yourself and take a break! 💤",
      // split evening
      "eve": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "evening": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "eveningg": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "eveninggg": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good evening": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good eveningg": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good eveninggg": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodevening": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodeveningg": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodeveninggg": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      // split everyone
      "evening, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "eveningg, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "eveninggg, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good evening, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good eveningg, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good eveninggg, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodevening, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodeveningg, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodeveninggg, everyone": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      // split here
            "evening, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "eveningg, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "eveninggg, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good evening, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good eveningg, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "good eveninggg, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodevening, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodeveningg, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      "goodeveninggg, everyonee": "Good evening! 🌇 Don't forget to hydrate yourself and take a break",
      // split local greetings
      "hi": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hii": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hiii": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hiiii": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hello": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "helloo": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hellooo": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "helloooo": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hellaur": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "helor": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "helu": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hellu": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "hey": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "ayo": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
      "yo": "Helloo, loves 👋 How are you? If you're feeling bored, you can play or talk to me. I'll be your friend! ❤️ Anyway, have a good day! 🌞",
    }

    for (const [replies, message] of Object.entries(reply)) {
      if (event.body && event.body.toLowerCase() == replies) {
        return api.sendMessage(message, event.threadID, event.messageID);
      }
    }

    for (const [replies, message] of Object.entries(reply)) {
      const split = replies.split(" ");
      if (split) {
        for (const word of split) {
          if (event.body && event.body.toLowerCase().includes(word)) {
            return api.sendMessage(message, event.threadID, event.messageID);
          }
        }
      }
    }
  }
};