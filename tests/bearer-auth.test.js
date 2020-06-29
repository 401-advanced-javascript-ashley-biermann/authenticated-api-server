'use strict';

/**Bearer Auth middleware Test
 * @module bearer-auth.test
 */

require('dotenv').config();
const supergoose = require('cf-supergoose');
const server = require('../src/server');
// const basicAuth = require('../src/auth/middleware/basic');

const mockRequest = supergoose.server(server.server);

const consoleSpy = jest.spyOn(global.console, 'log');

beforeAll(() => {
  supergoose.startDB();
})
afterAll(() => {
  supergoose.stopDB();
})