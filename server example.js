var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

var fs = require('fs');

var recipes = require("./recipes.json");



app.get("/", function (request, response){
    response.send(recipes);
});

app.post("/new", function (request, response){
    const title = request.body.title;
    const url = request.body.url;
    const newRecipe = {"title": title,
                       "href": url};
    recipes.push(newRecipe);
    const json = JSON.stringify(recipes);
    fs.writeFile('recipes.json', json, 'utf8', console.log);

    response.send(`Added recipe ${title} ${url}`);
});


app.get("/potatoes", function (request, response){
    const key = request.query.key;
    for(let i = 0; i<recipes.length; i++){
        if(recipes[i].title == key){
            response.send(recipes[i].href);
        }
    }
});

app.get("/search", function (request, response){
    const keyword = request.query.keyword;
    var matching = [];
    for(let i = 0; i<recipes.length; i++){
        if(recipes[i].title.toLowerCase().includes(keyword.toLowerCase())){
            matching.push(recipes[i]);
        }
    }
    response.send(matching);


});

app.listen(8090);
