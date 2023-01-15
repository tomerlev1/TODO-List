
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs'); //set the ejs engine

app.use(bodyParser.urlencoded({extended: true})); //use body-parser model
app.use(express.static("public"));

app.get('/', function(req, res) { //getting request from client
  const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items}); //render response to client
});

app.post("/", function(req, res) { //on post action what happens
  const item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "Work List") {
    workItems.push(item);

    res.redirect("/work");
  } else {
    items.push(item);

    res.redirect("/"); //redirect to the home page and execute the get again
  }

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);

  res.redirect("/work");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});