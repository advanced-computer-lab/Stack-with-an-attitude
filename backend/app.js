const express = require("express");
const mongoose = require('mongoose');
const config = require('config');
const { MongoClient } = require('mongodb');
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
    newTest.save((error, data)=>{
        if(error)
            console.log(error);
        else{
            res.status(200).send('data inserted successfully')
        }
    })
});

//trying to update something (does not work)
app.put("/Object/:updateID", (req, res) => {
    var ID = req.params.updateID
    var object = req.body.object
    object = _.extend(object, req.body)
    test.findByIdAndUpdate(ID, (err,data)=>{
        if(err)
            console.log(err);
        else{
            if(data)
                res.status(200).send(`flight with id ${ID} has been updated`);
            else{
                res.status(200).send('flight not found');
            }
        }
    })
});
