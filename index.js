require('dotenv').config();
const mysqlConfig = require('./mysql/config.js');
const {logging} = require('./log/config.js');

mysqlConfig.connect(function(err){

    if(err){
        logging(err.message)
        return
    }

    logging('Successfully connected to Mysql DB');
})