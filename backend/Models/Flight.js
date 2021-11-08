const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema ({
    flightNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            message: "Characters and Digits Only",
            validator: (input) => {
                pattern = /^[a-z0-9]*$/i
                return pattern.test(input)
            }
        }
    },
    departureDate: {
        type : String, 
        required: true,
    },
    arrivalDate: {
        type : String,
        required: true,
    },
    departureTime: {
        type : String, 
       required: true,
   },
   arrivalTime: {
       type : String,
       required: true,
   },
    economySeats: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    businessSeats: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    from: {
        type: String,
        required: true,
        validate: {
            message: "Characters Only",
            validator: (input) => {
                pattern = /^[a-z]*$/i
                return pattern.test(input)
            }
        }
    },
    to: {
        type: String,
        required: true,
        validate: {
            message: "Characters Only",
            validator: (input) => {
                pattern = /^[a-z]*$/i
                return pattern.test(input)
            }
        }
    }
}, {timestamps:true})

const Flight = mongoose.model('Flight',flightSchema);
module.exports = Flight;    
