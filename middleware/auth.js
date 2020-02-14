const User = require('../models/users/users-model.js');
// const base64 = require('base-64');

module.exports = (capability) => {

  return (req, res, next) => {

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      console.log('authString : ', authString);

      switch (authType.toLowerCase()) {
      case 'basic':
        return basicAuth(authString);
      case 'bearer':
        return bearerAuth(authString);
      default:
        return errorAuth();
      }
    } catch (e) {
      errorAuth();
    }


    function basicAuth(str) {

      let base64Buffer = Buffer.from(str, 'base64');
      let bufferString = base64Buffer.toString();
      console.log('bufferString : ', bufferString);
      let [username, password] = bufferString.split(':');
      let auth = {username, password};
      console.log('auth : ', auth);

      return User.authenticateBasic(auth.username,auth.password)
        .then(user => isAuthenticated(user))
        .catch(errorAuth);
    }

    function bearerAuth(authString) {
      return User.verifyToken(authString)
        .then(user => isAuthenticated(user))
        .catch(errorAuth);
    }

    function isAuthenticated(user) {
      if ( user && (!capability || (user.can(capability))) ) {
        req.user = user;
        req.token = User.generateToken(user);
        next();
      }
      else {
        errorAuth('Invalid User ID/Password or Access Denied');
      }
    }

    function errorAuth(e) {
      next(e);
    }

  };

};