// External variables
const { time } = require("console");
const express = require("express");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const router = express.Router();

 

// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://dbUser:dbUser@ourcluster.djjyo.mongodb.net/sample_ProjectDb?retryWrites=true&w=majority' ;

//App variables
const app = express();
app.use(express.json());//to handle bodyware H*
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
/*app.get("/Home", (req, res) => {
    res.sendFile('addflights.html', { root: '../frontend/my-app/public'});
  });
router.put('/fnum',(req,res)=>{
  const found = flightsschema.some(flightsschema=>flightsschema.fnum===parseInt(req.params.fnum));
  if(found){
    const updflight=req.body;
    flightsschema.array.forEach(flightsschema => {
      if(flightsschema.fnum===parseInt(req.params.fnum)){
        flightsschema.deptime=updflight.deptime?updflight.deptime:flightsschema.deptime;
        flightsschema.arrtime=updflight.arrtime?updflight.arrtime:flightsschema.arrtime;
        flightsschema.ecseats=updflight.ecseats?updflight.ecseats:flightsschema.ecseats;
        flightsschema.busseats=updflight.busseats?updflight.busseats:flightsschema.busseats;
        flightsschema.date=updflight.date?updflight.date:flightsschema.date;
        flightsschema.airport=updflight.airport?updflight.airport:flightsschema.airport;
        res.json({msg:'Updated',flightsschema});
      }
    
    });
  }
  else{
    res.status(400).json({msg:'id not found ${req.params.fnum}'});
  }

}*/
app.get('/update',(req,res)=>{
  
  var id = req.body.id;


  
  flight.findByIdAndUpdate(id, req.body.flight,{new:true},
(err,data)=>{
    if(err) 
    {console.log(err);}
    else{
      
      res.send(data);
    }
  } )
  
})




// #Routing to usercontroller here
const flightsschema = {
  flightNumber : Number,
  departureTime : Number,
  arrivalTime : Number,
  date : Date,
  economySeats :  Number,
  businessSeats : Number,
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
  res.redirect('/Home');
})


/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });