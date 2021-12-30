const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'information_schema'
})

const connect = connection.connect(function(err){
    if(err){
        console.log(err.message)
        return false
    }
    return true
})

module.exports = connect;