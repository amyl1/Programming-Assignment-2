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
        let a = document.createElement("a");
        a.setAttribute('href', result.href);
        
        let img = document.createElement("img");
        img.setAttribute('src', result.thumbnail);
        img.setAttribute('alt', result.title);
        a.append(img);
        resultsDiv.append(a);
    }

    /* amend page with results */
//    alert(body);
});