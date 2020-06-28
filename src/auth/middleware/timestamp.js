
'use strict';

/**
 * Timestamp Middleware
 * @module timeStamp 
 * @function timeStamp Provides timeStamp for logger module
 * @next
 */

const timeStamp = function (req, res, next) {
  const d = new Date(Date.now());
  req.timeStamp = d;
  next();
}

module.exports = timeStamp;