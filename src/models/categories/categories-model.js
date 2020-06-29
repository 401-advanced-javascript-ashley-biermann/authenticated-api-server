'use strict';

/**
 * Category Model
 * @module Category
 */

const schema = require('../categories/categories-schema.js');
const Model = require('../../models/mongo-interface');

class Category extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Category;