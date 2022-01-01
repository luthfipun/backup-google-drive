import { cleanLog, cleanTemp } from './log/config.js';
import { initBackup } from './mysql/config.js';

(async() => {
    await cleanTemp()
    await cleanLog()
    await initBackup()
})()