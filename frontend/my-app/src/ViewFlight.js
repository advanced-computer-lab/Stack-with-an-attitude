import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
  


function ViewFlight(){   //function component declaration
  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [flight,setFlight] = useState([]);
  const {id} = useParams();

  //the useEffects aka the listeners who does a update method initially when the component is created
  // and when the prameter which it is listining to is updated
  // the list of dependencies(sensed/listened to) variables are passed as a second paramater to the useEffect
  //in this case its the state variable updated 
  //the update method itself is  an emtpy method body meaning it just rerenders the component whithout doing any computations or fetchs

  useEffect(()=>{
  },[updated])  //<===== this is the dependency list


  //in this one the dependency list is empty it runs only on creation 
  //so basically it does fetch the flight once by the id sets another variable to the result of the request
  //notice that we have another listener for the flight variable meaning that when the data arrives it does sth which is basically a rerender
   useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/getFlight/${id}`)).data
    setFlight(data);
    console.log(data);
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the flight data arrives or when the flight variable is updated just rerender the component and populate the fields
  //with the flight data captured from the request
  useEffect(()=>{
  },[flight])

var dephour = flight["departureTime"][0]+""+flight["departureTime"][1];
var arrhour = flight["arrivalTime"][0]+""+flight["arrivalTime"][1];
var depsec = flight["departureTime"][3]+""+flight["departureTime"][4];
var arrsec = flight["arrivalTime"][3]+""+flight["arrivalTime"][4];
 var dep = new Date(flight["departureDate"]);
 var arr = new Date(flight["arrivalDate"]);
 dep.setHours(dephour);
 arr.setHours(arrhour);
 dep.setMinutes(depsec);
 arr.setMinutes(arrsec);
      return(
        <div>
<Link to='/user'><h2>Home</h2></Link>
<Card sx={{ maxWidth: 350 , margin: "auto"  }}>
      <CardContent>
        <Typography variant="body2">
        flight number : {flight["flightNumber"]}
        </Typography>
        <Typography variant="body2">
        from : {flight["from"]}
        </Typography>
        <Typography variant="body2">
        to : {flight["to"]}
        </Typography>
        <Typography variant="body2">
        departure date : {flight["departureDate"]}
        </Typography>
        <Typography variant="body2">
        departure time : {flight["departureTime"]}
        </Typography>
        <Typography variant="body2">
        arrival date : {flight["arrivalDate"]}
        </Typography>
        <Typography variant="body2">
        arrival time : {flight["arrivalTime"]}
        </Typography>
        <Typography variant="body2">
        trip duration : { (arr - dep)/3600000} hours
        </Typography>
        <Typography variant="body2">
        baggage allowance : 2
        </Typography>
      </CardContent>
      <CardActions>
      <Button value="Submit" variant="contained" endIcon={< EventSeatIcon />}>
              reserve seats
          </Button>
      </CardActions>
    </Card>
    </div>
      );
    
    }

export default ViewFlight ;
