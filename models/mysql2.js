const mysql = require('mysql');

const db2 = mysql.createConnection({
  
host      : process.env.HOST2,
user      : process.env.DBUSER2,
password  :  process.env.DBPASS2,
database  :  process.env.DATABASENAME2,
multipleStatements: true


});


// connect 
db2.connect((err) => {
  if (err){
    throw err;
  } 
  console.log('Mysql 2 Connected ')
});

module.exports = db2
