// Search
var upload = document.getElementById('upload')
upload.addEventListener('click', async function (event) {
        event.preventDefault()
        const uploadDiv = document.getElementById('upload_div')
        const title = document.createElement('h2')
        const node = document.createTextNode("Upload New Post")
        title.appendChild(node)
        const form = document.createElement('form')
        form.setAttribute('action', 'http://127.0.0.1:8090/newpost')
        form.setAttribute('method', 'post')
        const in1=document.createElement("input")
        in1.setAttribute('name','title')
        in1.setAttribute('type','text')
        in1.setAttribute('placeholder','Post Title')
        in1.setAttribute('class','form-control')
        const in2=document.createElement("input")
        in2.setAttribute('name','Description')
        in2.setAttribute('type','text')
        in2.setAttribute('placeholder','Enter a Description')
        in2.setAttribute('class','form-control')
        const in3=document.createElement("input")
        in3.setAttribute('name','image')
        in3.setAttribute('type','text')
        in3.setAttribute('placeholder','Image URL')
        in3.setAttribute('class','form-control')
        const button=document.createElement('button')
        button.innerHTML='Post'
        form.append(in1)
        form.append(in2)
        form.append(in3)
        form.append(button)
        uploadDiv.appendChild(title)
        uploadDiv.append(form)
        

      })
// Search
var form = document.getElementById('search_form')
form.addEventListener('submit', async function (event) {
  event.preventDefault()
  const keyword = document.getElementById('search_keyword').value
  const response = await fetch('http://127.0.0.1:8090/search?keyword=' + keyword)
  const body = await response.text()
  const results = JSON.parse(body)
  const resultsDiv = document.getElementById('search_results')
  results.innerHTML = body

  for (const result of results) {
    const para = document.createElement('p')
    const node = document.createTextNode(result.des)
    para.appendChild(node)
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    resultsDiv.append(img)
    resultsDiv.appendChild(para)
  }
})
//Generate all
var all = document.getElementById('all')
all.addEventListener('click', async function (event) {
  event.preventDefault()
  const response = await fetch('http://127.0.0.1:8090/all')
  const body = await response.text()
  const results = JSON.parse(body)

  const resultsDiv = document.getElementById('search_results')

  results.innerHTML = body

  for (const result of results) {
    var para = document.createElement('p')
    var node = document.createTextNode(result.des)
    para.appendChild(node)
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    resultsDiv.append(img)
    resultsDiv.appendChild(para)
  }
})
