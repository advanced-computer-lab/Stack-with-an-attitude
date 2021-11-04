const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const config = require('config');
 
// Model Imports
const Admin = require('./models/Admin');
const Flight = require('./Models/Flight');

// Controller Imports
const adminController = require('./Controllers/AdminController');

const MongoURI =  config.get('mongoURI');

//App variables
const app = express();
const port = process.env.PORT || "8000";
app.use(bodyparser.urlencoded({extended : true}));

// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

//Routes
app.get('/searchFlights', adminController.searchFlight);

app.get('/allFlights', adminController.getAllFlights);



// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });