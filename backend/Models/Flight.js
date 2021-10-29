const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema ({
    flightNum : Number,
    depTime : Number,
    arrTime : Number,
    date : Date,
    economySeats :  Number,
    businessSeats : Number,
    airport : String
    }, {timestamps:true});

const Flight = mongoose.model('Flight',flightSchema);
module.exports = Flight;    