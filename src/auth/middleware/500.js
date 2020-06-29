'use strict';

/**
 * 500 Error Handler
 * @module 500
 * @param {req} request
 * @returns {string} Error 500 response
 */


module.exports = (req, res) => {
  console.log('__ERROR!__: 500');
  res.status(500).send('Internal Server Error');
}
