const User = require('../Models/User');
const Reservation = require('../Models/Reservation');
const Flight = require('../Models/Flight');

exports.reserveSelectedSeats = async function(req,res) {

    let ID = req.params.updateID;

    let reservedSeats = req.body;

    await Flight.findByIdAndUpdate(ID, reservedSeats, {new: true, runValidators: true})
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