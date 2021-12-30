require('dotenv').config();
const mysqlConnection = require('./mysql/connection.js');

mysqlConnection.connect(function(err){

    if(err){
        console.log(err.message)
        return
    }

    console.log('connected!')
})