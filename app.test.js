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
describe('Test search functionality', () => {
    test('GET / search succeeds', () => {
        return request(app)
	    .get('/search?keyword=')
	    .expect(200);
    })
    test('GET /search returns JSON', () => {
        return request(app)
	    .get('/search?keyword=')
	    .expect('Content-type', /json/);
    })
});