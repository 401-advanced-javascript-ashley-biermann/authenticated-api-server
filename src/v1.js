'use strict';

/**
 * api/v1/ Router 
 * @module router Routes from '/api/v1'
 */

 // DEPENDENCIES
const express = require('express');
const cors = require('cors');

// PREPARE THE ROUTER
const router = express.Router();

// ROUTER LEVEL MW
router.use(cors());

// ROUTE MIDDLEWARE
const basicAuth = require('../src/auth/middleware/basic');
const bearerAuth = require('../src/auth/middleware/bearer');
const acl = require('../src/auth/middleware/acl');

// MODELS
const CategoryModel = require('../src/models/categories/categories-model');
const ProductModel = require('../src/models/products/products-model');

/**
 * Model Finder
 * @param req
 * @param next
 * @returns {Object}
 * @function getModel identifies either category or product model
 */

function getModel(req, res, next) {
  let model = req.params.model;
  switch (model) {
    case 'categories':
      req.model = new CategoryModel();
      next();
      break;
    case 'products':
      req.model = new ProductModel();
      next();
      break;
    default:
      next('Invalid Model')
      break;
  }
}

// GETS MODEL based on MODEL-FINDER
router.param('model', getModel);

// ROUTES
router.get('/:model', basicAuth, getAll);
router.get('/:model/:id', basicAuth, getOneById);
router.post('/:model', bearerAuth, acl('create'), createOne);
router.put('/:model/:id', bearerAuth, acl('update'), updateOneById);
router.delete('/:model/:id', bearerAuth, acl('delete'), deleteOneById);

/**
 * CRUD for route handlers
 * @function getAll
 * @function getOneById
 * @function createOne
 * @function updateOneById
 * @function deleteOneById
 */

async function getAll(req, res) {
  console.log('getAll route hit');
  const result = await req.model.get();
  res.send(result);
}

async function getOneById(req, res) {
  const result = await req.model.get(req.params.id);
  res.send(result);
}

async function createOne(req, res) {
  const result = await req.model.create(req.body);
  res.send(result);
}

async function updateOneById(req, res) {
  const result = await req.model.update(req.params.id, req.body);
  res.send(result);
}

async function deleteOneById(req, res) {
  const result = await req.model.delete(req.params.id);
  res.send(result);
}

module.exports = router;
