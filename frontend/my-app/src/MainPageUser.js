import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;

class MainPageUser extends Component{
  
  
  render(){
      return(
        <div>
          <div>
          <br/>
        <Link to="/searchflightuser"><h2>search for available flights</h2></Link>
        </div>
        <div>
          <br/>
        <Link to="/yourreservedflights"><h2>view your reserved flights</h2></Link>
        </div>
        </div>
     
      );
    }
  


}

export default MainPageUser ;