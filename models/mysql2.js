const mysql = require('mysql');

const db2 = mysql.createConnection({
  host      : '192.169.233.185',
  user      : 'notcsadm_excalib',
  password  : 'DRp@r6iLa0_j',
  database  : 'notcsadm_nasdngx',
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
