const jwt = require('jsonwebtoken')
const salt = 'f1S@dfV475a'
const db = require('./db/connection')

/** 
 * Assigns user a new token
 * @user User data from database
 * @expiresIn Set how long you want the token to last. Default: 1h
 */
exports.assignToken = function(user, expiresIn){
  return new Promise(function(resolve, reject){
    const token = jwt.sign({data: user}, salt, { expiresIn })
    db.query('UPDATE users SET token = ? WHERE username = ?', [token, user.username], (err, res) => {
      if(err) throw err
      resolve(token)
      reject(err)
    })
  })
}

/**
 * Checks client-side token with server side token connected to user
 * @token Bearer Token
 */
exports.checkToken = function(token){
  return new Promise(function(resolve, reject){
    db.query('SELECT * FROM users WHERE token = ?', [token], (err, res) => {
      if(err) throw err
      jwt.verify(token, salt, function(err, decoded) {
        if (err) reject(false)
        if(res.length === 1){
          resolve(true)
        } else {
          reject(false)
        }
      })
    })  
  })
}