const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
let newItems = ["Morning get up", "Ready for office", "Catch bus"];

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
    res.render("list", {dayType: day, listItems: newItems});
});

app.post("/", (req, res) => {
    let newEntry = req.body.newTask;
    newItems.push(newEntry);
    res.redirect("/");  
});


app.listen(port, () =>{
    console.log("The app is running at " + port);
});