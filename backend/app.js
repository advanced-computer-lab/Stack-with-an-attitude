const express = require("express");
const mongoose = require('mongoose');
const config = require('config');





// Model Imports
const admin = require('./Models/Admin');
const flight = require('./Models/Flights');


// Controller Imports
const adminController = require('./Controllers/AdminController');

// config info
const MongoURI =  config.get('mongoURI');
const secret = config.get('sessionSecret');



//App variables
const app = express();
const port = process.env.PORT || "8000";
app.use(express.urlencoded({extended : true}));
app.use(express.json())

// configurations
// Mongo DB

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>{
    console.log("MongoDB is now connected") 

})
.catch(err => console.log(err));




//session initialization

//need to install these new modules of tho npmi with package.lock will do it  this imports the session and the mongostore to store the session in mongo
// by default sessions are stored in server but the storage isnt practical for deployment so we store it in db cause its fast
var session = require('express-session');
const MongoStore = require('connect-mongo');


//app using the session 
// secret is used to validate the session think password store is the place we store the session in this case as mentioned before its the mongoStore aka in mongo db 
// you can see that it takes the same mongoUri meaning its currently in the same DB but in a different collection named sessions

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
// app.get('/searchFlights', adminController.searchFlight);

//acces the session using req.session dont try to put it in a variable cause it wont work because the browser and the server are constantly sending it to each other from previous request 

//small example as in how sessions work store a variable in the req.session object for example a counter and then manupilate it

app.get('/',(req,res)=>{
    if(req.session.viewCount)
        req.session.viewCount++;
    else{
        req.session.viewCount = 1;
    }
    res.status(200).send(`<h1>you visited this page ${req.session.viewCount} times  ${req.session.admin} </h1>`)

})


//for login we store ONLY and ONLY I SAY AGAIN the USERNAME or ID not the freaking password
app.post('/admin/login',(req,res)=>{
    var user = req.body.username;
    var pass = req.body.password;
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


//destory the session using this method also dont destory the cookie and create a new one in the same route because as said before server sends the session from the previous req
//if you destroy it its now null and u cant instanciate a session anyway
app.get('/admin/logout',(req,res)=>{
    if(req.session.admin)
        req.session.destroy();
    res.status(200).send(`<h1>you logged out </h1>`)

})


app.post('/insertadmin',(req,res)=>{
    var NewUser = new admin({
        username:"joe",
        password:"adminadmin",
        email:"Mail@domain.com",
      })
    
      NewUser.save((err,data)=>{
        if(err){
          console.log(err);
        }else{
          res.send('Data inserted succ');
        }
      })
});


//create a flight object and save it 


app.post('/flights',(req,res)=>{
    var {flightNum,
    depTime,
    arrTime,
    date,
    economySeats,
    businessSeats,
    airport} = req.body

    var newFlight = new flight({
        'flightNum':flightNum,
        'depTime':depTime,
        'arrTime':arrTime,
        'date':date,
        'economySeats':economySeats,
        'businessSeats':businessSeats,
        'airport':airport
    });

    newFlight.save((err,data)=>{
        if(err)
        console.log(err);
        else{
            res.status(200).send('data inserted successfully')
        }
    })
});

//find and delete a flight by id 
// the :deleted is url paramters these are indicated by a ":" before them and accessed using req.params

app.delete('/flights/:deleted',(req,res)=>{

    const deletedId = req.params.deleted
    flight.findByIdAndDelete(deletedId,(err,data)=>{
        if(err)
            console.log(err);
        else{
            if(data)
            res.status(200).send(`flight with id ${deletedId} has been deleted`);
            else{
                res.status(200).send('flight not found');
            }
        }
    });


});





// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
