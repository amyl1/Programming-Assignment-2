// complete this
function handleError (error) {
  alert(error)
}
// empties all divs so that page is cleared before new items are generated
function clearAll () {
  const resultsDiv = document.getElementById('search_results')
  resultsDiv.innerHTML = ''
  const upload = document.getElementById('upload_div')
  upload.innerHTML = ''
  const intro = document.getElementById('intro')
  intro.innerHTML = ''
  const successDiv = document.getElementById('success_div')
  successDiv.innerHTML = ''
}
// when user account is selected, put id and pic in nav bar. When logged in, show all posts
async function login (name) {
  const login = document.getElementById('user')
  const pic = document.getElementById('user_pic')
  login.innerHTML = 'Current User: ' + name
  const response = await fetch('http://127.0.0.1:8090/pic?name=' + name)
  const body = await response.text()
  pic.setAttribute('src', body)
  clearAll()
  const response2 = await fetch('http://127.0.0.1:8090/all')
  const body2 = await response2.text()
  const results = JSON.parse(body2)
  results.innerHTML = body2
  genAlbum(results)
}
// creates items for each post in posts.json
function genAlbum (results) {
  try {
    clearAll()
    const resultsDiv = document.getElementById('search_results')
    for (const result of results) {
      const div1 = document.createElement('div')
      div1.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4 col-xl-3')
      const img = document.createElement('img')
      img.setAttribute('src', result.image)
      img.setAttribute('alt', result.title)
      img.setAttribute('height', '200')
      const para = document.createElement('p')
      const node = document.createTextNode(result.title)
      para.appendChild(node)
      const bt1 = document.createElement('button')
      bt1.innerHTML = 'View Post'
      bt1.setAttribute('id', result.title)
      bt1.onclick = function () {
        var title = bt1.id
        viewpost(title)
      }
      const bt2 = document.createElement('button')
      bt2.setAttribute('id', result.title)
      bt2.onclick = function () {
        var title = bt1.id
        comment(title)
      }
      bt2.innerHTML = 'Comment'
      const bt3 = document.createElement('button')
      bt3.innerHTML = 'Delete Post'
      bt3.setAttribute('id', result.title)
      bt3.onclick = function () {
        var title = bt3.id
        deletepost(title)
      }
      div1.append(img)
      div1.append(para)
      div1.append(bt1)
      div1.append(bt2)
      div1.append(bt3)
      const heading = document.createElement('h4')
      heading.innerHTML = 'Comments:'
      div1.append(heading)
      const comments = result.comments
      for (const comment in comments) {
        const p = document.createElement('p')
        const node = document.createTextNode(comments[comment])
        p.append(node)
        div1.append(p)
      }
      resultsDiv.append(div1)
    }
  } catch (error) {
    handleError(error)
  }
}
// style this
// When view post button is clicked, load post full screen
async function viewpost (title) {
  clearAll()
  const resultsDiv = document.getElementById('search_results')
  const response = await fetch('http://127.0.0.1:8090/post?title=' + title)
  const body = await response.text()
  const result = JSON.parse(body)
  result.innerHTML = body
  const div1 = document.createElement('div')
  const img = document.createElement('img')
  img.setAttribute('src', result.image)
  img.setAttribute('alt', result.title)
  const para = document.createElement('p')
  const node = document.createTextNode(result.title)
  para.appendChild(node)
  const bt1 = document.createElement('button')
  bt1.setAttribute('id', result.title)
  bt1.onclick = function () {
    var title = bt1.id
    comment(title)
  }
  bt1.innerHTML = 'Comment'
  const bt2 = document.createElement('button')
  bt2.innerHTML = 'Delete Post'
  bt2.setAttribute('id', result.title)
  bt2.onclick = function () {
    var title = bt2.id
    deletepost(title)
  }
  div1.append(img)
  div1.append(para)
  div1.append(bt1)
  div1.append(bt2)
  const heading = document.createElement('h4')
  heading.innerHTML = 'Comments:'
  div1.append(heading)
  const comments = result.comments
  for (const comment in comments) {
    const p = document.createElement('p')
    const node = document.createTextNode(comments[comment])
    p.append(node)
    div1.append(p)
  }
  resultsDiv.append(div1)
}
// finish this,állows user to put a new comment on an existing post
function comment (title) {
  clearAll()
  const div = document.getElementById('search_results')
  const form = document.createElement('form')
  form.setAttribute('method', 'post')
  form.setAttribute('action', 'http://127.0.0.1:8090/comment')
  const input = document.createElement('input')
  input.setAttribute('id', 'Comment')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'Comment')
  input.setAttribute('class', 'form-control')
  const button = document.createElement('button')
  button.innerHTML = 'Post'
  form.append(input)
  form.append(button)
  div.append(form)
  form.addEventListener('submit', async function (event) {
    try {
      event.preventDefault()
      clearAll()
      // how to pass title into this
      const response = await fetch('http://127.0.0.1:8090/comment')
      console.log(response)
      const successDiv = document.getElementById('success_div')
      successDiv.innerHTML = 'Comment Submitted'
    } catch (error) {
      handleError(error)
    }
  })
}
// finish this
function deletepost (title) {
  clearAll()
  const loggedin = document.getElementById('user').value
  alert(loggedin)
}
// when loaded, show accounts and allow user to create new account
window.addEventListener('load', async function (event) {
  try {
    const response = await fetch('http://127.0.0.1:8090/accounts')
    const body = await response.text()
    const results = JSON.parse(body)
    results.innerHTML = body
    const div = document.getElementById('intro')

    for (const result of results) {
      const div4 = document.createElement('div')
      div4.setAttribute('class', "'col-sm-12 col-md-6 col-lg-4 col-xl-3'")
      const item = document.createElement('p')
      const image = document.createElement('img')
      item.setAttribute('id', result.User)
      item.innerHTML = result.User
      image.setAttribute('src', result.pic)
      image.setAttribute('height', '100px')
      image.setAttribute('width', '100px')
      div4.append(image)
      div4.append(item)
      div4.onclick = function () {
        var name = item.id
        login(name)
      }
      div.append(div4)
    }
    const button = document.createElement('button')
    button.innerHTML = 'Create New Account'
    button.setAttribute('id', 'new_account')
    div.append(button)
    button.onclick = function () {
      event.preventDefault()
      clearAll()
      const uploadDiv = document.getElementById('upload_div')
      const title = document.createElement('h2')
      const node = document.createTextNode('Create New Account')
      title.appendChild(node)
      const form = document.createElement('form')
      form.setAttribute('action', 'http://127.0.0.1:8090/newaccount')
      form.setAttribute('method', 'post')
      form.setAttribute('id', 'newaccount')
      const button = document.createElement('button')
      button.innerHTML = 'Create Account'
      const in1 = document.createElement('input')
      in1.setAttribute('id', 'User')
      in1.setAttribute('name', 'User')
      in1.setAttribute('type', 'text')
      in1.setAttribute('placeholder', 'Enter Your Username')
      in1.setAttribute('class', 'form-control')
      const label1=document.createElement('label')
      label1.setAttribute('for','User')
      label1.innerHTML="Enter Your Username:"
      const in2 = document.createElement('input')
      in2.setAttribute('id', 'pic')
      in2.setAttribute('name', 'pic')
      in2.setAttribute('type', 'text')
      in2.setAttribute('placeholder', 'URL for your profile picture')
      in2.setAttribute('class', 'form-control')
      const label2=document.createElement('label')
      label2.setAttribute('for','pic')
      label2.innerHTML="Enter the URL of your profile picture:"
      const but2 = document.createElement('input')
      but2.innerHTML = 'Submit'
      but2.setAttribute('type', 'submit')
      form.append(label1)
      form.append(in1)
      form.append(label2)
      form.append(in2)
      form.append(button)
      uploadDiv.appendChild(title)
      uploadDiv.append(form)
      const newAccount = document.getElementById('newaccount')
      newAccount.addEventListener('submit', async function (event) {
        const response = await fetch('http://127.0.0.1:8090/newaccount')// needed
        // doesnt work
        const successDiv = document.getElementById('success_div')
        successDiv.innerHTML = 'Post Successful'
        clearAll()
        event.preventDefault()
      })
    }
  } catch (error) {
    handleError(error)
  }
})
// Search
var searchForm = document.getElementById('search')
searchForm.addEventListener('submit', async function (event) {
  try {
    event.preventDefault()
    clearAll()
    const keyword = document.getElementById('search_keyword').value
    if (keyword) {
      const response = await fetch('http://127.0.0.1:8090/search?keyword=' + keyword)
      const body = await response.text()
      const results = JSON.parse(body)
      results.innerHTML = body
      if (results === undefined || results.length === 0) {
        const resultsDiv = document.getElementById('search_results')
        const message = document.createElement('p')
        message.innerHTML = 'No matching posts'
        resultsDiv.append(message)
      } else {
        genAlbum(results)
      }
    } else {
      const resultsDiv = document.getElementById('search_results')
      const message = document.createElement('p')
      message.innerHTML = 'No search term entered'
      resultsDiv.append(message)
    }
  } catch (error) {
    handleError(error)
  }
})
// Generate all
var all = document.getElementById('all')
all.addEventListener('click', async function (event) {
  try {
    event.preventDefault()
    const response = await fetch('http://127.0.0.1:8090/all')
    const body = await response.text()
    const results = JSON.parse(body)
    results.innerHTML = body
    genAlbum(results)
  } catch (error) {
    handleError(error)
  }
})

// upload new post
var upload = document.getElementById('upload')
upload.addEventListener('click', async function (event) {
  try {
    event.preventDefault()
    clearAll()
    const uploadDiv = document.getElementById('upload_div')
    const title = document.createElement('h2')
    const node = document.createTextNode('Upload New Post')
    title.appendChild(node)
    const form = document.createElement('form')
    form.setAttribute('action', 'http://127.0.0.1:8090/newpost')
    form.setAttribute('method', 'post')
    form.setAttribute('id', 'newupload')
    const in1 = document.createElement('input')
    in1.setAttribute('name', 'title')
    in1.setAttribute('id', 'title')
    in1.setAttribute('type', 'text')
    in1.setAttribute('placeholder', 'Post Title')
    in1.setAttribute('class', 'form-control')
    const label1=document.createElement('label')
    label1.setAttribute('for','title')
    label1.innerHTML="Post Title:"
    const in2 = document.createElement('input')
    in2.setAttribute('name', 'image')
    in2.setAttribute('id', 'image')
    in2.setAttribute('type', 'text')
    in2.setAttribute('placeholder', 'Image URL')
    in2.setAttribute('class', 'form-control')
    const label2=document.createElement('label')
    label2.setAttribute('for','image')
    label2.innerHTML="The URL of your image:"
    const button = document.createElement('button')
    button.innerHTML = 'Post'
    form.append(label1)
    form.append(in1)
    form.append(label2)
    form.append(in2)
    form.append(button)
    uploadDiv.appendChild(title)
    uploadDiv.append(form)
    const uploadForm = document.getElementById('newupload')
    uploadForm.addEventListener('submit', async function (event) {
      const response = await fetch('http://127.0.0.1:8090/newpost')
      const successDiv = document.getElementById('success_div')
      successDiv.innerHTML = 'Post Successful'
    })
  } catch (error) {
    handleError(error)
  }
})

// when home is clicked, display all posts
var home = document.getElementById('home')
home.addEventListener('click', async function (event) {
  try {
    event.preventDefault()
    const response = await fetch('http://127.0.0.1:8090/all')
    const body = await response.text()
    const results = JSON.parse(body)
    results.innerHTML = body
    genAlbum(results)
  } catch (error) {
    handleError(error)
  }
})
