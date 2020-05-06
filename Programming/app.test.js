'use strict';

const request = require('supertest');
const app = require('./app.js');
describe('Test /post to return details of post', () => {
    test('GET /post succeeds', () => {
        return request(app)
	    .get('/post?title=Whitby')
	    .expect(200);
    });
    test('GET /post returns correct post details', () => {
        return request(app)
	    .get('/post?title=Whitby')
	    .expect(/Whitby/);
    });
    test('GET /post returns JSON', () => {
        return request(app)
	    .get('/post?title=Whitby')
	    .expect('Content-type', /json/);
    });
});

describe('Test /pic to return URL of profile picture', () => {
    test('GET /pic succeeds', () => {
        return request(app)
	    .get('/pic?name=User 2')
	    .expect(200);
    });
    test('GET /pic returns correct URL', () => {
        return request(app)
	    .get('/pic?name=User 2')
	    .expect(/img.pngio.com/);
    });
});

describe('Test /newaccount to create a new user account', () => {
test('POST /newaccount works', () => {
    const params = {
        User: 'Test User',
        pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    };

    return request(app)
    .post('/newaccount')
        .send(params)
        .expect(200);
});

test('POST /newaccount adds an account which can be accessed via GET', async () => {
    const params = {
        User: 'Test User',
        pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    };

    await request(app)
    .post('/newaccount')
        .send(params);
    return request(app)
        .get('/searchUser?name=Test User')
        .expect(/Test User/);
});
});

describe('Test /comment adds a new comment', () => {
test('POST /comment successfully adds a comment', () => {
    const params = {
        title: 'Whitby',
        comment: 'Test comment'
    };

    return request(app)
    .post('/comment')
        .send(params)
        .expect(200);
});
});

describe('Test /delete works', () => {
    test('POST /delete authentication works', () => {
        const params = {
            title: 'Murano, Venice',
            loggedin: 'User 4'
        };

        return request(app)
        .post('/delete')
            .send(params)
            .expect(403);
    });
});

describe('Test get all posts', () => {
    test('GET / all succeeds', () => {
        return request(app)
	    .get('/all')
	    .expect(200);
    });
    test('GET / all returns JSON', () => {
        return request(app)
	    .get('/all')
	    .expect('Content-type', /json/);
    });
});

describe('Test get all accounts', () => {
    test('GET / accounts succeeds', () => {
        return request(app)
	    .get('/accounts')
	    .expect(200);
    });
    test('GET / accounts returns JSON', () => {
        return request(app)
	    .get('/accounts')
	    .expect('Content-type', /json/);
    });
});

describe('Test search post functionality', () => {
    test('GET / search succeeds', () => {
        return request(app)
	    .get('/search?keyword=Rome')
	    .expect(200);
    });
    test('GET /search returns JSON', () => {
        return request(app)
	    .get('/search?keyword=Rome')
	    .expect('Content-type', /json/);
    });
    test('GET /search returns correct results', () => {
        return request(app)
	    .get('/search?keyword=Whitby')
	    .expect(/Whitby/);
    });
});

describe('Test search user functionality', () => {
    test('GET /searchUser succeeds', () => {
        return request(app)
	    .get('/searchUser?name=User 5')
	    .expect(200);
    });
    test('GET /searchUser returns JSON', () => {
        return request(app)
	    .get('/searchUser?name=User 5')
	    .expect('Content-type', /json/);
    });
    test('GET /searchUser returns correct results', () => {
        return request(app)
	    .get('/searchUser?name=User 5')
	    .expect(/User 5/);
    });
});

describe('Tests upload new post', () => {
// this test will fail if the test is run multiple times.
// This is due to the authentication preventing multiple posts with the same title.
test('POST /newpost works', () => {
        const params = {
            user: 'Test User',
            title: 'Test Post',
            des: 'Post added by testing',
            image: 'https://i.imgur.com/hAV6F86.jpg'
        };

        return request(app)
        .post('/newpost')
            .send(params)
            .expect(200);
    });
test('POST /newpost authentication works', () => {
    const params = {
        user: 'Test User',
        title: 'Whitby',
        des: 'Post added by testing',
        image: 'https://i.imgur.com/hAV6F86.jpg'
    };

    return request(app)
    .post('/newpost')
        .send(params)
        .expect(403);
});

test('POST /newpost adds a post which can be accessed via GET', async () => {
    const params = {
        user: 'Test User',
        title: 'New test post 2',
        des: 'Post added by testing',
        image: 'https://i.imgur.com/hAV6F86.jpg'
    };

    await request(app)
    .post('/newpost')
        .send(params);
    return request(app)
        .get('/search?keyword=New test post 2')
        .expect(/New test post 2/);
});
});

describe('Test /viewProfile to return details of a profile', () => {
    test('GET /viewProfile succeeds', () => {
        return request(app)
	    .get('/viewProfile?name=User 5')
	    .expect(200);
    });
    test('GET /post returns correct post details', () => {
        return request(app)
	    .get('/viewProfile?name=User 5')
	    .expect(/User 5/);
    });
    test('GET /post returns JSON', () => {
        return request(app)
	    .get('/viewProfile?name=User 5')
	    .expect('Content-type', /json/);
    });
});
