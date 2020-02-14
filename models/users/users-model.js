

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('./roles-schema.js');
dotenv.config();

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
});

const capabilities = {
  admin: ['create','read','update','delete'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};

users.pre('save', async function() {

  this.password = await bcrypt.hash(this.password, 5);

});



users.statics.authenticateBasic = function(user, pass) {
  let query = {username:user};
  console.log('query : ', query);
  return this.findOne(query)
    .then( user => user && user.comparePassword(pass) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.statics.generateToken = function(user) {

  let userSecInfo = {
    username: user.username,
    capabilities: capabilities[user.role],
  };

  let token = jwt.sign(userSecInfo , process.env.SECRET);
  console.log('token genrated: ', token);

  return token;
};

users.statics.verifyToken = async function(token) {

  let tokenObject = jwt.verify(token, process.env.SECRET);
  console.log('tokenObject : ',tokenObject );
  return this.findOne({username:tokenObject.username});

};

users.methods.can = function(capability) {
  console.log('capability : ',capability );
  return capabilities[this.role].includes(capability);
};

module.exports = mongoose.model('users', users);