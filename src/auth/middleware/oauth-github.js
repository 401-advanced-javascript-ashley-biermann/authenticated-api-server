'use strict';

/**
 * OAuth Github module
 * @module oauth-github
 */

const superagent = require('superagent');
const users = require('../models/users-model'); // FIXME: Is this going to the right place? Should it reference the db?

/*
  Resources
  https://developer.github.com/apps/building-oauth-apps/
*/

const tokenServerUrl = process.env.TOKEN_SERVER;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

/**
 * @function authorize Uses Github OAuth to authorize a user
 * @next Passes through middleware
 */
module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken)

    //FIXME: gets to this point, but doesn't receive anything back in .body, and can't .save(), and doesn't seem to recognize any of the user.function functions. Maybe it's not actually a user it's getting? 
    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('(3) GITHUB USER', remoteUser)

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    console.log('(4) LOCAL USER', user);

    next();
  } catch (e) { next(`ERROR: ${e.message}`) }

}

async function exchangeCodeForToken(code) {

  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  })

  let access_token = tokenResponse.body.access_token;
  console.log(tokenResponse.body);
  /*{ access_token: 'c6ae27cd653236676bbbf0d2209bd82f2b053b7b',
  scope: 'read:user',
  token_type: 'bearer' }*/
  return access_token;

}

async function getRemoteUserInfo(token) {

  let userResponse =
    await superagent.get(remoteAPI)
      .set('user-agent', 'express-app')
      .set('Authorization', `token ${token}`)
  //FIXME: Seems like the use info isn't actually come back in the userResponse.body, or anywhere else inthe userResponse

  let user = userResponse.body;
  return user;

}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword'
  }

  let user = await users.save(userRecord); // FIXME: this is coming back as not a function... maybe I need to create a new instance of a user or otherwise pass the right info along
  let token = users.generateToken(user);

  return [user, token];

}