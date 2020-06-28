'use strict';

/**Access Control List
 * @module permissions
 */

 const UserModel = require('../models/users-model');
 const User = new UserModel();

/**
 * Curried function - middleware - checks for permission to access a route based on user's role
 * @param {string} capability The type of permission necessary to pass the middleware requirement
 * @next Passes through if user has role which allows for the requested capability
 */

const permissions = (capability) => async(req, res, next) => {
  // console.log(`from permission mw - req.user.username ${req.user.username}`);
  let formatted = await User.getByUsername(req.user.username);
  // console.log(`user ${user}`);
  let user = new UserModel();
  user.username = formatted.username;
  user.password = formatted.password;
  user.setRole(formatted.role);

  let hasPermission = await user.can(capability);
  if (hasPermission) {
    next();
  } else {
    next('Permission Denied');
  }
}

module.exports = permissions;
