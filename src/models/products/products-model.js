'use strict';

/**
 * Products Model
 * @module Product
 */

const schema = require('../products/products-schema.js');
const Model = require('../../models/mongo-interface');

class Product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Product;