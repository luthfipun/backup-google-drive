import dotenv from 'dotenv';
import fs from 'fs';
import { google } from "googleapis";
import { logging } from "../log/config.js";
import { closeApp } from '../utils/index.js';
dotenv.config();


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
        })
    })

    startUpload.then(async(id) => {
        await requestPermission(id, name)
    }, reason => {
        logging(reason)
        logging('Backup data failed')
        closeApp()
    })
}

const requestPermission = async (fileId, name) => {
    
    let personalEmail = process.env.PERSONAL_GDRIVE_EMAIL || ''

    let mediaPermission = {
        'type': 'user',
        'role': 'writer',
        'emailAddress': personalEmail
    }
    let setPermission = new Promise(async(resolve, rejects) => {
        await drive.permissions.create({
            resource: mediaPermission,
            fileId: fileId,
            fields: 'id'
        }).then((res) => {
    
            if(res.status !== 200){
                rejects(`Failed to set permission for files ${name} with status code ${res.status}`)
            }

            logging(`Successfully set permission for files ${name}`)
            resolve('Backup data successfully')

        }).catch((err) => {
            rejects(err.message)
        })
    })
    
    setPermission.then((msg) => {
        logging(msg)

        setTimeout(() => {
            closeApp()
        }, 3000);
    }, reason => {
        logging(reason)
    });
}