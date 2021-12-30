import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import mysql from 'mysql2';
import mysqldump  from 'mysqldump';
import { logging } from '../log/config.js';
import { currentTime } from '../utils/index.js';

const tempDir = './temp/mysql';
const currentName = `${tempDir}/DB_BACKUP__${currentTime()}.sql`;

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

    connection.connect(async function(err){
        if(err){
            logging(err.message)
            return
        }
    
        logging('Successfully connected to Mysql DB');
        await startBackup()
    })
}

const startBackup = async () => {
    checkDir()

    await mysqldump({
        connection: configDB,
        dumpToFile: currentName
    }).then(() => {
        logging('Successfully import MySQL database')
        uploadDB()
    }).catch((err) => {
        logging(err.message)
        return
    })
}

const checkDir = () => {
    if(!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir, { recursive: true});
        fs.chmodSync(tempDir, '0755')
    }
}

const uploadDB = () => {
    console.log('upload Db')
}