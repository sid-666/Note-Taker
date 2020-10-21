const app = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 6969

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
// api paths
app.get('/api/notes', function(req, res){
    fs.readFile("db.json", "utf8", function(error,data){
        const notesJSON = JSON.parse(data)
        // notesJSON.array.forEach(element => {
        //     notesarray.push(element)
        // });
        res.json(notesJSON)
    })
})
app.post('/api/notes', function(req, res){
    fs.readFile("db.json", "utf8", function(error,data){
        const notesJSON = JSON.parse(data)
        notesJSON.push(req.body)
        fs.writeFile("db.json", JSON.stringify(notesJSON))
        res.json(notesJSON)
    }) 
})
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
