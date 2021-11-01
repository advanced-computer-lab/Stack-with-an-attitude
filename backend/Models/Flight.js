const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flightSchema = new Schema ({
    flightNumber: {
        type: Number
    },
    departureTime: {
        type: Number
    },
    arrivalTime: {
        type: Number
    },
    date: {
        type: Date
    },
    economySeats: {
        type: Number
    },
    businessSeats: {
        type: Number
    },
    airport: {
        type: String
    }
}, {timestamps:true})

module.exports = Flight = mongoose.model('Flight',flightSchema)
