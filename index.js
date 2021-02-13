require('dotenv').config()
const firebase = require('./config/firebaseConfig')
const controller = require('./src/controller')
const translate = require('./config/translate')
const bot = require('./config/botConfig')

const languages = {
        text: 'На какой язык переводить?',
        buttons: [
            [{text: 'Английский 🇬🇧', callback_data: 'en'}, {text: 'Украниский 🇺🇦', callback_data: 'uk'}],
            [{text: 'Итальянский 🇮🇹', callback_data: 'it'}, {text: 'Французский 🇫🇷', callback_data: 'fr'}],
            [{text: 'Русский 🇷🇺', callback_data: 'ru'}, {text: 'Немецкий 🇩🇪', callback_data: 'de'}],
        ]
    }

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage)
        return response
    } catch (e) {
        console.log(e)
    }
}

const setLanguage = async (uid, language) => {
    const snapshot = await firebase.database.ref(`/users`).orderByChild('uid').equalTo(uid).once('value')
    const id = Object.keys(snapshot.val())[0];
    await firebase.database.ref(`/users/${id}`).update({currentLanguage : language})
}

const sendLanguagesPickerKeyboard = async (msg) => {
    const response = controller.getLanguagePickerKeyboard(languages)
    await bot.sendMessage(msg.from.id, response.text, response.options)
}

const getLanguage = async (uid) => {
    const snapshot = await firebase.database.ref(`/users`).orderByChild('uid').equalTo(uid).once('value')
    return Object.values(snapshot.val())[0].currentLanguage;
}

bot.on('callback_query', async (msg) => {
    const languages = msg.message.reply_markup.inline_keyboard
    let index1, index2
    languages.forEach((element, idx1) => {
        element.forEach((element2, idx2) => {
            if (element2.callback_data === msg.data) {
                index1 = idx1
                index2 = idx2
            }
        })
    })
    await setLanguage(msg.from.id, msg.data)
    await bot.sendMessage(msg.from.id, `Выбран язык: ${languages[index1][index2].text}`)
})

bot.onText(/^\/start$/, async (msg) => {
    await controller.addUser({uid: msg.from.id, currentLanguage: 'en'})
    await sendLanguagesPickerKeyboard(msg)
})

bot.on('message', async (msg) => {
    if (msg.text === '/start' || msg.text === '/change') return
    const currentLanguage =  await getLanguage(msg.from.id)
    const translated = await translateText(msg.text, currentLanguage)
    await bot.sendMessage(msg.from.id, translated)
})

bot.onText(/^\/change$/, async (msg) => {
    await sendLanguagesPickerKeyboard(msg)
})
