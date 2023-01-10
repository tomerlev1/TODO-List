const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];

app.set('view engine', 'ejs'); //set the ejs engine

app.use(bodyParser.urlencoded({extended: true})); //use body-parser model
app.use(express.static("public"));

app.get('/', function(req, res) { //getting request from client

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const day = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, newListItems: items}); //render response to client
});

app.post("/", function(req, res) { //on post action what happens
  const item = req.body.newItem;

  items.push(item);

  res.redirect("/"); //redirect to the home page and execute the get again
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});