const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;
let newItems = ["Morning get up", "Ready for office", "Catch bus"];
let anotherItems = [];
let holiTasks = [];

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    let day = date.getDate();
    res.render("list", {listTitle: day, listItems: newItems});
});

app.post("/", (req, res) => {
    let newEntry = req.body.newTask;
    if (req.body.button === "Work") {
        anotherItems.push(newEntry);
        res.redirect("/work");
    } else if (req.body.button === "Holidays") {
        holiTasks.push(newEntry);
        res.redirect("/holidays");
    } else {
        newItems.push(newEntry);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", listItems: anotherItems});
});

app.get("/holidays", (req, res) => {
    res.render("list", {listTitle: "Holidays", listItems: holiTasks});
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.listen(port, () =>{
    console.log("The app is running at " + port);
});