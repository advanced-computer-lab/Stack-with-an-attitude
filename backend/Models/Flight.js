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
    totalSeats: {
        type: Number,
        required: true,
        default: ()=> {economySeats + businessSeats},
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
    },
    price: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    baggageAllowance: {
        type: Number,
        required: true,
        default: 2,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    reservedBusinessSeats: {
        type: Array,
        required: true,
        default: ()=> {
                        let seatsArray = [];
                        for (let i = 0; i < businessSeats; i++) {
                            seatsArray[i] = false; 
                        }
                        },
    },
    reservedEconomySeats: {
        type: Array,
        required: true,
        default: ()=> {
                        let seatsArray = [];
                        for (let i = 0; i < economySeats; i++) {
                            seatsArray[i] = false; 
                        }
                        },
    },
}, {timestamps:true})

const Flight = mongoose.model('Flight',flightSchema);
module.exports = Flight;    
