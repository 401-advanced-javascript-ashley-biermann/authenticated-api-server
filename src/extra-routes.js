'use strict';

/**
 * Router for Protected Routes
 * @module routerSecret Routes protected by bearerAuth and permissions
 * Routes from '/'
 */
const express = require('express');
const routerSecret = express.Router();

//ROUTER MIDDLEWARE - route specific, not for all routes
const bearerAuth = require('../src/auth/middleware/bearer');
const permissions = require('../src/auth/middleware/acl');

routerSecret.get('/secret', bearerAuth, (req, res) => {
  res.send('in the secret route, no permissions needed');
});

routerSecret.get('/read', bearerAuth, permissions('read'),(req, res) => {
  res.send('Route GET /read - permission granted');
});

routerSecret.post('/add', bearerAuth, permissions('create'),(req, res) => {
  res.send('Route POST /add - permission granted');
});

routerSecret.put('/change', bearerAuth, permissions('update'),(req, res) => {
  res.send('Route PUT /change - permission granted');
});

routerSecret.delete('/remove', bearerAuth, permissions('delete'),(req, res) => {
  res.send('Route DELETE /remove - permission granted');
});

module.exports = routerSecret;