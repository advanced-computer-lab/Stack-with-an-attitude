// External variables
const { time } = require("console");
const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
 

// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://dbUser:dbUser@ourcluster.djjyo.mongodb.net/sample_ProjectDb?retryWrites=true&w=majority' ;

//App variables
const app = express();
const port = process.env.PORT || "8000";
const User = require('./models/Admin');
app.use(bodyparser.urlencoded({extended : true}));
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

/*
                                                    Start of your code
*/
app.get("/Home", (req, res) => {
    res.sendFile('addflights.html', { root: '../frontend/my-app/public'});
  });


// #Routing to usercontroller here
const flightsschema = {
fnum : Number,
deptime : Number,
arrtime : Number,
date : Date,
ecseats :  Number,
busseats : Number,
airport : String
}

const flight = mongoose.model("flights",flightsschema);

app.post("/Home",function(req,res){
  let newflight = new flight ({
  fnum : req.body.fnum,
  deptime : req.body.deptime,
  arrtime : req.body.arrtime,
  date : req.body.date,
  ecseats : req.body.ecseats,
  busseats : req.body.busseats,
  airport : req.body.airport
  });
  newflight.save();
  console.log('successful');
  res.send('successful');
})


/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });