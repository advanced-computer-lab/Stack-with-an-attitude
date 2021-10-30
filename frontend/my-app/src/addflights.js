import React, {Component} from 'react'
import axios from 'axios' ;

class addflights extends Component{
  submit(e){
    console.log(e.target.value);
axios.post('http://localhost:8000/home',{});
  }  
  render(){
      return(
        <div>
        <form onSubmit={this.submit}>
        <label for="fname">flight number:</label><br/>
      <input type="text" id="fnum" name="fnum" /><br/>
      <label for="lname">departure time:</label><br/>
      <input type="text" id="deptime" name="deptime"/><br/>
      <label for="lname">arrival time:</label><br/>
      <input type="text" id="arrtime" name="arrtime"/><br/>
      <label for="lname">date:</label><br/>
      <input type="text" id="date" name="date"/><br/>
      <label for="lname">number of economy seats:</label><br/>
      <input type="text" id="ecseats" name="ecseats"/><br/>
      <label for="lname">number of business seats:</label><br/>
      <input type="text" id="busseats" name="busseats"/><br/>
      <label for="lname">airport:</label><br/>
      <input type="text" id="airport" name="airport"/><br/><br/>
      <input type="submit" value="Submit"/>
        </form>
        </div>
     
      );
    }
  


}

export default addflights ;