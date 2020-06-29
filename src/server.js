'use strict';

/**
 * Express Server
 * @module express server
 */

// DEPENDENCIES
const express = require('express');
const v1 = require('../src/v1');
const router = require('../src/auth/router');
const routerSecret = require('../src/extra-routes');
const cors = require('cors');
const timeStamp = require('../src/auth/middleware/timestamp');
const logger = require('../src/auth/middleware/logger');
const error404 = require('../src/auth/middleware/404');
const error500 = require('../src/auth/middleware/500');

const app = express();

// SERVER MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(timeStamp);
app.use(logger);

// ROUTERS
app.get('/', (req, res) => {
  res.send('Welcome to my API, use these routes please: <br> api/v1/categories <br> api/v1/products');
});
app.use('/api/v1', v1);
app.use('/', router);
app.use('/', routerSecret);

app.use('*', error404);
app.use(error500);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Server is up on PORT: ' + port);
    });
  }
}