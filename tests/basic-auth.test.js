'use strict';

/**
 * Basic Authorization Middleware Test
 * @module basic auth
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

// describe('Testing basic auth middleware', () => {
//   it('Should', (done) => {
//     let user1 = { username: 'testUser1', password: 'test', role: 'admin' };
//     mockRequest.post('/signup').send(user1)

//     expect(consoleSpy).toBe('');
//     expect(next).toHaveBeenCalledWith();
//   });
// });
