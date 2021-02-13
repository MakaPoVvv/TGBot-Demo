const firebase = require('../config/firebaseConfig')

const addUser = async (user) => {
    await firebase.database.ref('/users').orderByChild('uid').equalTo(user.uid).once('value', async function (snapshot) {
        if (!snapshot.exists()) {
            firebase.database.ref('/users').push(user)
        }
    })

}

const getLanguagePickerKeyboard = (languages) => {
    let {text} = languages
    let options = {
        reply_markup: JSON.stringify({
            inline_keyboard: languages.buttons,
            parse_mode: 'Markdown'
        })
    }
    return {text, options}
}



module.exports = {
    addUser,
    getLanguagePickerKeyboard
}