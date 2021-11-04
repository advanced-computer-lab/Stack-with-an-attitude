const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flightSchema = new Schema ({
    flightNumber: {
        type: String,
        required: true,
        validate: {
            message: "Characters and Digits Only",
            validator: (input) => {
                pattern = /^[a-z0-9]*$/i
                return pattern.test(input)
            }
        }
    },
    departureTime: {
        type: Number,
        required: true
    },
    arrivalTime: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    economySeats: {
        type: Number,
        required: true
    },
    businessSeats: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
}, {timestamps:true})

module.exports = Flight = mongoose.model('Flight',flightSchema)
