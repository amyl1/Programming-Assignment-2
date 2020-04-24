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
    const form = document.getElementById('form')
    form.innerHTML = ''
    const post = document.getElementById('post')
    post.innerHTML = ''
    const comment = document.getElementById('comment')
    comment.innerHTML = ''
    comment.setAttribute('class', 'row')
    const button = document.getElementById('button')
    button.innerHTML = ''
    button.setAttribute('class', 'row')
    const jumbo = document.getElementById('jumbo')
    jumbo.innerHTML = ''
  }
  // when user account is selected, put id and pic in nav bar. When logged in, show all posts
  async function userlogin () {
    clearAll()
    const response = await fetch('http://127.0.0.1:8090/accounts')
    const body = await response.text()
    const results = JSON.parse(body)
    results.innerHTML = body
    const div = document.getElementById('intro')
  
    for (const result of results) {
      const div4 = document.createElement('div')
      div4.setAttribute('class', "'col-sm-12 col-md-6 col-lg-4 col-xl-3'")
      const div5 = document.createElement('div')
      div5.setAttribute('class', 'card mb-4 box-shadow bg-secondary text-white')
      const item = document.createElement('h5')
      const image = document.createElement('img')
      item.setAttribute('id', result.User)
      item.setAttribute('align', 'center')
      item.innerHTML = result.User
      image.setAttribute('src', result.pic)
      image.setAttribute('height', '120px')
      image.setAttribute('width', '120px')
      image.setAttribute('align', 'middle')
      image.setAttribute('class', 'rounded-circle')
      const centre = document.createElement('center')
      centre.append(image)
      div5.append(centre)
      div5.append(item)
      div5.onclick = function () {
        var name = item.id
        login(name)
      }
      div4.append(div5)
      div.append(div4)
    }
    const buttondiv = document.getElementById('button')
    const button = document.createElement('button')
    button.innerHTML = 'Create New Account'
    button.setAttribute('id', 'new_account')
    button.setAttribute('class', 'btn btn-outline-primary btn-block')
    buttondiv.append(button)
    button.onclick = async function () {
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
      const label1 = document.createElement('label')
      label1.setAttribute('for', 'User')
      label1.innerHTML = 'Enter Your Username:'
      const in2 = document.createElement('input')
      in2.setAttribute('id', 'pic')
      in2.setAttribute('name', 'pic')
      in2.setAttribute('type', 'text')
      in2.setAttribute('placeholder', 'URL for your profile picture')
      in2.setAttribute('class', 'form-control')
      const label2 = document.createElement('label')
      label2.setAttribute('for', 'pic')
      label2.innerHTML = 'Enter the URL of your profile picture:'
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
        event.preventDefault()
        const User = document.getElementById('User').value
        const pic = document.getElementById('pic').value
        const data = { User: User, pic: pic }
        clearAll()
        fetch('http://127.0.0.1:8090/newaccount'
          , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
          })
        userlogin()
      })
    }
  }
  async function login (name) {
    const login = document.getElementById('user')
    const pic = document.createElement('img')
    const response = await fetch('http://127.0.0.1:8090/pic?name=' + name)
    const body = await response.text()
    pic.setAttribute('src', body)
    pic.setAttribute('height', 40)
    login.append(pic)
    const namediv = document.getElementById('name')
    const para = document.createElement('p')
    para.setAttribute('id', 'username')
    para.innerHTML = name
    namediv.append(para)
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
        const h = document.createElement('h4')
        h.innerHTML = 'Title: ' + result.title
        const img = document.createElement('img')
        img.setAttribute('src', result.image)
        img.setAttribute('alt', result.title)
        img.setAttribute('height', '200')
        const p = document.createElement('p')
        p.innerHTML = result.des
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
        const small = document.createElement('small')
        small.setAttribute('class', 'text-muted')
        small.innerHTML = result.user
        div1.append(h)
        div1.append(img)
        div1.append(p)
        div1.append(bt1)
        div1.append(bt2)
        div1.append(bt3)
        div1.append(small)
        const heading = document.createElement('h5')
        heading.innerHTML = 'Comments:'
        div1.append(heading)
        const comments = result.comments
        if (comments.length === 0) {
          const message = document.createElement('p')
          message.innerHTML = 'No comments yet'
          div1.append(message)
        } else {
          for (const comment in comments) {
            const p = document.createElement('p')
            const node = document.createTextNode(comments[comment])
            p.append(node)
            div1.append(p)
          }
        }
        resultsDiv.append(div1)
      }
    } catch (error) {
      handleError(error)
    }
  }
  // When view post button is clicked, load post full screen
  async function viewpost (title) {
    clearAll()
    const resultsDiv = document.getElementById('post')
    const response = await fetch('http://127.0.0.1:8090/post?title=' + title)
    const body = await response.text()
    const result = JSON.parse(body)
    result.innerHTML = body
    const div1 = document.createElement('div')
    const img = document.createElement('img')
    img.setAttribute('src', result.image)
    img.setAttribute('alt', result.title)
    img.setAttribute('class', 'img-fluid rounded border border-dark')
    img.setAttribute('align', 'middle')
    const centre = document.createElement('center')
    centre.append(img)
    const div2 = document.createElement('div')
    div2.setAttribute('class', 'card-body')
    const div3 = document.createElement('div')
    div3.setAttribute('class', 'card-text')
    const postTitle = document.createElement('h3')
    postTitle.setAttribute('class', 'text-primary')
    postTitle.innerHTML = 'Post Title: ' + result.title
    const heading1 = document.createElement('h4')
    heading1.innerHTML = 'Description:'
    heading1.setAttribute('class', 'text-primary')
    const para = document.createElement('p')
    para.innerHTML = result.des
    const bt1 = document.createElement('button')
    bt1.setAttribute('id', result.title)
    bt1.setAttribute('class', 'btn btn-secondary border border-light')
    bt1.onclick = function () {
      var title = bt1.id
      comment(title)
    }
    bt1.innerHTML = 'Comment'
    const bt2 = document.createElement('button')
    bt2.innerHTML = 'Delete Post'
    bt2.setAttribute('id', result.title)
    bt2.setAttribute('class', 'btn btn-secondary border border-light')
    bt2.onclick = function () {
      var title = bt2.id
      deletepost(title)
    }
    div1.append(postTitle)
    div1.append(centre)
    div3.append(heading1)
    div3.append(para)
  
    const heading2 = document.createElement('h4')
    heading2.innerHTML = 'Comments:'
    heading2.setAttribute('class', 'text-primary')
    div3.append(heading2)
    const comments = result.comments
    if (comments.length === 0) {
      const message = document.createElement('p')
      message.innerHTML = 'No comments yet'
      div3.append(message)
    } else {
      for (const comment in comments) {
        const p = document.createElement('p')
        const node = document.createTextNode(comments[comment])
        p.append(node)
        div3.append(p)
      }
    }
    const centre2 = document.createElement('center')
    centre2.append(bt1)
    centre2.append(bt2)
    div3.append(centre2)
  
    div2.append(div3)
    div1.append(div2)
    resultsDiv.append(div1)
  }
  // Allows the user to comment
  async function comment (title) {
    try {
      clearAll()
      const div = document.getElementById('comment')
      div.setAttribute('class', 'jumbotron')
      const form = document.createElement('form')
      form.setAttribute('method', 'post')
      form.setAttribute('action', 'http://127.0.0.1:8090/comment')
      const h = document.createElement('h3')
      h.setAttribute('align', 'justify')
      h.innerHTML = 'Enter your comment:'
      const input = document.createElement('input')
      input.setAttribute('id', 'new_comment')
      input.setAttribute('type', 'text')
      input.setAttribute('placeholder', 'Comment')
      input.setAttribute('class', 'form-control')
      const button = document.createElement('button')
      button.innerHTML = 'Post'
      button.setAttribute('type', 'submit')
      button.setAttribute('class', 'btn btn-primary btn-block')
      form.append(input)
      form.append(button)
      div.append(h)
      div.append(form)
      form.addEventListener('submit', async function (event) {
        event.preventDefault()
        const comment = document.getElementById('new_comment').value
        const data = { comment: comment, title: title }
        fetch('http://127.0.0.1:8090/comment'
          , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
          })
        clearAll()
        const main = document.getElementById('jumbo')
        const div = document.createElement('div')
        div.setAttribute('class', 'jumbotron')
        const heading = document.createElement('h1')
        heading.setAttribute('align', 'center')
        heading.innerHTML = 'Comment Successful'
        const text = document.createElement('p')
        text.setAttribute('class', 'lead')
        text.setAttribute('align', 'center')
        text.innerHTML = 'Your comment has been successfully posted.'
        const button2 = document.createElement('button')
        button2.setAttribute('type', 'button')
        button2.setAttribute('class', 'btn btn-primary btn-block')
        button2.innerHTML = 'Return to show all posts'
        button2.addEventListener('click', async function (event) {
          event.preventDefault()
          const response = await fetch('http://127.0.0.1:8090/all')
          const body = await response.text()
          const results = JSON.parse(body)
          results.innerHTML = body
          genAlbum(results)
        })
        div.append(heading)
        div.append(text)
        div.append(button2)
        main.append(div)
      })
    } catch (error) {
      handleError(error)
    }
  }
  // finish this
  async function deletepost (error, title) {
    try {
      clearAll()
      const loggedin = document.getElementById('username').textContent
      const data = { title: title, loggedin: loggedin }
      const response = await fetch('http://127.0.0.1:8090/delete'
        , {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify(data)
        })
      if (response.ok) {
        const successDiv = document.getElementById('success_div')
        successDiv.innerHTML = 'Successfully Deleted'
      } else {
        handleError(error)
      }
    } catch (error) {
      handleError(error)
    }
  }
  // when loaded, show accounts and allow user to create new account
  window.addEventListener('load', async function (event) {
    try {
      userlogin()
    } catch (error) {
      handleError(error)
    }
  })
  var navLogin = document.getElementById('login')
  navLogin.addEventListener('click', async function (event) {
    try {
      userlogin()
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
          resultsDiv.setAttribute('class', 'jumbotron')
          const message = document.createElement('h4')
          message.setAttribute('align', 'center')
          message.innerHTML = 'No matching posts'
          const button = document.createElement('button')
          button.setAttribute('type', 'button')
          button.setAttribute('class', 'btn btn-primary btn-block')
          button.innerHTML = 'Return to show all posts'
          resultsDiv.append(message)
          resultsDiv.append(button)
          button.addEventListener('click', async function (event) {
            event.preventDefault()
            const response = await fetch('http://127.0.0.1:8090/all')
            const body = await response.text()
            const results = JSON.parse(body)
            results.innerHTML = body
            genAlbum(results)
          })
        } else {
          genAlbum(results)
        }
      } else {
        const resultsDiv = document.getElementById('search_results')
        resultsDiv.setAttribute('class', 'jumbotron')
        const message = document.createElement('h4')
        message.setAttribute('align', 'center')
        message.innerHTML = 'No Search Term Entered'
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.setAttribute('class', 'btn btn-primary btn-block')
        button.innerHTML = 'Return to show all posts'
        resultsDiv.append(message)
        resultsDiv.append(button)
        button.addEventListener('click', async function (event) {
          event.preventDefault()
          const response = await fetch('http://127.0.0.1:8090/all')
          const body = await response.text()
          const results = JSON.parse(body)
          results.innerHTML = body
          genAlbum(results)
        })
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
      const h = document.createElement('h2')
      h.innerHTML = 'Upload New Post'
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
      const l1 = document.createElement('label')
      l1.setAttribute('for', 'title')
      l1.innerHTML = 'Post Title:'
      const in2 = document.createElement('input')
      in2.setAttribute('name', 'image')
      in2.setAttribute('id', 'image')
      in2.setAttribute('type', 'text')
      in2.setAttribute('placeholder', 'Image URL')
      in2.setAttribute('class', 'form-control')
      const l2 = document.createElement('label')
      l2.setAttribute('for', 'image')
      l2.innerHTML = 'The URL of your image:'
      const in3 = document.createElement('input')
      in3.setAttribute('name', 'des')
      in3.setAttribute('id', 'des')
      in3.setAttribute('type', 'text')
      in3.setAttribute('placeholder', 'Description')
      in3.setAttribute('class', 'form-control')
      const l3 = document.createElement('label')
      l3.setAttribute('for', 'des')
      l3.innerHTML = 'Post Description:'
      const button = document.createElement('button')
      button.setAttribute('type', 'submit')
      button.setAttribute('class', 'btn btn-primary btn-block')
      button.innerHTML = 'Post'
      form.append(l1)
      form.append(in1)
      form.append(l2)
      form.append(in2)
      form.append(l3)
      form.append(in3)
      form.append(button)
      uploadDiv.appendChild(h)
      uploadDiv.append(form)
      const uploadForm = document.getElementById('newupload')
      uploadForm.addEventListener('submit', async function (event) {
        event.preventDefault()
        const user = document.getElementById('user').value
        console.log(user)
        const title = document.getElementById('title').value
        const image = document.getElementById('image').value
        const username = document.getElementById('username').textContent
        const des = document.getElementById('des').value
        const data = { user: username, title: title, image: image, des: des }
        clearAll()
        fetch('http://127.0.0.1:8090/newpost'
          , {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data)
          })
        const main = document.getElementById('jumbo')
        const div = document.createElement('div')
        div.setAttribute('class', 'jumbotron')
        const heading = document.createElement('h1')
        heading.setAttribute('align', 'center')
        heading.innerHTML = 'Post Successful'
        const text = document.createElement('p')
        text.setAttribute('class', 'lead')
        text.setAttribute('align', 'center')
        text.innerHTML = 'Your post has been successfully uploaded.'
        const button2 = document.createElement('button')
        button2.setAttribute('type', 'button')
        button2.setAttribute('class', 'btn btn-primary btn-block')
        button2.innerHTML = 'Return to show all posts'
        button2.addEventListener('click', async function (event) {
          event.preventDefault()
          const response = await fetch('http://127.0.0.1:8090/all')
          const body = await response.text()
          const results = JSON.parse(body)
          results.innerHTML = body
          genAlbum(results)
        })
        div.append(heading)
        div.append(text)
        div.append(button2)
        main.append(div)
      })
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  })
  