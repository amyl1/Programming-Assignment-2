const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
var fs = require('fs')

var posts = require('./posts.json')


app.use(express.static('client'))

//allows user to upload a new post
app.post('/newpost', function (request, response) {
  const title = request.body.title
  const des = request.body.des
  const image = request.body.image
  const newPost = {
    title: title,
    des: des,
    image: image
  }
  posts.push(newPost)
  const json = JSON.stringify(posts)
  fs.writeFile('posts.json', json, 'utf8', console.log)
  response.send('Success')
})

//displays all posts
app.get('/all', function (req, resp) {
  resp.send(posts)
})

//searches for posts
app.get('/search', function (request, response) {
  const keyword = request.query.keyword
  var matching = []
  //checks if keyword exists
  if (keyword) {
    //checks against titles of all posts
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].title.toLowerCase().includes(keyword.toLowerCase())) {
        matching.push(posts[i])
      }
    }
    //checks if matching post list is empty
    if (matching && matching.length) {
        matching=matching
    } 
    //if empty, return message
    else {
      matching = 'No Posts Found'
    }
  } 
  //if no keyword found
  else {
    matching = 'no search term'
  }
  response.send(matching)
})

//allows user to create account
app.post('/newaccount', function (request, response) {
  const username = request.body.username
  const password = request.body.password
  const newAccount = {
    username: username,
    password: password,
  }

  console.log(newAccount)
  
  posts.push(newAccount)
  const json = JSON.stringify(posts)
  fs.writeFile('posts.json', json, 'utf8', console.log)
  
  response.send('Success')
})



app.listen(8090)
