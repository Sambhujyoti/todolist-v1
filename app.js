const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
let newItems = ["Morning get up", "Ready for office", "Catch bus"];
let anotherItems = [];

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    let day = today.toLocaleDateString("en-GB", options);
    res.render("list", {listTitle: day, listItems: newItems});
});

app.post("/", (req, res) => {
    let newEntry = req.body.newTask;
    if (req.body.button === "Work") {
        anotherItems.push(newEntry);
        res.redirect("/work");
    } else {
        newItems.push(newEntry);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", listItems: anotherItems});
});

app.listen(port, () =>{
    console.log("The app is running at " + port);
});