import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


class Addflights extends Component{
  state={
    inserted:false
  }
  
  submit= (e) => {
    e.preventDefault();
    const flight = {
      "flightNumber": e.target.fnum.value,
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      "departureDate": e.target.depdate.value,
      "arrivalDate": e.target.arrdate.value,
      "economySeats": e.target.ecseats.value,
      "businessSeats": e.target.busseats.value,
      "from": e.target.fromf.value,
      "to": e.target.to.value,
    }
     
    
    axios.post('http://localhost:8000/createFlight',{"flight" : flight}).then((data) => {
      console.log("success");
      console.log(data)

      e.target.fnum.value='';
      e.target.deptime.value='';
      e.target.arrtime.value='';
      e.target.depdate.value='';
      e.target.arrdate.value='';
      e.target.ecseats.value='';
      e.target.busseats.value='';
      e.target.fromf.value='';
      e.target.to.value='';

      this.setState({inserted:true});

    }).catch((err, data) => console.log(data));


  }  
  render(){
      return(
        <div>

          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>Create a New Flight</h1>  
       {this.state.inserted && <h2 className="feedback-header"> Inserted flight successfully</h2>}
        <form onSubmit={this.submit} id="form">
          <TextField
          required
          id="fnum"
          label="Flight Number"
          name="fnum"
          />
          <TextField
          required
          id="deptime"
          label="Departure Time"
          name="deptime"
          type="time"
          />
          <TextField
          required
          id="arrtime"
          label="Arrival Time"
          name="arrtime"
          type="time"
          />
          <TextField
          id="depdate"
          label="Departure Date"
          name="depdate"
          type="date"
          />
          <TextField
          id="arrdate"
          label="Arrival Date"
          name="arrdate"
          type="date"
          />
          <TextField
          required
          id="ecseats"
          label="Number of Economy Seats"
          name="ecseats"
          type="number"
          />
          <TextField
          required
          id="busseats"
          label="Number of Business Seats"
          name="busseats"
          type="number"
          />
          <TextField
          required
          id="fromf"
          label="From Terminal"
          name="fromf"
          />
          <TextField
          required
          id="to"
          label="To Terminal"
          name="to"
          />
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
  


}

export default Addflights ;