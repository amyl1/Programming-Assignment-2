function clearAll () {
  const resultsDiv = document.getElementById('search_results')
  resultsDiv.innerHTML = ''
  const upload = document.getElementById('upload_div')
  upload.innerHTML = ''
  const list = document.getElementById('account_list')
  list.innerHTML = ''
  const successDiv = document.getElementById('success_div')
  successDiv.innerHTML = ''
}
function viewpost (title) {
  clearAll()
  const resultsDiv = document.getElementById('search_results')
  resultsDiv.innerHTML = title
}
function comment (title) {
  clearAll()
}
function deletepost (title) {
  clearAll()
}
function genAlbum (results) {
  clearAll()
  const resultsDiv = document.getElementById('search_results')
  for (const result of results) {
    const div1 = document.createElement('div')
    div1.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4 col-xl-3')
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    const para = document.createElement('p')
    const node = document.createTextNode(result.description)
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
    resultsDiv.append(div1)
    div1.append(img)
    div1.append(para)
    div1.append(bt1)
    div1.append(bt2)
    div1.append(bt3)
  }
}

// when loaded, show all posts
window.addEventListener('load', async function (event) {
  const list = document.getElementById('account_list')
  const response = await fetch('http://127.0.0.1:8090/accounts')
  const body = await response.text()
  const results = JSON.parse(body)
  results.innerHTML = body
  for (const result of results) {
    const item = document.createElement('li')
    const link = document.createElement('a')
    link.setAttribute('href', 'http://127.0.0.1:8090/user?username=' + result.title)
    link.innerHTML = result.User
    item.append(link)
    list.append(item)
  }
  const button = document.createElement('button')
  button.innerHTML = 'Create New Account'
  button.setAttribute('id', 'new_account')
  list.append(button)
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
    form.append(in1)
    form.append(button)
    uploadDiv.appendChild(title)
    uploadDiv.append(form)
    const newAccount = document.getElementById('newaccount')
    newAccount.addEventListener('submit', async function (event) {
      const response = await fetch('http://127.0.0.1:8090/newaccount')// needed
      console.log(response)
      // doesnt work
      const successDiv = document.getElementById('success_div')
      successDiv.innerHTML = 'Post Successful'
      clearAll()
      event.preventDefault()
    })
  }
})
// Search
var form = document.getElementById('search_form')
form.addEventListener('submit', async function (event) {
  event.preventDefault()
  clearAll()
  const keyword = document.getElementById('search_keyword').value
  const response = await fetch('http://127.0.0.1:8090/search?keyword=' + keyword)
  const body = await response.text()
  const results = JSON.parse(body)
  results.innerHTML = body
  genAlbum(results)
})
// Generate all
var all = document.getElementById('all')
all.addEventListener('click', async function (event) {
  event.preventDefault()
  const response = await fetch('http://127.0.0.1:8090/all')
  const body = await response.text()
  const results = JSON.parse(body)
  results.innerHTML = body
  genAlbum(results)
})
var upload = document.getElementById('upload')
upload.addEventListener('click', async function (event) {
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
  const in2 = document.createElement('input')
  in2.setAttribute('name', 'image')
  in2.setAttribute('id', 'image')
  in2.setAttribute('type', 'text')
  in2.setAttribute('placeholder', 'Image URL')
  in2.setAttribute('class', 'form-control')
  const button = document.createElement('button')
  button.innerHTML = 'Post'
  form.append(in1)
  form.append(in2)
  form.append(button)
  uploadDiv.appendChild(title)
  uploadDiv.append(form)
  const uploadForm = document.getElementById('newupload')
  uploadForm.addEventListener('submit', async function (event) {
    const response = await fetch('http://127.0.0.1:8090/newpost')
  })
  const successDiv = document.getElementById('success_div')
  successDiv.innerHTML = 'Post Successful'
})

var home = document.getElementById('home')
home.addEventListener('click', async function (event) {
  event.preventDefault()
  const response = await fetch('http://127.0.0.1:8090/all')
  const body = await response.text()
  const results = JSON.parse(body)
  results.innerHTML = body
  genAlbum(results)
})
