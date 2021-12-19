import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ButtonBasesLoggedIn from './ButtonBasesLoggedIn';
import { ReactComponent as Logo } from './Logo.svg';


class MainPageLoggedIn extends Component{
  
  
  render(){
      return(
        <div>
            <Parallax filter image={require('assets/img/plane-wallpaper.jpg').default} children={<div className={'mainPageHeader'}><h1>Welcome to our airport!</h1><h3>where quality meets excellence</h3></div>}/>
            <Card style={{margin: 'auto', maxWidth: 750}}>
              <CardBody> 
                <ButtonBasesLoggedIn/>
              </CardBody>
            </Card>      
                        

        </div>

      );
    }
  


}

export default MainPageLoggedIn ;