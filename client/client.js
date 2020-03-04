/* when the form is submitted */
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
    var para = document.createElement('p')
    var node = document.createTextNode(result.title)
    para.appendChild(node)
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    resultsDiv.append(img)
    resultsDiv.appendChild(para)
  }
})

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
    var node = document.createTextNode(result.title)
    para.appendChild(node)
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    resultsDiv.append(img)
    resultsDiv.appendChild(para)
  }
})
