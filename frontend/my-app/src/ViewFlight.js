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
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import HomeIcon from '@mui/icons-material/Home';

  


function ViewFlight(props){   //function component declaration
  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [flight,setFlight] = useState([]);
  const {id,cabinclass,numofresseats} = useParams();


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

  let depstr = flight["departureTime"]+"";
let dephour = depstr[0]+""+depstr[1];
let depsec = depstr[3]+""+depstr[4];
  let arrstr = flight["arrivalTime"]+"";
  let arrhour = arrstr[0]+""+arrstr[1];
  let arrsec = arrstr[3]+""+arrstr[4];
   let dep = new Date(flight["departureDate"]);
   let arr = new Date(flight["arrivalDate"]);
   dep.setHours(dephour);
   arr.setHours(arrhour);
   dep.setMinutes(depsec);
   arr.setMinutes(arrsec);
   console.log(numofresseats);

      return(
        <div>
 <Link to="/user">
<Button value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
</Link>
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
        trip duration: {(arr-dep)/3600000} hours
        </Typography>
        <Typography variant="body2">
        baggage allowance : {flight["baggageAllowance"]}
        </Typography>
        <Typography variant="body2">
        cabin class : {cabinclass}
        </Typography>
        <Typography variant="h7" component="div" color="red">
          you will reserve {numofresseats} seats in {cabinclass} class
        </Typography>
      </CardContent>
      <CardActions>
      
      </CardActions>
    </Card>
    </div>
      );
    
    }

export default ViewFlight ;
