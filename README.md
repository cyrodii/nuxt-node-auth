# Nuxt/Node Auth
This is a simple authentication package made for my Nuxt/Node/Express admin panel. It connects to your MySQL database through your .env file and allows you to register users, login users and creating a JWT token for them. As well as the ability to use middleware and check to see if the token is expired or it doesn't match. This is my first npm package so pull requests are welcome if you feel like something could be done better. 

## How to use

#### Installation
```js 
npm i nuxt-node-auth
```
```js
const auth = require('nuxt-node-auth')
```
Your .env file should look like this with your database information.
```
# MySQL Database Configuration
MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PASS=''
MYSQL_DB='projectname'
```

#### Login
```js
  auth.login(username, password).then((token) => {
    return res.json(token);
  }).catch((err) => { console.log(err) })
```
This returns a token with a default expiry of 1 hour.

OR
```js
  auth.login(username, password, '5h').then((token) => {
    return res.json(token);
  }).catch((err) => { console.log(err) })
```
This would expire in 5 hours.

[Refer to this package for in depth expiration setup](https://www.npmjs.com/package/jsonwebtoken#token-expiration-exp-claim)

#### Register
Returns true/false based on if the user was successfully registered.
```js
  auth.register({username: '123', password: '456'}).then((result) => {
    console.log(result)
  }).catch((err) => { console.log(err) })
```

#### Check Token
This would return a response of true/false depending on whether the JWT matched or not. It returns false if the token is expired aswell. 
```js
  let token = req.headers['authorization'].split(' ')[1];
  auth.check(token).then((response) => {
    return res.json(response) 
  }).catch((err) => { return res.json(err); })
```

## Todo
* Logout
* Permissions System
* Create a Vue/Nuxt plugin within this package
* Auto generate a salt and store it in .env file (For now there is just a predefined salt)
* Allow other database usage (For now its strictly MySql) 

## Support

As I mentioned previously this is my first package I have created. If you feel like something could be done better or if you would like to help out with a feature I encourage you to make a pull request. 


