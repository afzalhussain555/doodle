const mysql = require('mysql');

var getConnection = function (){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'doodle'
      });
    return connection;
}

module.exports = {'getConnection': getConnection};