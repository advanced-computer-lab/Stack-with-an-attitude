const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const reservedflightSchema = new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },

    flightnumber:{
        type:Number

    },

    isreserved:{
        type:Boolean,
        default:false
    },

    price:{
        type:Number
    }


});

const reservedflight = mongoose.model('reservedflight', reservedflightSchema);
module.exports = reservedflight;