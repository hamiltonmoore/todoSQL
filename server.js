const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const data = require("./data.js");
const port = process.env.PORT || 8000;
const app = express();

let user; // I don't have a DB so I'm just making a global var.

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render('home', { todo: data.todo, markoff: data.markoff });  //the key matches whats in mustache
});

// app.get("/", function (req, res) {
//     res.render('home', { todo: data.markoff });  //the key matches whats in mustache
// });

app.post("/todo", function (req, res) {
    let newTodo = req.body;
    newTodo.completed = false;
    data.todo.push(newTodo);
    console.log('req.body: ', req.body);
    console.log("postroute::", data);
    return res.redirect('/');
})

app.post("/complete", function (req, res) {
    let completeTodo = req.body;
    completeTodo.markoff = true;
    data.markoff.push(completeTodo);
    console.log('req.body: ', req.body);
    console.log("postroute::", data);
    return res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//req and res must be in that order 
//