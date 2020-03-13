'use strict';

const request = require('supertest');
const app = require('./app.js');
describe('Test all functionality', () => {
    test('GET / all succeeds', () => {
        return request(app)
	    .get('/all')
	    .expect(200);
    })
    test('GET / all returns JSON', () => {
        return request(app)
	    .get('/all')
	    .expect('Content-type', /json/);
    })
});