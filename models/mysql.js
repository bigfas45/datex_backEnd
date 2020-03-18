const mysql = require('mysql');

const db = mysql.createConnection({
    host      : process.env.HOST,
    user      : process.env.DBUSER1,
    password  :  process.env.DBPASS1 ,
    database  :  process.env.DATABASENAME,
    multipleStatements: true
  });
  
  // connect 
  db.connect((err) => {
    if (err){
      throw err;
    } 
    console.log('Mysql 1 Connected ')
  });

  module.exports = db