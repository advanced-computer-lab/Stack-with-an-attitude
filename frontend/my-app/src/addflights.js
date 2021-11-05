import React, {Component} from 'react'
import axios from 'axios' ;

class Addflights extends Component{
  
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
          <h1>blabla</h1>
        <form onSubmit={this.submit} id="form">
          <label >flight number:</label><br/>
          <input type="text" id="fnum" name="fnum" /><br/>
          <label >departure time:</label><br/>
          <input type="text" id="deptime" name="deptime"/><br/>
          <label >arrival time:</label><br/>
          <input type="text" id="arrtime" name="arrtime"/><br/>
          <label>date:</label><br/>
          <input type="text" id="date" name="date"/><br/>
          <label >number of economy seats:</label><br/>
          <input type="text" id="ecseats" name="ecseats"/><br/>
          <label >number of business seats:</label><br/>
          <input type="text" id="busseats" name="busseats"/><br/>
          <label >airport:</label><br/>
          <input type="text" id="airport" name="airport"/><br/>
          <label >from:</label><br/>
          <input type="text" id="fromf" name="fromf"/><br/>
          <label >to:</label><br/>
          <input type="text" id="to" name="to"/><br/>
          <input type="submit" value="Submit" />
        </form>
        </div>
     
      );
    }
  


}

export default addflights ;