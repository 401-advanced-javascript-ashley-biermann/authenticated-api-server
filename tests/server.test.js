'use strict';

/**
 * Tests Server
 * @module server.test
 */
require('dotenv').config();
const supergoose = require('cf-supergoose');
const server = require('../src/server');

const mockRequest = supergoose.server(server.server); // think of this as a fake server, like localhost:3000, like swagger

jest.spyOn(global.console, 'log');

beforeAll(() => {
  supergoose.startDB();
})
afterAll(() => {
  supergoose.stopDB();
})

describe('Testing server', () => {
  it('Should add a product to the db', (done) => {
    let user1 = { username: 'testUser1', password: 'test', role: 'admin' };
    return mockRequest.post('/signup').send(user1)
    .then(results => {
      let token = results.headers.token;
      let newProduct = { category: 'fakeCat1', name: 'balloon', display_name: 'displayname', description: 'description' };
    return mockRequest.post('/api/v1/products').set('Authorization', `bearer ${token}`)
      .send(newProduct) // .send is like the { json } that you'd send in the body
      .then(results => {
        expect(results.body.name).toEqual('balloon');
        done();
      })
      .catch(err => console.log(err));
    });
  });
});