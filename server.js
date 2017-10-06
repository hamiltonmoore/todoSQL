const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 8000;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
const models = require("./models");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    models.todos.findAll().then(function (foundTodos) {
        res.render("home", { todo: foundTodos });
    });
});

app.post("/complete/:task", (req, res) => {
    let reqTask = req.params.task;
    models.todos.update({ completed: true },
        { where: { task: reqTask } }).then(function () {
            res.redirect("/");
        })
});

app.post("/todo", (req, res) => {
    const todo = models.todos.build(
        {
            task: req.body.task,
            completed: false
        });
    todo.save().then(function () {
        return res.redirect("/");
    });
});

//delete all
app.post("/deleteallcompleted", (req, res) => {
    models.todos.destroy({
        where: {
            completed: true
        }
    }).then(function () {
        return res.redirect("/");
    })
});

//delete an individual task
app.post("/deleteindividual/:task", (req, res) => {
    let reqTask = req.params.task;
    models.todos.destroy({
        where: {
            task: reqTask
        }
    }).then(function () {
        return res.redirect("/");
    })
});

//this is to update a task
app.post("/edit/:task", (req, res) => {
    let reqTask = req.params.task;
    models.todos.update({
        task: req.body.task
    }, {
            where: {
                task: reqTask
            }
        }).then(function () {
            res.redirect("/");
        })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
