const Flight = require('../Models/Flight');

exports.searchFlight = async function(req,res) {

    let flight = {};

    const query = req.query;

    if(query.flightNumber){
        flight.flightNumber = query.flightNumber; 
    }
    if(query.departureTime){
        flight.departureTime = parseInt(query.departureTime); 
    }
    if(query.arrivalTime){
        flight.arrivalTime = parseInt(query.arrivalTime); 
    }
    if(query.airport){
        flight.airport = query.airport; 
    }
    // date condition missing!!!



    console.log(req.query);
    console.log(flight);
    
    const flightResults = await Flight.find(flight).exec();

    res.status(200).send(flightResults);
    // then send it to FE.
}

exports.getAllFlights = async function(req,res) {

    await Flight.find({})
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.status(404)
                console.log(err)})

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
        res.status(404)
        console.log(err)})
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
            if(err.name === "ValidationError") {
                let errors = {};
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message;
                });
          
                return res.status(400).send(errors);
              }

            res.status(500).send(err.name)
            console.log(err.message)})
}


// router.post("/", (req, res) => {


// Update Flight
exports.updateFlightById = async function(req,res) {

    let ID = req.params.updateID;

    await Flight.findByIdAndUpdate(ID, req.body.flight, {new: true})
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

            res.status(500).send(err.name)
            console.log(err.message)})
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
            res.status(404)
            console.log(err)})
}


// router.delete("/:deleteID", (req, res) => {
