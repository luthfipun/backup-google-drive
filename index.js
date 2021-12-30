require('dotenv').config();
const mysqlConnection = require('./mysql/connection.js');

const checkDB = mysqlConnection;

console.log(checkDB);