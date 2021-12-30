const log = require('log-to-file');

const fileName = './log/log.txt';

const logging = (msg) => {
    log(msg, fileName, '\r\n');
    console.log(msg)
}

module.exports = {
    logging
};