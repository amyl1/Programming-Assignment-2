'use strict';

const request = require('supertest');
const app = require('./app.js');
describe('Test get all posts', () => {
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

test('POST /newpost works', () => {
    const params = {
        user:"Test User",
        title: "New test post",
        des: "Post added by testing",
        image: "https://i.imgur.com/hAV6F86.jpg"
    }
    
    return request(app)
    .post('/newpost')
        .send(params)
        .expect(200);
});

test('POST /newpost adds a post which can be accessed via GET', async () => {
    const params = {
        user:"Test User",
        title: "New test post 2",
        des: "Post added by testing",
        image: "https://i.imgur.com/hAV6F86.jpg"
    }
    
    await request(app)
    .post('/newpost')
        .send(params)
    return request(app)
        .get('/search?keyword=New test post 2')
        .expect('Content-type', /json/);
});