import log from 'log-to-file';

const fileName = './log/log.txt';

export const logging = (msg) => {
    log(msg, fileName, '\r\n');
    console.log(msg)
}