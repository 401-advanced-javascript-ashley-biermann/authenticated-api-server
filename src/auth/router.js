'use strict';

/**
 * Router
 * @module router Routes from '/'
 */

// DEPENDENCIES
const express = require('express');
const cors = require('cors');

// PREPARE THE ROUTER
const router = express.Router();

// APP LEVEL MW
router.use(cors());

// ROUTE MIDDLEWARE
const oauth = require('./middleware/oauth-github'); //OAUTH
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const acl = require('./middleware/acl');

// WEBSITE FILES //OAUTH
router.use(express.static('./public')); //OAUTH

// MODELS
const UserModel = require('./models/users-model');
const User = new UserModel();

// ROUTES
router.get('/oauth', oauth, (req,res) => {
  res.status(200).send(req.token);
}); //OAUTH
router.post('/signup', handleCreateUser);
router.post('/signin', basicAuth, handleSignIn);
router.get('/users', bearerAuth, /* acl('update'),*/ handleGetUsers);

//FUNCTIONS
async function handleCreateUser (req, res, next) {

  let userExists = await User.exists({ username: req.body.username });
  if (userExists) {
    res.send('User Already Exists');
    return; 
  }

  let password = await UserModel.hashPassword(req.body.password);

  let newUser = await User.create({ username: req.body.username, password: password, role: req.body.role });
  if (newUser) {
    let token = UserModel.generateToken({ username: req.body.username });

    res.cookie('token', token);
    res.header('token', token);
    res.send({token, user: req.user});
  } else {
    res.status(403).send('User Invalid');
  }
}

function handleSignIn (req, res, next) {

  if (req.user) {
    let token = UserModel.generateToken({ username: req.user.username })

    console.log('User was signed in');
    res.cookie('token', token);
    res.header('token', token);
    res.send({ token, user: req.user });
  } else {
    res.status(403).send('Invalid');
  }
}

async function handleGetUsers (req, res, next) {
  let allUsers = await User.get();
  res.send(allUsers);
}

module.exports = router;
