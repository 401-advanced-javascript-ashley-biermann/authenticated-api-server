'use strict';

/**
 * Logger Middleware
 * @module logger - Adds timestamp, path, and method to requests
 */

module.exports = (req, res, next) => {
  console.log('__REQUEST__: ' + `${req.timeStamp}` + ` ${req.path}` + ` ${req.method}`);
  next();
}