import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: './gdrive/account/service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
    version: 'v3',
    auth
});

(async() => {
    const resp = await drive.files.list({
        fields: '*'
    });
    console.log(resp)
})().catch((err) => {
    console.log(err.message)
})