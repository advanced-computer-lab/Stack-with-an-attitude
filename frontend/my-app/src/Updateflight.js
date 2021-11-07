import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


class Updateflight extends Component{
  
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  async componentDidMount() {

    const id = this.props.updateID;

    await axios.get('http://localhost:8000/getFlight/'+ id)
    .then(res => res.json())
    .then(result => console.log(result));
  }

  submit(e){
    e.preventDefault();
    const flight = {
      "flightNumber": e.target.fnum.value,
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      "date": e.target.date.value,
      "economySeats": e.target.ecseats.value,
      "businessSeats": e.target.busseats.value,
      "from": e.target.fromf.value,
      "to": e.target.to.value,
    }
     
    
axios.post('http://localhost:8000/createFlight',{"flight" : flight}).then((data) => {
  console.log("success");
  console.log(data)
}).catch(err => console.log(err));


  }  
  render(){
      return(
        <div>

          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>Create a New Flight</h1>  
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
          />
          <TextField
          required
          id="arrtime"
          label="Arrival Time"
          name="arrtime"
          />
          <TextField
          required
          id="date"
          label="Date"
          name="date"
          />
          <TextField
          required
          id="ecseats"
          label="Number of Economy Seats"
          name="ecseats"
          />
          <TextField
          required
          id="busseats"
          label="Number of Business Seats"
          name="busseats"
          />
          <TextField
          required
          id="airport"
          label="Airport"
          name="airport"
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

export default Updateflight ;