const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var salt = 'r3&w0r$M!'

module.exports = {
  register: (string) => {
    bcrypt.hash(string, 10, function(err, hash) {
      if(err) throw err
      console.log('hashing')
      console.log(hash)
      return hash
    });       
  }
}
exports.printMsg = function() {
  console.log("This is a message from the demo package");
}