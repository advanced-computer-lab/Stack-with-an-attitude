const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const config = require('config');
 
// Controller Imports
const adminController = require('./Controllers/AdminController');



//App variables
const app = express();
const port = process.env.PORT || "8000";
app.use(bodyparser.urlencoded({extended : true}));

// configurations

const MongoURI =  config.get('mongoURI');

// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

//Routes
app.get('/searchFlights', adminController.searchFlight);

app.get('/allFlights', adminController.getAllFlights);

app.get('/getFlight:getID', adminController.getFlightById);

app.get('/updateFlight:updateID', adminController.updateFlightById);

app.get('/createFlight',adminController.newFlight);

app.get('/deleteFlight:deleteID',adminController.deleteFlightById);

// // Use Routes
// app.use("/flights", Flights)

// Database Connection
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// Server is Listening
app.listen(port, () => {console.log(`Listening to requests on http://localhost:${port}`)})

