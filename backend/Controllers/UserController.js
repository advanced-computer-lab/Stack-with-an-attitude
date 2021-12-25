const User = require('../Models/User');
const Reservation = require('../Models/Reservation');
const Flight = require('../Models/Flight');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;

const reserveSelectedSeats = async function(depID,returnID,assignedDepartureSeats,assignedReturnSeats,cabinclass) {

    updateReservationSeats(depID,cabinclass,assignedDepartureSeats , false);

    updateReservationSeats(returnID,cabinclass,assignedReturnSeats , false);

}

exports.getUserById = async function(req,res) {

  let ID = req.params.id;

  await User.findById(ID)
  .then( (user) => {
      //res.status(200)
      res.send({statusCode:200 , data:user})
      //res.json(user)
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
          res.send({statusCode:200 , data: user})
      })
      .catch( (err) => {
        res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})
}

exports.getAllReservedSeats = async function(req,res) {


  Reservation.find()
      .then( (reservedflights) => {
          //res.status(200)
          res.send({statusCode:200 , data:reservedflights})
      })
      .catch( (err) => {
          //res.status(404)
          res.send({statusCode:404})
          console.log(err)})

}

exports.getReservedFlightById = async function(req,res) {


  let ID = req.params.id;

  Reservation.findById(ID)
      .then( (reservedflights) => {
          //res.status(200)
          res.send({statusCode:200 , data:reservedflights})
      })
      .catch( (err) => {
          //res.status(404)
          res.send({statusCode:404})
          console.log(err)})
}


// Create
exports.createReservedFlight = async function(req,res) {


  let newReservation = new Reservation(req.body.reservation);

  newReservation.reservationNumber = Math.floor(Math.random() * 9999) + '';

  await newReservation.save()
      .then( (reservedflights) => {
          //res.status(200)
         console.log('CREATED RESERVATION');
         res.send({statusCode: 200 , reservationNumber: reservedflights.reservationNumber,object:reservedflights});
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

    // update FLIGHTS ARRAY!!!!
    reserveSelectedSeats(newReservation.reservedFlightIDs[0],newReservation.reservedFlightIDs[1],
                        newReservation.assignedDepartureSeats,newReservation.assignedReturnSeats,
                        newReservation.cabinClass);
}

exports.getAllreservedFlights = async function(req,res) {

  let ID = req.params.id;

  await Reservation.find({reservedUserID : ID + ''})
          .then( (reservation) => {
              res.send({"reservation":reservation,statusCode:200})
          })
          .catch( (err) => {
              res.send({statusCode : err.status, message : err.message})
              console.log(err.status)})

  // then send it to FE.
}

exports.deleteReservedFlightById = async function(req,res) {

  let ID = req.params.id;


  Reservation.findByIdAndDelete(ID)
      .then(async (reservedflights) => {


        await updateReservationSeats(reservedflights.reservedFlightIDs[0],
            reservedflights.cabinClass,
            reservedflights.assignedDepartureSeats , true);
        await updateReservationSeats(reservedflights.reservedFlightIDs[1],
            reservedflights.cabinClass,
            reservedflights.assignedReturnSeats , true);
            

            let IDuser = reservedflights.reservedUserID;
            let useremail= null;

            await User.findById(IDuser)
            .then( (user) => {
        
                useremail= user.email;
        
            })
            .catch( (err) => {
                res.send({statusCode : err.status, message : err.message})
                console.log(err.status)})

            const option ={
                from:'guccsen704@gmail.com',
                to:useremail,
                subject :"Cancelled flight",
                text:"Your flight was cancelled , you will be refunded by "+ reservedflights.price
            
                };
            
                transporter.sendMail(option, (err,info)=>{
            
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Sent: "+ info.response);
                })

            res.send({statusCode:200});
      })
      .catch( (err) => {
          //res.status(404)
          res.send({statusCode:400});
          console.log(err)})
}


const updateFlight = async function(ID,reservedSeats){

    await Flight.findByIdAndUpdate(ID, reservedSeats, {new: true, runValidators: true})
    .then( (flights) => {
        console.log(flights);
    })

}



const updateReservationSeats = async function(ID,cabinclass,assignedSeats , isCancelled){

    let oldFlight = null; 
    
    await Flight.findById(ID).then(result => oldFlight = result);

    // new vars to be set in the object above for updating departure flight.
    let newDepSeats = [];
    let newAvailableSeats = 0;

    if(cabinclass.toLowerCase() === 'economy'){

        for (let i = 0; i < oldFlight.reservedEconomySeats.length; i++) {
            if(assignedSeats.includes(i + ''))
                newDepSeats[i] = !isCancelled;
            else
                newDepSeats[i] = oldFlight.reservedEconomySeats[i];
        }

        let newAvailSeats = newDepSeats.filter(x => !x).length;

        oldFlight.reservedEconomySeats = newDepSeats;
        oldFlight.availableeconomySeats = newAvailSeats;

    }else {

        for (let i = 0; i < oldFlight.reservedBusinessSeats.length; i++) {
            if(assignedSeats.includes(i + ''))
                newDepSeats[i] = !isCancelled;
            else
                newDepSeats[i] = oldFlight.reservedBusinessSeats[i];
        }

        let newAvailSeats = newDepSeats.filter(x => !x).length;

        oldFlight.reservedBusinessSeats = newDepSeats;
        oldFlight.availableBusinessSeats = newAvailSeats;
    }

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
            res.send({statusCode:200})
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

//create transporter for sender data
const transporter = nodemailer.createTransport({
    service: 'gmail',
   auth: {
       user:'csenair704no1@gmail.com',
       pass:'Hossam2021'
   }
});


exports.sendsummary = async function(req,res){

    let ID = req.params.id;

    let IDuser = req.body.userid;
    let useremail= null;
    await User.findById(IDuser)
    .then( (user) => {
       
        useremail= 'hossamnew16@gmail.com';
        console.log('USER SET');
    })
    .catch( (err) => {
      //  res.send({statusCode : err.status, message : err.message})
        console.log(err.status)})

    
    
    
    await Reservation.findById(ID)
    .then( (reservedflights) => {
            console.log('RESERV FETCH SUCC , ALSO THICCCCC');

            const textMessage = `
            TEZAK 7AMRA , 3ayez teshof el reservation : RO7 el view reserved flight ya ro7 omak
             <p> Assigned departure seats :  ${reservedflights.assignedDepartureSeats} </p>
             <p> Assigned return seats : ${reservedflights.assignedReturnSeats} </p>
             `;
            
            

            //recevier info
            let mailoption = {
                from:'csenair704no1@gmail.com',
                to:'hossamnew16@gmail.com',
                subject :"Summary",
                text:`Dear Customer , \n Here is your summary for the reservation : \n Reservation number : ${reservedflights.reservationNumber} \n Number of seats : ${reservedflights.assignedSeats.length} + "\n Assigned departure seats : " +  reservedflights.assignedDepartureSeats + "\n Assigned return seats : "+ reservedflights.assignedReturnSeats + "\n Total price : " + reservedflights.price + "\n Number of adults : "+ reservedflights.numberOfAdults + "\n Number of children : "+ reservedflights.numberOfChildren + "\n Thank you for choosing Weeb Airlines.`
            };
            
            
            
            
            transporter.sendMail(mailoption, function(err, data){
            
                if(err){
                    console.log('faile',err);
                }else{
                    console.log('email sent.....');
                }
            })

            console.log('THE FINAL STAGE');
                res.status(200)
                res.json(reservedflights)
                    })
                

        .catch( (err) => {
            res.send({statusCode : err.status, message : err.message})
            console.log(err.status)})
}