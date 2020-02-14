const express = require('express');

const oauth = require('../middleware/oauth/github.js');
const User = require('../models/users/users-model.js');
let auth = require('../middleware/auth.js');

// eslint-disable-next-line new-cap
const router = express.Router();


router.post('/signup', (req, res) => {
  // hash the pass from req body then save
// create new user and save it in databsase
  new User(req.body).save()
    .then(userIn => {
      let token = User.generateToken(userIn);
      res.status(200).send(token);
    });
});

router.post('/signin', auth(), (req, res) => {

  // creat token and append to req by basicAuth middleware

  res.status(200).json(req.token);
});

router.get('/users', auth(), (req, res) => {

  // show all users from database
  User.find().then(data=>{
    res.status(200).json(data);
  });

});

router.get('/oauth', oauth ,(req, res) => {
  res.status(200).send(req.token);

});



module.exports = router;
