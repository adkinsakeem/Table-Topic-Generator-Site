//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");

const app = express();

const categories  = ['Adults','Animals','Art','Career','Celebration','Children','Cold','Confidence','Controversy','Criticism','Current Events','Education','Emotions','Fall','Family','Favorite','Fiction','Finish/Fill in the blank','Food','Friends','Happy','Hate','Health','History','Hobby','Holiday','Home','Hot','How-To','Indoor','Law','Literature','Love','Memories','Mental Health','Money','Motivation/Inspiration','Music','Nature','Non-Fiction','Opinion','Outdoor','People','Political','Pop Culture','Recreation','Religion','Religion','Sad','Self','Sports','Spring','Summer','Task','Technology','Time','Vacation','Vintage','Warm','Winter'];
let ttJSON;
let resultsCount;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
	res.render("home", {topicCategories: categories});

}); 

app.post("/", function(req, res){
	var checkedBoxes = [];
	var checkedJSON = req.body;
	var TTArray = [];
	var tableTopicsAPI = "https://toastmasterstabletopicsapi.herokuapp.com/randomTopic?count=";
	resultsCount = req.body.tableTopicNumberSpinner;
	for(var x=0;x<categories.length;x++){
		if(checkedJSON[categories[x]] === "on"){
			checkedBoxes.push(categories[x]);
		}
	}
	tableTopicsAPI += req.body.tableTopicNumberSpinner;
	for(var y=0;y<checkedBoxes.length;y++){
		tableTopicsAPI+="&category1="+checkedBoxes[y];
	}

	https.get(tableTopicsAPI, function(response){

		response.on("data", function(data){
			ttJSON = (JSON.parse(data).Topics);
			res.redirect("/results");

		});


	});

});

app.get("/results", function(req, res){
	if(ttJSON == undefined){
		res.render("error");
	}else{
		res.render("results", {TTArrayList: ttJSON, ttCounter: resultsCount});
	}
});




app.listen(process.env.PORT || 3000, function(req, res){
	console.log("Connected to port 3000!");

});