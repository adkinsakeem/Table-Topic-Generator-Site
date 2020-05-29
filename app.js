//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

let posts = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
res.render("home", {postsInput: posts});

}); 









app.listen(process.env.PORT || 3000, function(req, res){
	console.log("Connected to port 3000!");

});