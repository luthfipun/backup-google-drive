import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import { google } from "googleapis";
import { logging } from "../log/config.js";

const auth = new google.auth.GoogleAuth({
    keyFile: './gdrive/account/service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
    version: 'v3',
    auth
});

export const uploadDB = async (path, name) => {
    let fileMetaData = {
        'name': name,
        'mimeType': 'application/vnd.google-apps.file'
    }

    let mediaType = {
        mimeType: 'text/plain',
        body: fs.createReadStream(`${path}/${name}`)
    }

    let startUpload = new Promise(async(resolve, rejects) => {
        await drive.files.create({
            resource: fileMetaData,
            media: mediaType,
            fields: 'id'
        }).then(async (res) => {
    
            if(res.status !== 200){
                rejects('Failed to upload files to google drive with status code ' + res.status)
                return
            }
    
            logging('Successfully upload files ' + name)
            resolve(res.data.id)

        }).catch((err) => {
            rejects(err.message)
            return
        })
    })

    startUpload.then(async(id) => {
        await requestPermission(id, name)
        logging('Backup data successfully')
    }, reason => {
        logging(reason)
        logging('Backup data failed')
    })
    .then(() => {
        process.exit()
    })

}

const requestPermission = async (fileId, name) => {
    
    let personalEmail = process.env.PERSONAL_GDRIVE_EMAIL || ''

    let mediaPermission = {
        'type': 'user',
        'role': 'writer',
        'emailAddress': personalEmail
    }

    await drive.permissions.create({
        resource: mediaPermission,
        fileId: fileId,
        fields: 'id'
    }).then((res) => {

        if(res.status !== 200){
            logging(`Failed to set permission for files ${name} with status code ${res.status}`)
            return
        }

        logging(`Successfully set permission for files ${name}`)
    }).catch((err) => {
        logging(err.message)
    })
    
}