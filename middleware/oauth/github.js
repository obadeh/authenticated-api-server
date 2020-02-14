/* eslint-disable camelcase */


const superagent = require('superagent');
const User = require('../../models/users/users-model.js');


const tokenServerUrl = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = 'http://localhost:3000/oauth';



module.exports = async function authorizeOauth(req, res, next) {
  try {
    let code = req.query.code;
    console.log('my code:', code);

    // send code for github token
    let remoteToken = await exchangeCodeForToken(code);
    console.log('remote token:', remoteToken);

    // send back the token for github user information
    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('remote user:', remoteUser);

    // take the needed infomatin from user's information
    let [user, token] = await getUserAndSave(remoteUser);
    req.user = user;
    req.token = token;

    next();
  } catch(err) {
    next(err);
  }
};

async function exchangeCodeForToken(code) {
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });

  let access_token = tokenResponse.body.access_token;
  return access_token;
}

async function getRemoteUserInfo(token) {
  let userResponse = await superagent.get(remoteAPI)
    .set('user-agent', 'express-app')
    .set('Authorization', `token ${token}`);

  let user = userResponse.body;
  return user;
}

async function getUserAndSave(remoteUser) {

  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword',
  };

  new User(userRecord).save();
  let user = userRecord.username;
  let token = User.generateToken(userRecord);


  return [user, token];
}