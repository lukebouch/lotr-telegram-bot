const config = require("config");
const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(config.telegram);

bot.command("quote", (ctx) => {
    let random = Math.floor(Math.random()*2390);
    fetch(`https://the-one-api.dev/v2/quote?limit=1&offset=${random}`, {
        headers: {
            Authorization: `Bearer ${config.token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            bot.telegram.sendMessage(ctx.chat.id, data['docs'][0]['dialog']);
        });
});

bot.launch();