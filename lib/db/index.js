const db = require('./connection')

/**
 * Creates a user in the database
 * @user User Object from client
 * @return Returns true if user created
 */
exports.createUser = function(user){
  return new Promise(function(resolve, reject){
    db.query('INSERT INTO users SET ?', user, (err, results) => {
      if(err) throw err
      Number.isInteger(results.insertId) ? resolve(true) : reject(false)
    }) 
  })
}

/**
 * Gets user by username
 * @username Username from client
 * @return Returns user object if true
 */
exports.getUserByName = function(username){
  return new Promise(function(resolve, reject){
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
      if(err) throw err;
      (res.length < 1 || res[0] == undefined) ? reject('User not found') : resolve(res[0])
    })
  })  
}
