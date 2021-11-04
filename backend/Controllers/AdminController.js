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

    const flightResults = await Flight.find({}).exec();

    res.status(200).send(flightResults);

    // then send it to FE.
}