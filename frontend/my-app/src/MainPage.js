import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;

class MainPage extends Component{
  
  
  render(){
      return(
        <div>
          <div>
          <br/>
        <Link to="/schedule"><h2>schedule</h2></Link>
        </div>
        <div>
          <br/>
        <Link to="/addFlight"><h2>add flight</h2></Link>
        </div>
        </div>
     
      );
    }
  


}

export default MainPage ;