function clearAll () {
  const resultsDiv = document.getElementById('search_results')
  resultsDiv.innerHTML = ''
  const upload = document.getElementById('upload_div')
  upload.innerHTML = ''
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
    div1.setAttribute('class', 'col-md-4')
    const div2 = document.createElement('div')
    div2.setAttribute('class', 'card mb-4 box-shadow')
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    const div3 = document.createElement('div')
    div3.setAttribute('class', 'card body')
    const para = document.createElement('p')
    const node = document.createTextNode(result.des)
    para.appendChild(node)
    const div4 = document.createElement('div')
    div4.setAttribute('class', 'd-flex justify-content-between align-items-center')
    const div5 = document.createElement('div')
    div5.setAttribute('class', 'btn_group')
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
    div1.append(div2)
    div2.append(img)
    div2.append(div3)
    div3.append(para)
    div3.append(div4)
    div4.append(div5)
    div5.append(bt1)
    div5.append(bt2)
    div5.append(bt3)
  }
}

// when loaded, show all posts
window.addEventListener('load', async function (event) {
  const list=document.getElementById('account_list')
  const response = await fetch('http://127.0.0.1:8090/accounts')
  const body = await response.text()
  const results = JSON.parse(body)
  results.innerHTML = body
  for (const result of results) {
    item=document.createElement('li')
    link=document.createElement('a')
    link.setAttribute('href','http://127.0.0.1:8090/user?username=' + result.title)
    link.innerHTML=result.title
    item.append(link)
    list.append(item)
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
  in1.setAttribute('type', 'text')
  in1.setAttribute('placeholder', 'Post Title')
  in1.setAttribute('class', 'form-control')
  const in2 = document.createElement('input')
  in2.setAttribute('name', 'Description')
  in2.setAttribute('type', 'text')
  in2.setAttribute('placeholder', 'Enter a Description')
  in2.setAttribute('class', 'form-control')
  const in3 = document.createElement('input')
  in3.setAttribute('name', 'image')
  in3.setAttribute('type', 'text')
  in3.setAttribute('placeholder', 'Image URL')
  in3.setAttribute('class', 'form-control')
  const button = document.createElement('button')
  button.innerHTML = 'Post'
  form.append(in1)
  form.append(in2)
  form.append(in3)
  form.append(button)
  uploadDiv.appendChild(title)
  uploadDiv.append(form)
  event.preventDefault()
  const uploadForm = document.getElementById('newupload')
  uploadForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    clearAll()
    const successDiv = document.getElementById('success_div')
    successDiv.innerHTML = 'Post Successful'
  })
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