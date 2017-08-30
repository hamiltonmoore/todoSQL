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
const models = require("./models");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render('home', { todo: data.todo, markoff: data.markoff });  //the key matches whats in mustache
});

// app.get("/", function (req, res) {
//     res.render('home', { todo: data.markoff });  //the key matches whats in mustache
// });

// app.post("/todo", function (req, res) {
//     let newTodo = req.body;
//     newTodo.completed = false;
//     data.todo.push(newTodo);
//     console.log('req.body: ', req.body);
//     console.log("postroute::", data);
//     return res.redirect('/');
// })

// app.post("/complete", function (req, res) {
//     let completeTodo = req.body;
//     completeTodo.markoff = true;
//     data.markoff.push(completeTodo);
//     console.log('req.body: ', req.body);
//     console.log("postroute::", data);
//     return res.redirect('/');
// })

//sequelize

models.todos.findOne().then(function (todos) {
    console.log(todos);
})

const todo = models.todos.build(
    {
        task: req.body.task,
        completed: false
    });

todo.save().then(function (todo) {
    console.log('name is: ', newPerson.name, ' zip = ', newPerson.zip);
});

//ending sequelization //begin routes 

app.get("/", (req, res) => {
    res.render("todo", { todo: data.todo, markoff: data.markoff });
});

app.post("/complete/:name", (req, res) => {
    let task = req.params.task;
    let index = data.todo.findIndex(function (item) { return item.task === task });
    let targetTodo = data.todo[index];
    targetTodo.completed = !targetTodo.completed;
    data.markoff.push(targetTodo);
    data.todo.splice(index, 1);
    console.log('todos: ', data.todo, data.markoff);
    return res.redirect("/");
});

app.post("/todo", (req, res) => {
    let newTodo = req.body;
    newTodo.completed = false;
    data.todo.push(newTodo);
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//req and res must be in that order 
//