const request = require('supertest')
const server = require('../api/server.js')

describe('server', () => {
    // http calls made with supertest return promises, we can use async/await if desired
    describe('index route', () => {
      
      it('should return an OK status code from the index route', async () => {
        const expectedStatusCode = 200;
  
        // do a get request to our api (server.js) and inspect the response
        const response = await request(server).get('/');
  
        expect(response.status).toEqual(expectedStatusCode);
  
        // same test using promise .then() instead of async/await
        // let response;
        // return request(server).get('/').then(res => {
        //   response = res;
  
        //   expect(response.status).toEqual(expectedStatusCode);
        // })
      });
      it('should return a JSON object from the index route', async () => {
        const expectedBody = { api: 'up' };
  
        const response = await request(server).get('/');
  
        expect(response.body).toEqual(expectedBody);
      });

      it('should return a status 201 when registering a user', async () => {
        const name = Math.random().toString()
        const res = await request(server).post('/api/auth/register').send({username: name, password: 'password'})
  
        expect(res.status).toEqual(201);
      })
      it('should return a status 500 when registering if a username is not given', async () => {
        const res = await request(server).post('/api/auth/register').send({password: 'q'})
  
        expect(res.status).toEqual(500);
      })
      it('should return a status 200 when logging in a user', async () => {
        const res = await request(server).post('/api/auth/login').send({username: 'ISAIAH4', password: 'FLAX'})
  
        expect(res.status).toEqual(200);
      })
      it('should return a status 500 when logging in if a username is not given', async () => {
        const res = await request(server).post('/api/auth/login').send({password: 'q'})
  
        expect(res.status).toEqual(500);
      })
      it('should return 401 if there is no authorization', async () => {
        const res = await request(server).get('/api/jokes')
  
        expect(res.status).toEqual(401);
      })
      it('should return 401 if there is no authorization', async () => {
        const res = await request(server).get('/api/jokes')
  
        expect(res.status).toEqual(401);
      })
    })
})