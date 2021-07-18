const config = require('config');
const https = require('https');
const { Telegraf } = require('telegraf');

const options = {
    hostname: config.url,
    port: 443,
    path: '/quote',
    method: 'GET'
}

const bot = new Telegraf(config.telegram);

bot.command('quote', ctx => {
    let req = https.request(options, res => {
        res.on('data', d => {
            bot.telegram.sendMessage(ctx.chat.id, d);
        });
    });
});

bot.launch();