const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema ({
    reservationNumber: {
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
    reservedFlightIDs: {
        type: Array,
        required: true
    },
    reservedUserID: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    assignedSeats: {
        type: Array,
        required: true
    },
    price: {
        type : Number, 
        required: true,
    },
    numberOfAdults: {
        type : Number,
    },
    numberOfChildren: {
        type : Number,
    },
    
}, {timestamps:true})

const Reservation = mongoose.model('Reservation',reservationSchema);
module.exports = Reservation;    
