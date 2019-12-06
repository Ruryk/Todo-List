//import express and body-parser
const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Routes which should handle request
// Add headers
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get("/orders", (req, res, next) => {
    res.json(readJSON());
});
// parameters sent with 
app.post('/add-element', function (req, res) {
    var itemText = req.body.itemText;
    var isCompleted = req.body.isCompleted;
    res.send(itemText + ' ' + isCompleted + ' ');
    res.json(writeJSON(itemText, isCompleted));
});

app.post('/update-element', function (req, res) {
    var itemText = req.body.itemText;
    var isCompleted = req.body.isCompleted;
    res.send(itemText + ' ' + isCompleted + ' ');
    res.json(rewriteJSON(itemText, isCompleted));
});

app.post('/delete-element', function (req, res) {
    // console.log(req);
    var itemText = req.body.itemText;
    res.send(itemText + ' ');
    res.json(deleteJSONItem(itemText));
});

function readJSON() {
    let rawdata = fs.readFileSync('myJSON.json');
    let package = JSON.parse(rawdata);
    return package;
};

function writeJSON(itemText, isCompleted) {
    let json = readJSON();
    this.itemText = itemText;
    this.isCompleted = isCompleted;
    let writeItem = { "itemText": itemText, "isCompleted": isCompleted };
    json.push(writeItem);
    let writedata = fs.writeFileSync('myJSON.json', JSON.stringify(json));
    let package = JSON.parse(writedata);
};

function rewriteJSON(itemText, isCompleted) {
    let json = readJSON();
    this.itemText = itemText;
    this.isCompleted = isCompleted;
    for (let i = 0; i < json.length; i++) {
        if (json[i].itemText == itemText) {
            json[i].isCompleted = isCompleted;
        } else { json[i].isCompleted = json[i].isCompleted };
    }
    let writedata = fs.writeFileSync('myJSON.json', JSON.stringify(json));
    let package = JSON.parse(writedata);
};

function deleteJSONItem(itemText) {
    let json = readJSON();
    this.itemText = itemText;
    for (let i = 0; i < json.length; i++) {
        console.log(json[i]);

        if (json[i].itemText == itemText) {
            console.log(json);
            json.splice(i, 1);
            console.log(json);
        };
        console.log(json);
        fs.writeFileSync('myJSON.json', JSON.stringify(json));
        let package = readJSON();
    }
};
//export app
module.exports = app;



