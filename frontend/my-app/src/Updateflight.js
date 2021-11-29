import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';




function Updateflight(){   //function component declaration
  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [flight,setFlight] = useState([]);
  const {id} = useParams();


  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    const update = {
      "flightNumber":e.target.flightNumber.value,
      "departureTime":e.target.departureTime.value,
      "arrivalTime":e.target.arrivalTime.value,
      "departureDate":e.target.departureDate.value,
      "arrivalDate":e.target.arrivalDate.value,
      "economySeats":e.target.economySeats.value,
      "businessSeats":e.target.businessSeats.value,
      "totalSeats": parseInt(e.target.economySeats.value)+ parseInt(e.target.businessSeats.value),
      "from":e.target.from.value,
      "to":e.target.to.value,
      "returnDate":e.target.returnDate.value
    }
    console.log(update);
    axios.put(`http://localhost:8000/updateFlight/${id}`,{flight:update})  //the update request
    .then(data=>{
      console.log(data);
      console.log("updated successfully")
        //in the then part meaning if the request is successful clear the feilds and set a flag "updated" to true 
        //its part of the state of the component so if you have a listener for it (the useEffect) it will sense that the flag is updated
        //therefore reupdating the component 
      e.target.flightNumber.value='';
      e.target.departureTime.value='';
      e.target.arrivalTime.value='';
      e.target.departureDate.value='';
      e.target.arrivalDate.value='';
      e.target.economySeats.value='';
      e.target.businessSeats.value='';
      e.target.from.value='';
      e.target.to.value='';

      setUpdated(true);

    }).catch(error=>{
      console.log(error)
    })
  }
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

      return(
        <div>

          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>Update flight with flight number {flight.flightNumber}</h1> 
        {updated && <h2 className="feedback-header">Updated flight successfully </h2>}
        <form onSubmit={handleSubmit} id="form">
          {(Object.keys(flight).slice(2,12)).map((f)=>(//loop over the flight info and map them to fields with their default value
          (f!='totalSeats')&&(<TextField
          required
          key={f}
          type={(f.includes('Time') ? 'time' : 
                (f.includes('Date') ? 'date' : 
                (f.includes('Seats') ? 'number' : 'string')))}
          helperText={(f.includes('Time') ? 'Please use HH:MM' : 
                      (f.includes('Date') ? 'Please use YYYY-MM-DD' : ''))}
          id={f}
          label={f}
          name={f}
          defaultValue={flight[f]}
          margin='normal'
          />)
          ))}
         
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
  

export default Updateflight ;
