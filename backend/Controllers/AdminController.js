const Flight = require('../Models/Flight');

exports.searchFlight = async function(req,res) {

    let flight = {};

    const query = req.query;

    if(query.flightNumber){
        flight.flightNumber = query.flightNumber; 
    }
    if(query.departureTime){
        flight.departureTime = query.departureTime; 
    }
    if(query.arrivalTime){
        flight.arrivalTime = query.arrivalTime;
    }
    if(query.from){
        flight.from = query.from; 
    }
    if(query.to){
        flight.to = query.to;
    }
    
     await Flight.find(flight)
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.send({statusCode : err.status, message : err.message})
                console.log(err.status)})
}

exports.getAllFlights = async function(req,res) {

    await Flight.find({})
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.send({statusCode : err.status, message : err.message})
                console.log(err.status)})

    // then send it to FE.
}

exports.getFlightById = async function(req,res) {

    let ID = req.params.getID

    await Flight.findById(ID)
    .then( (flights) => {
        res.status(200)
        res.json(flights)
    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

// router.get("/:getID", (req, res) =>

// Create FLight
exports.newFlight = async function(req,res) {

    let newFlight = new Flight(req.body.flight);
    await newFlight.save()
        .then( (flight) => {
            res.status(200)
            res.json(flight)
        })
        .catch( (err) => {
            // if(err.name === "ValidationError") {
            //     let errors = {};
          
            //     Object.keys(err.errors).forEach((key) => {
            //       errors[key] = err.errors[key].message;
            //     });
          
            //     return res.status(400).send(errors);
            //   }
            if (err.name === "MongoServerError"){
                return res.status(400).send({statusCode : 400, message : "duplicate key error"})
            }

            res.status(400).send({statusCode : 400, message : err.message})
            res.status(404).send({statusCode : 404, message : err.message})
            res.status(500).send({statusCode : 500, message : err.message})
            console.log(400)})
}


// router.post("/", (req, res) => {


// Update Flight
exports.updateFlightById = async function(req,res) {

    let ID = req.params.updateID;

    await Flight.findByIdAndUpdate(ID, req.body.flight, {new: true, runValidators: true})
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            if (err.name === "ValidationError") {
                let errors = {};
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message;
                });
          
                return res.status(400).send(errors);
              }
              if (err.name === "MongoServerError"){
                return res.send({statusCode : err.status, message : "duplicate key error"})
            }

            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
}

// router.put("/:updateID", (req, res) => {

// Delete Flight
exports.deleteFlightById = async function(req,res) {

    let ID = req.params.deleteID;

    await Flight.findByIdAndDelete(ID)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
}


// router.delete("/:deleteID", (req, res) => {
