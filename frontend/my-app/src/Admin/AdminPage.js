import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;


class AdminPage extends Component{
  
  
  render(){
      return(
        <div>
          <div>
          <br/>
        <Link to="/schedule"><h2>View schedule</h2></Link>
        </div>
        <div>
          <br/>
        <Link to="/addFlight"><h2>Add a flight</h2></Link>
        </div>
        <div>
          <br/>
        <Link to="/searchflight"><h2>Search for a flight</h2></Link>
        </div>
        </div>
     
      );
    }
  


}

export default AdminPage ;