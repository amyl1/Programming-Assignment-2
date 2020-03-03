/* when the form is submitted */
var form = document.getElementById('search_form');
form.addEventListener('submit', async function(event){
    event.preventDefault();

    /* extract searh term from form */

    let keyword = document.getElementById('search_keyword').value
    
    /* send get request */

    let response = await fetch('http://127.0.0.1:8090/search?keyword=' + keyword);

    let body = await response.text();
    let results = JSON.parse(body);

    let resultsDiv = document.getElementById('search_results');
    
    results.innerHTML = body;

        for(let result of results){
            var para = document.createElement("p");
            var node = document.createTextNode(result.title);
            para.appendChild(node);
            let img = document.createElement("img");
            img.setAttribute('src', result.image);
            img.setAttribute('alt', result.title);
            resultsDiv.append(img);
            resultsDiv.appendChild(para);
        }

});

var all = document.getElementById('all');
all.addEventListener('onclick', async function(event){
    alert("Hello");
    /*
    event.preventDefault();
    let response = await fetch('http://127.0.0.1:8090/all');
    let body = await response.text();
    let results = JSON.parse(body);

    let resultsDiv = document.getElementById('search_results');
    
    results.innerHTML = body;

        for(let result of results){
            var para = document.createElement("p");
            var node = document.createTextNode(result.title);
            para.appendChild(node);
            let img = document.createElement("img");
            img.setAttribute('src', result.image);
            img.setAttribute('alt', result.title);
            resultsDiv.append(img);
            resultsDiv.appendChild(para);
        }
*/
});