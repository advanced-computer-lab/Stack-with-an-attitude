import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';




function Updateflight(){
  const [updated,setUpdated]=useState(false);
  const [flight,setFlight] = useState([]);
  const {id} = useParams();


  const handleSubmit=(e)=>{
    e.preventDefault();
    const update = {
      "flightNumber":e.target.flightNumber.value,
      "departureTime":e.target.departureTime.value,
      "arrivalTime":e.target.arrivalTime.value,
      "date":e.target.date.value,
      "economySeats":e.target.economySeats.value,
      "businessSeats":e.target.businessSeats.value,
      "from":e.target.from.value,
      "to":e.target.to.value
    }
    console.log(update);
    axios.put(`http://localhost:8000/updateFlight/${id}`,{flight:update})
    .then(data=>{
      console.log(data.data);
      console.log("updated successfully")

      e.target.flightNumber.value='';
  e.target.departureTime.value='';
  e.target.arrivalTime.value='';
  e.target.date.value='';
  e.target.economySeats.value='';
  e.target.businessSeats.value='';
  e.target.from.value='';
  e.target.to.value='';
    setUpdated(true);
    }).catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
  },[updated])

  useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/getFlight/${id}`)).data
    setFlight(data);
    console.log(data);
    }


    fetchData();
  },[id])
  
  useEffect(()=>{
  },[flight])

      return(
        <div>

          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>update flight with flight number {flight.flightNumber}</h1> 
        {updated && <h2 className="feedback-header">updated flight successfully </h2>}
        <form onSubmit={handleSubmit} id="form">
          {(Object.keys(flight).slice(1,9)).map((f)=>(
          <TextField
          required
          key={f}
          id={f}
          label={f}
          name={f}
          defaultValue={flight[f]}
          />
          ))}
         
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
  

export default Updateflight ;