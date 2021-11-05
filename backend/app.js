const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
 
// Controller Imports
const adminController = require('./Controllers/AdminController');


//App variables
const app = express();
const port = process.env.PORT || "8000";
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.json());

// configurations

const MongoURI =  config.get('mongoURI');
const secret = config.get('sessionSecret');

// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

// Session Initialization

// secret is used to validate the session think password store is the place we store the session,
//in this case as mentioned before its the mongoStore aka in mongo db 
// you can see that it takes the same mongoUri meaning its currently in the same
// DB but in a different collection named sessions

app.use(session({

  secret: secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
      maxAge: 1000 * 60 * 60 
  },
  store: MongoStore.create({ mongoUrl:MongoURI })

}));

//Routes
app.get('/searchFlights', adminController.searchFlight);

app.get('/allFlights', adminController.getAllFlights);

app.get('/getFlight/:getID', adminController.getFlightById);

app.put('/updateFlight/:updateID', adminController.updateFlightById);

app.post('/createFlight',adminController.newFlight);

app.delete('/deleteFlight/:deleteID',adminController.deleteFlightById);


//for login we store ONLY and ONLY I SAY AGAIN the USERNAME or ID not the password , NEVER!!!

app.post('/admin/login',(req,res)=>{
  const user = req.body.username;
  const pass = req.body.password;

  admin.findOne({username:user},(err,data)=>{
      if(err)
          console.log(err);
      else{
          if(data){
              if(pass==data.password){
                  req.session.admin = user;
                  res.send("logged in");
              }
          }
          else{
                  res.send("invalid");
              }
          }
  });

});

//destory the session using this method also dont destory the cookie and 
//create a new one in the same route because as said before server sends the session from the previous req
//if you destroy it its now null and u cant instanciate a session anyway
app.get('/admin/logout',(req,res)=>{

  if(req.session.admin)
      req.session.destroy();
  res.status(200).send(`<h1>you logged out </h1>`)

})

// // Use Routes
// app.use("/flights", Flights)

// Database Connection
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// Server is Listening
app.listen(port, () => {console.log(`Listening to requests on http://localhost:${port}`)})

