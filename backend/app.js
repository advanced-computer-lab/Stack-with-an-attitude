// Imports
const express = require("express")
const mongoose = require('mongoose')
const config = require('config')

// Configurations
const app = express()
const port = process.env.PORT || "8000"
const MongoURI =  config.get('mongoURI')

// Body Parser for Postman
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
app.use(bodyParser.json())

// Controller Imports
const adminController = require("./Controllers/AdminController")

// Route Imports
const Flights = require("./Routes/Flights")

// Use Routes
app.use("/flights", Flights)

// Database Connection
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// Server is Listening
app.listen(port, () => {console.log(`Listening to requests on http://localhost:${port}`)})


/*----------------------------------------------------------------------------------------------------*/
