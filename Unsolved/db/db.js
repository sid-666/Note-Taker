const app = require("express");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notesarray = [];
// html routes
app.get('/notes', function(req, res){
    res.sendfile(path.join(__dirname, "notes.html"));
});
app.get('*', function(req, res){
    res.sendfile(path.join(__dirname, "index.html"));
});
