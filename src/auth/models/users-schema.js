'use strict';

/**
 * User Schema
 * @module userSchema mongoose.model
 * @param {string} username Name of user
 * @param {string} password User's password
 * @param {string} role Role of user: user, write, editor, admin
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String }
});

module.exports = mongoose.model('userSchema', userSchema);
