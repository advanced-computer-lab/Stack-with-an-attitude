const Admin = require('../Models/Admin');



exports.home = (req,res)=>{
    res.send('<h1>hello</h1>')
}



exports.searchFlight = async function(req,res) {

    const flight = req.body.flight;
    
     const flightResults = await Flight.find(
                {flightNum : flight.flightNum,
                 depTime : flight.depTime,
                 arrTime : flight.arrTime,
                 date : flight.date,
                 airport : flight.airport}).exec();

}


exports.getAllFlights = async function(req,res) {

    const flightResults = await Flight.find({});

    // then send it to FE.
}