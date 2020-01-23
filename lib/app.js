const bcrypt = require('bcryptjs');
const db = require('./db/index');
const jwt = require('./jwt')

/**
 * @user User object passed from register form. Requires a username/password
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
 * @username Username from form
 * @password Password from form
 * @return JWT Token applied to username or null
 */
exports.login = function(username, password) {
  return new Promise(function(resolve, reject){
    db.getUserByName(username).then((user) => {
      bcrypt.compare(password, user.password, function(err, res) {
        if(res) {
          delete user.password
          jwt.assignToken(user).then((token) => {
            resolve(token)
          }).catch((err)=> { reject(err) })
        } else {
          reject(err)
        }
      });    
    }).catch((err)=>{ reject(err) })    
  })
}
