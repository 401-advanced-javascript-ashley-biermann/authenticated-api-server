'use strict';

/**
 * User Class
 * @module User Extends MongoInterface, Provides additional User-specific methods
 */

require('dotenv').config();
const schema = require('../models/users-schema');
const Model = require('../models/mongo-interface');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const allRoles = require('../models/roles');
// const { set } = require('mongoose');

const SECRET = process.env.SECRET;

class User extends Model {
  constructor() {
    super(schema);
  }
  set username(username) {}
  set password(password) {}
  setRole(role) { this.role = role }

  static hashPassword(password) { 
    return bcrypt.hash(password, 5);
  }

  static async authenticateUser(username, password) {
    try {
      //search for the user that the req is looking for
      let users = await schema.find({ username });
      //see if the user's password matches the password passed into signin route
      let authorized = await bcrypt.compare(password, users[0].password);

      if (authorized) {
        return users[0];
      } else {
        return false;
      }
    } catch (e) {
      console.error('Error :: ', e);
      return false;
    }
  }

  static generateToken(username) {
    // console.log(username);
    let token = jwt.sign(username, SECRET, { expiresIn: '24h'});
    return token;
  }

  static async validateToken(token) {
    try {
      let user = await jwt.verify(token, SECRET);
      return user;
    } catch (e) {
      return Promise.reject('jwt Invalid - at validateToken');
    }
  }
/**
 * @function can Checks if the user can do the thing they want to do
 * @param {string} permission 
 * @returns {boolean} True - If their role matches the capability they want, go for it!
 */
  can(permission) {
    return allRoles[this.role].includes(permission);
  }  
}

module.exports = User;