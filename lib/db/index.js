var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'redworknode'
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

exports.createUser = function(user){
  return new Promise(function(resolve, reject){
    db.query('INSERT INTO users SET ?', user, (err, results) => {
      if(err) throw err
      Number.isInteger(results.insertId) ? resolve(true) : reject(false)
    }) 
  })
}

exports.getUserByName = function(username){
  return new Promise(function(resolve, reject){
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
      if(err) throw err;
      (res.length < 1 || res[0] == undefined) ? reject('User not found') : resolve(res[0])
    })
  })  
}