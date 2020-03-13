const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
var fs = require('fs')
var posts = require('./posts.json')
var accounts = require('./accounts.json')

app.use(express.static('client'))
// allows user to upload a new post
app.post('/newpost', function (request, response) {
  const title = request.body.title
  const image = request.body.image
  const newPost = {
    title: title,
    image: image,
    comments: []
  }
  posts.push(newPost)
  const json = JSON.stringify(posts)
  fs.writeFile('posts.json', json, 'utf8', console.log)
  response.send('Success')
})

app.post('/newaccount', function (request, response) {
  const user = request.body.User
  accounts.push({ User: user })
  console.log(accounts)
  const json = JSON.stringify(accounts)
  fs.writeFile('accounts.json', json, 'utf8', console.log)
  response.send('Success')
})

// displays all posts
app.get('/all', function (req, resp) {
  resp.send(posts)
})
app.get('/accounts', function (req, resp) {
  resp.send(accounts)
})
app.get('/user', function (req, resp) {
  resp.send(accounts)
})
// searches for posts
app.get('/search', function (request, response) {
    const keyword = request.query.keyword;
    var matching = [];
      for(let i = 0; i<posts.length; i++){
        if(posts[i].title.toLowerCase().includes(keyword.toLowerCase())){
            matching.push(posts[i]);
        }
    }
    response.send(matching);


});

module.exports = app
