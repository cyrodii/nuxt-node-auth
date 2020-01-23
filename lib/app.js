const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('./db/index');
var salt = 'r3&w0r$M!'

exports.user = {
  username: Math.random().toString(36).substring(7),
  email: Math.random().toString(36).substring(7) + '@memelord.com',
  password: 'dreams'
}


/* Returns True/False in a promise */
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

exports.login = function(username, password) {
  return new Promise(function(resolve, reject){
    db.getUserByName(username).then((user) => {
      bcrypt.compare(password, user.password, function(err, res) {
        if(err) throw err;
        res ? resolve(res) : reject(res)
      });    
    }).catch((err)=>{ reject(err) })    
  })
}
