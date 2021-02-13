const {Translate} = require('@google-cloud/translate').v2

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
const PROJECT_ID = CREDENTIALS.projectId

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: PROJECT_ID
})

module.exports = translate


