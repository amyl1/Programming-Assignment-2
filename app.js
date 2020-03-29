const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
var fs = require('fs')
var posts = require('./posts.json')
var accounts = require('./accounts.json')
app.use(express.static('client'))

app.get('/pic', function (request, response) {
  const name = request.query.name
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].User === name) {
      const pic = accounts[i].pic
      response.send(pic)
    }
  }
})
// used in the viewpost function
app.get('/post', function (request, response) {
  const title = request.query.title
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title === title) {
      response.send(posts[i])
    }
  }
})
app.post('/newaccount', function (request, response) {
  const user = request.body.User
  const pic = request.body.pic
  accounts.push({ User: user, pic: pic })
  const json = JSON.stringify(accounts)
  fs.writeFile('accounts.json', json, 'utf8', console.log)
  response.send('Success')
})
app.post('/comment', function (request, response) {
  const comment = request.body.Comment
  const title = request.body.title
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title.toLowerCase() === title) {
      console.log(comment)
      console.log(title)
      posts[i].comments.push(comment)
      const json = JSON.stringify(posts)
      fs.writeFile('posts.json', json, 'utf8', console.log)
    }
  }
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
  const keyword = request.query.keyword
  var matching = []
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].title.toLowerCase().includes(keyword.toLowerCase())) {
      matching.push(posts[i])
    }
  }
  response.send(matching)
})

app.post('/newpost', (request, res) => {
  const title = request.body.title
  const image = request.body.image
  console.log(title + image)
  const newPost = {
    title: title,
    image: image,
    comments: []
  }
  posts.push(newPost)
  const json = JSON.stringify(posts)
  fs.writeFile('posts.json', json, 'utf8', console.log)
  res.send('Success')
})

module.exports = app
