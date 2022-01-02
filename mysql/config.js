import dotenv from 'dotenv';
import fs from 'fs';
import mysql from 'mysql2';
import mysqldump from 'mysqldump';
import { uploadDB } from '../gdrive/config.js';
import { logging } from '../log/config.js';
import { closeApp, currentTime } from '../utils/index.js';
dotenv.config();


const tempDir = './temp/mysql';
const prefixName = process.env.PREFIX_BACKUP_NAME || 'DB_BACKUP__';
const currentName = `${prefixName+currentTime()}.sql`;

const configDB = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'information_schema'
}

const connection = mysql.createConnection(configDB);

export const initBackup = async () => {
    const isMysqlBackup = process.env.MYSQL_BACKUP || 'true'
    if(isMysqlBackup !== 'true'){
        logging('Backup MySQL disabled!')
        return
    }

    let startConnection = new Promise((resolve, rejects) => {
        connection.connect(async function(err){
            if(err){
                rejects(err.message)
            }
            resolve('Successfully connected to Mysql DB')
        })
    })

    startConnection.then(async (msg) => {
        logging(msg)
        await startBackup()
    }, reason => {
        logging(reason)
        closeApp()
    })
}

const startBackup = async () => {
    checkDir()

    let backUpData = new Promise(async (resolve, rejects) => {
        await mysqldump({
            connection: configDB,
            dumpToFile: `${tempDir}/${currentName}`
        }).then(() => {
            resolve('Successfully import MySQL database')
        }).catch((err) => {
            rejects(err.message)
        })
    })
    
    backUpData.then(async (msg) => {
        logging(msg)
        await uploadDB(tempDir, currentName)
    }, reason => {
        logging(reason)
        closeApp()
    })
}

const checkDir = () => {
    if(!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir, { recursive: true});
        fs.chmodSync(tempDir, '0755')
    }
}