const firebase = require('firebase');
require('firebase/auth');
require('firebase/database')

const firebaseConfig = {
    databaseURL : 'https://translatorbot-303518-default-rtdb.europe-west1.firebasedatabase.app',
    apiKey: "AIzaSyAvqQy2G65mAHwToYxB0EZ97QO5GNmhlow",
    authDomain: "translatorbot-303518.firebaseapp.com",
    projectId: "translatorbot-303518",
    storageBucket: "translatorbot-303518.appspot.com",
    messagingSenderId: "734885288325",
    appId: "1:734885288325:web:692ca87df2c373fda64cec"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
module.exports = {
    database : firebase.database()
}