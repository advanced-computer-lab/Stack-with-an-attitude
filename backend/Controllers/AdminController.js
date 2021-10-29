const Flight = require('../Models/Flight');

exports.searchFlight = async function(req,res) {

    const flight = req.body.flight;
    
     const flightResults = await Flight.find(
                {flightNum : flight.flightNum,
                 depTime : flight.depTime,
                 arrTime : flight.arrTime,
                 date : flight.date,
                 airport : flight.airport}).exec();

    // then send it to FE.
}

exports.getAllFlights = async function(req,res) {

    const flightResults = await Flight.find({});

    // then send it to FE.
}