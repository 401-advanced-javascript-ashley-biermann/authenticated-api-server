'use strict';

/** Products Schema
 * @module mongoose.model
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  category: { type: String },
  name: { type: String, required: true},
  display_name: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('product', schema);