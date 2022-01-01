import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import log from 'log-to-file';

const fileName = './log/log.txt';
const maxLogSize = process.env.MAX_LOG_SIZE || '10'

export const logging = (msg) => {
    log(msg, fileName, '\r\n');
    console.log(msg)
}

export const cleanLog = () => {
    try {
        const stats = fs.statSync(fileName);
        if ((stats.size * 1024 * 1024) > maxLogSize){
            fs.unlinkSync(fileName)
        }
    } catch (err) {}
}

export const cleanTemp = () => {
    const tempDir = './temp'
    fs.rmSync(tempDir, { recursive: true, force: true })
}