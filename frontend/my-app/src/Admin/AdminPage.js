import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;
import ButtonBases_Admin from './ButtonBases_Admin';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@mui/material/Typography';

class AdminPage extends Component{
  
  
  render(){
      return(
        <div>
           <Typography variant="h1" gutterBottom component="div" style={{textAlign:'center'}}>
                   Admin Control Panel
          </Typography>
           <Card style={{margin: 'auto', maxWidth: 1000}}>
              <CardBody style={{margin : '-10px'}}> 
                <ButtonBases_Admin/>
              </CardBody>
            </Card>      
        </div>
     
      );
    }
  


}

export default AdminPage ;