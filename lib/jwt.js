const jwt = require('jsonwebtoken')
const salt = 'f1S@dfV475a'
const db = require('./db/connection')

/** 
 * @user User data from database
 * @expiresIn Set how long you want the token to last. Default: 1h
 */
exports.assignToken = function(user, expiresIn = '1h'){
  return new Promise(function(resolve, reject){
    const token = jwt.sign({data: user}, salt, { expiresIn })
    db.query('UPDATE users SET token = ? WHERE username = ?', [token, user.username], (err, res) => {
      if(err) throw err
      resolve(token)
      reject(err)
    })
  })
}