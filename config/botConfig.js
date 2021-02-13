const BotApi = require('node-telegram-bot-api')
const TOKEN = process.env.TOKEN
const bot = new BotApi(TOKEN, {polling: true})

module.exports = bot