const express = require("express");
const fs = require("fs");
const { Server } = require("http");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const PORT = process.env.PORT || 5500
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// let notesarray = [];
// html routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get('/notes', function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// api paths
app.get('/api/notes', function (req, res) {
    // const notesJSON = [1, 2, 3, 4];
    fs.readFile("db/db.json", "utf8", function (error, data) {
        const notesJSON = JSON.parse(data)
        return res.json(notesJSON)
    })
    // console.log(res.json({ test: "Hello" }))
    // return res.json({ test: "Hello" })
})
app.post('/api/notes', function (req, res) {
    fs.readFile("db/db.json", "utf8", function (error, data) {
        const notesJSON = JSON.parse(data)
        notesJSON.push(req.body)
        notesJSON.forEach((element, index) => {
            element.id = uuidv4()
        });
        fs.writeFile("db/db.json", JSON.stringify(notesJSON), function (err) {
            if (err) throw err
            console.log(err)
        })
        console.log(notesJSON)
        res.json(notesJSON)
    })
})
app.delete("/api/notes/:id", function (req, res) {
    const item = req.params.id
    fs.readFile("db/db.json", "utf8", function (error, data) {
        const notesJSON = JSON.parse(data)
        const found = notesJSON.find(element => element.id === item)
        if (!found) {
            res.status(400).json({ msg: `No member with id of ${req.params.id}` });
        } else {
            const revised = notesJSON.filter(todo => todo.id !== req.params.id);
            fs.writeFile("db/db.json", JSON.stringify(revised), function (err) {
                if (err) throw err
                console.log(err)
            })
            console.log(revised)
            res.json(revised)
        }

    })
})
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
