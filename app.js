const config = require("config");
const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(config.telegram);

bot.command("quote", (ctx) => {
    fetch("https://the-one-api.dev/v2/quote", {
        headers: {
            Authorization: `Bearer ${config.token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let items = data.docs;
            let quote = items[Math.floor(Math.random()*items.length)];
            bot.telegram.sendMessage(ctx.chat.id, quote.dialog);
        });
});

bot.launch();