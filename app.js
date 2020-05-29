//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const categories  = ['Adults','Animals','Art','Career','Celebration','Children','Cold','Confidence','Controversy','Criticism','Current Events','Education','Emotions','Fall','Family','Favorite','Fiction','Finish/Fill in the blank','Food','Friends','Happy','Hate','Health','History','Hobby','Holiday','Home','Hot','How-To','Indoor','Law','Literature','Love','Memories','Mental Health','Money','Motivation/Inspiration','Music','Nature','Non-Fiction','Opinion','Outdoor','People','Political','Pop Culture','Recreation','Religion','Religion','Sad','Self','Sports','Spring','Summer','Task','Technology','Time','Vacation','Vintage','Warm','Winter'];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
res.render("home", {topicCategories: categories});

}); 









app.listen(process.env.PORT || 3000, function(req, res){
	console.log("Connected to port 3000!");

});