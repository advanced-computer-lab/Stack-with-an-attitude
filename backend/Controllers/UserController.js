const User = require('../Models/User');
const Reservation = require('../Models/Reservation');
const Flight = require('../Models/Flight');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;

<<<<<<< Updated upstream
const nodemailer = require('nodemailer');
=======


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{

        user:'guccsen704@gmail.com',
        pass:'Hossam2021'
    }


});
const reserveSelectedSeats = async function(depID,returnID,assignedDepartureSeats,assignedReturnSeats,cabinclass) {
>>>>>>> Stashed changes


//create transporter for sender data
const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth: {
        user:"guccsen704@outlook.com",
        pass:"Hossam2021"
    }
});



exports.reserveSelectedSeats = async function(req,res) {

    let ID = req.params.id;

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

exports.getUserById = async function(req,res) {

  let ID = req.params.id;

  await User.findById(ID)
  .then( (user) => {
      res.status(200)
      res.json(user)
  })
  .catch( (err) => {
      res.send({statusCode : err.status, message : err.message})
      console.log(err.status)})
}

exports.updateUserById = async function(req,res) {

  let ID = req.params.id;

  await User.findByIdAndUpdate(ID, req.body.user, {new: true, runValidators: true})
      .then( (user) => {
          res.status(200)
          res.json(user)
      })
      .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

exports.getAllReservedSeats = async function(req,res) {


  Reservation.find()
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          //res.status(404)
          console.log(err)})

}

exports.getReservedFlightById = async function(req,res) {


  let ID = req.params.getID

  Reservation.findById(ID)
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          //res.status(404)
          console.log(err)})
}


// Create
exports.createReservedFlight = async function(req,res) {


  let newFlight = new Reservation(req.body.flight)

  newFlight.save()
      .then( (reservedflights) => {
          //res.status(200)
<<<<<<< Updated upstream
          res.json(reservedflights)
=======
         console.log('CREATED RESERVATION');
         res.send({statusCode: 200 , reservationNumber: reservedflights.reservationNumber});
>>>>>>> Stashed changes
      })
      .catch( (err) => {
          if (err.name === "ValidationError") {
              let errors = {}
        
              Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message
              })
        
              //return res.status(400).send(errors)
              return res.send(errors)
            }
          
          if (err.name === "MongoServerError") {
              //return res.status(400).send("duplicate key error")
              return res.send("duplicate key error")
          }

          //res.status(500).send(err.name)
          res.send(err.name)
          console.log(err.message)})
}

exports.getAllreservedFlights = async function(req,res) {

  let ID = req.params.id;

  await Reservation.find({reservedUserID : ID + ''})
          .then( (reservation) => {
              res.send(reservation)
          })
          .catch( (err) => {
              res.send({statusCode : err.status, message : err.message})
              console.log(err.status)})

  // then send it to FE.
}

exports.deleteReservedFlightById = async function(req,res) {

  let ID = req.params.deleteID

  Reservation.findByIdAndDelete(ID)
      .then( (reservedflights) => {
          //res.status(200)
          res.json(reservedflights)
      })
      .catch( (err) => {
          //res.status(404)
          console.log(err)})
}




exports.deletereservedflight = async function(req,res){

    let ID = req.params.deleteID;
           
    await Reservation.findByIdAndDelete(ID)
        .then( (reservedflights) => {
            
            //recevier info
    const option ={
    from:"guccsen704@outlook.com",
    to:this.email,
    subject :"cancelled flight",
    text:"your flight was cancelled , you will be refunded by"+ reservedflights.price
    
<<<<<<< Updated upstream
    };
    
    
    transporter.sendMail(options, (err,info)=>{
    
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent: "+ info.response);
    })
            res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
=======
    await Flight.findById(ID).then(result => oldFlight = result);

    // new vars to be set in the object above for updating departure flight.
    let newDepSeats = [];
    let newAvailableSeats = 0;

    console.log(assignedSeats, "     ----------------------------");

    if(cabinclass.toLowerCase() === 'economy'){

        for (let i = 0; i < oldFlight.reservedEconomySeats.length; i++) {
            if(assignedSeats.includes(i + ''))
                newDepSeats[i] = true;
            else
                newDepSeats[i] = oldFlight.reservedEconomySeats[i];
        }
>>>>>>> Stashed changes




<<<<<<< Updated upstream
=======
        for (let i = 0; i < oldFlight.reservedBusinessSeats.length; i++) {
            if(assignedSeats.includes(i + ''))
                newDepSeats[i] = true;
            else
                newDepSeats[i] = oldFlight.reservedBusinessSeats[i];
        }
>>>>>>> Stashed changes


    

<<<<<<< Updated upstream
}
=======
    updateFlight(ID,oldFlight);
}

exports.register = async function(req,res) {

    let newuser = new User(req.body.newuser);
    bcrypt.hash(newuser.password, saltRounds).then(function(hash) {
        newuser.password = hash ;
    });
    await newuser.save()
        .then( (user) => {
            res.status(200)
            res.json(user)
            console.log(user);
        })
        .catch( (err) => {
            if (err.name === "ValidationError") {
                let errors = {};
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message;
                });
                console.log(errors);
                return res.status(400).send({statusCode : err.status, errors});
              }
              if (err.name === "MongoServerError"){
                let errors = {};
                errors[Object.keys(err.keyValue)[0]] = "duplicate key error";
                console.log(errors);
  
                return res.status(400).send({statusCode : err.status, errors})
            }

            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
}


exports.deletereservedflight = async function(req,res){

    let ID = req.params.deleteID;


    

    let IDuser = req.body.userid;
    let useremail= null;
    await User.findById(IDuser)
    .then( (user) => {
       
       
        useremail= user.email;
       
       

    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
    
    
    
    
    
    
    await Reservation.findByIdAndDelete(ID)
    .then( (reservedflights) => {
            
            //recevier info
    const option ={
    from:'guccsen704@gmail.com',
    to:useremail,
    subject :"cancelled flight",
    text:"your flight was cancelled , you will be refunded by"+ reservedflights.price
    
    };
    
    
    transporter.sendMail(options, (err,info)=>{
    
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent: "+ info.response);
    })
            res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})






    

}





  exports.sendsummary = async function(req,res){

    let ID = req.params.getID;


    

    let IDuser = req.body.userid;
    let useremail= null;
    await User.findById(IDuser)
    .then( (user) => {
       
       
        useremail= user.email;
       
       

    })
    .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
    
    
    
    
    
    
    await Reservation.findById(ID)
    .then( (reservedflights) => {
            
            //recevier info
    const option ={
    from:'guccsen704@gmail.com',
    to:useremail,
    subject :"Summary",
    text:"Reservation number"+ reservedflights.reservationNumber + "Flight ID" + reservedflights.reservedFlightIDs+
        "Number of seats"+reservedflights.assignedSeats.length + "Assigned departure seats" +  reservedflights.assignedDepartureSeats
        + "Assigned return seats"+reservedflights.assignedReturnSeats + "Total price dunno if price for 1 seat or all seats" +reservedflights.price
        + "Number of adults??" + "Number of children?? "

    
    };
    
    
    transporter.sendMail(options, (err,info)=>{
    
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent: "+ info.response);
    })
            res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})






    

}
>>>>>>> Stashed changes
