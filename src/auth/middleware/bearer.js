'use strict';

/**
 * Bearer Auth Middleware
 * @module bearer
 */

const users = require('../models/users-model');

/**
 * @function bearer Checks for bearer authentication
 * @next User is valid
 * @status 401 - User not valid
 */
async function bearer (req, res, next) {
  // check auth headers
  if(!req.headers.authorization) {
    res.status(401).send('No Auth headers present');

  } else {
    //split the type from the token, and this is shorthand to do both in one line
    let [authType, token] = req.headers.authorization.split(' ');
  
    let validUser = await users.validateToken(token);
  
    if (validUser) {
      req.user = validUser;
      next();
    } else {
      res.status(401).send('Invalid Token - bearer auth');
    }
  }
}

module.exports = bearer;