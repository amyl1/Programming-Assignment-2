const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var fs = require('fs');
var posts = require('./posts.json');
var accounts = require('./accounts.json');
app.use(express.static('client'));

// sends the user's profile picture, which is then displayed in nav bar.
app.get('/pic', function (request, response) {
  const name = request.query.name;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].User === name) {
      const pic = accounts[i].pic;
      response.send(pic);
    }
  }
});

// used in the viewpost function, sends the details of the required posts

app.get('/post', function (request, response) {
  const title = request.query.title;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === title) {
      response.send(posts[i]);
    }
  }
});

// adds the new user account to the JSON file
app.post('/newaccount', function (request, response) {
  const user = request.body.User;
  const pic = request.body.pic;
  accounts.push({ User: user, pic: pic });
  const json = JSON.stringify(accounts);
  fs.writeFile('accounts.json', json, 'utf8', console.log);
  response.send('Success');
});

// adds a comment to the post on which the comment button was pressed

app.post('/comment', function (request, response) {
  const comment = request.body.comment;
  const title = request.body.title;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === title) {
      posts[i].comments.push(comment);
      const json = JSON.stringify(posts);
      fs.writeFile('posts.json', json, 'utf8', console.log);
    }
  }
  response.send('Success');
});
/*
*deletes the post on which the comment button was pressed
*authentication to ensure only deleteed if correct user is logged in
*/
app.post('/delete', function (request, res) {
  const loggedin = request.body.loggedin;
  const title = request.body.title;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === title) {
      const user = posts[i].user;
      if (user === loggedin) {
        posts.splice(i, 1);
        const json = JSON.stringify(posts);
        fs.writeFile('posts.json', json, 'utf8', console.log);
        res.status(200).send('Success');
      } else {
        res.status('403').send('You are not authorised to perform this action');
        throw Error('You are not authorised to perform this action');
      }
    }
  }
});

// displays all posts in the JSON file
app.get('/all', function (req, resp) {
  resp.send(posts);
});
// sends lists off all user accounts from the accounts.json file
app.get('/accounts', function (req, resp) {
  resp.send(accounts);
});

// searches for posts matching the keyword entered by the user in the search form
app.get('/search', function (request, response) {
  const keyword = request.query.keyword;
  var matching = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title.toLowerCase().includes(keyword.toLowerCase())) {
      matching.push(posts[i]);
    }
  }
  response.send(matching);
});
// searches for users matching the search term entered
app.get('/searchUser', function (request, response) {
  const name = request.query.name;
  var matching = [];
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].User.toLowerCase().includes(name.toLowerCase())) {
      matching.push(accounts[i]);
    }
  }
  response.send(matching);
});

// allows user to upload a new post
app.post('/newpost', (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const des = req.body.des;
  const user = req.body.user;
  for (let i = 0; i < posts.length; i++) {
    // authentication to ensure a post with the same title does not exist
    if (posts[i].title === title) {
      res.status(403).send('Post with this title already exists');
      throw Error('Post with this title already exists');
    }
}
// writes new post to JSON file
      const newPost = {
        user: user,
        title: title,
        des: des,
        image: image,
        comments: []
      };
      posts.push(newPost);
      const json = JSON.stringify(posts);
      fs.writeFile('posts.json', json, 'utf8', console.log);
      res.send('Success');
});
// returns all posts uploaded by a specific user
app.get('/viewProfile', function (request, response) {
  const name = request.query.name;
  var matching = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].user === name) {
      matching.push(posts[i]);
    }
  }
  response.send(matching);
});
module.exports = app;
