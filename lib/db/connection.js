const mysql = require('mysql');
require('dotenv').config()

const db = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : process.env.MYSQL_DB
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting');
    return;
  }
  console.log('connected');
});

module.exports = db