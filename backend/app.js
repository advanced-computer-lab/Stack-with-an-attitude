const express = require("express");
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()

const app = express();
const port = process.env.PORT || "8000";
const MongoURI =  config.get('mongoURI');

app.use(bodyParser.json())
  
 //Model Imports
const test = require('./Models/Test');
//const admin = require('./Models/Admin');
//const flight = require('./Models/Flights');


// Controller Imports
//const adminController = require('./Controllers/AdminController');


mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(port, () => {console.log(`Listening to requests on http://localhost:${port}`);});



app.get("/Object", (req, res) => {
    res.status(200).send('hello')
});

//add to testDB/tests
app.post("/Object", (req, res) => {
    let name = req.body.name
    let age = req.body.age
    var newTest = new test({
        'name': name,
        'age': age
    })

    newTest.save()
        .then(res.status(200).send('data inserted successfully'))
        .catch(err => console.log(err))
        
});

//trying to update something (does not work)
app.put("/Object/:updateID", (req, res) => {
    var ID = req.params.updateID
    let name = req.body.name
    let age = req.body.age
    test.findByIdAndUpdate(ID, {name, age})
        .then(objects => res.json(objects))
        .catch(err => console.log(err))
});
