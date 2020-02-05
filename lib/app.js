const bcrypt = require('bcryptjs');
const db = require('./db/index');
const jwt = require('./jwt')

/**
 * @user User object. Requires a username/password
 * @return True / False based on if user was registered or not 
 */
exports.register = function(user) {
  return new Promise(function(resolve, reject){
    bcrypt.hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      db.createUser(user).then((res) => {
        res ? resolve(res) : reject('Error Occured')
      }).catch((err) => {console.log(err)})
    })
    .catch((err)=> {console.log(err)})
  })
}

/**
 * Checks to see if user is in DB > Compares Passwords > Assigns new token > returns token
 * @username Required
 * @password Required
 * @expiresIn Token expiry. Default: 1h
 * @return JWT Token applied to username or null
 */
exports.login = function(username, password, expiresIn = '1h') {
  return new Promise(function(resolve, reject){
    db.getUserByName(username).then((user) => {
      bcrypt.compare(password, user.password, function(err, res) {
        if(res) {
          delete user.token
          delete user.password
          jwt.assignToken(user, expiresIn).then((token) => {
            resolve(token)
          }).catch((err)=> { reject(err) })
        } else {
          reject(err)
        }
      });    
    }).catch((err)=>{ reject(err) })    
  })
}

/**
 * Checks bearer token if expired or wrong match
 * @token Bearer Token; Required
 * @return True/False based on checked token
 */
exports.check = function(token){ 
  return new Promise(function(resolve, reject){
    jwt.checkToken(token).then((res) => {
      resolve(res)
    }).catch((err) => { reject(err) })
  })
}