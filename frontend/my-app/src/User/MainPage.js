import React, {Component} from 'react'
import {Link, useParams} from 'react-router-dom'
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ButtonBases from './ButtonBases';
import { ReactComponent as Logo } from './Logo.svg';

class MainPage extends Component{
  
/*  */

  render(){
      return(
        <div>
            <Header color='info'  transparent leftLinks={<Link to="/"><div style={{height:'70px',width: '100px' }}>
                      <Logo />
                                                        </div></Link>}  rightLinks={<HeaderLinks/>} fixed/>
            <Parallax filter image={require('assets/img/plane-wallpaper.jpg').default} children={<div className={'mainPageHeader'}><h1>Welcome to our airport!</h1><h3>where quality meets excellence</h3></div>}/>
            <Card style={{margin: 'auto', maxWidth: 750}}>
              <CardBody style={{margin : '-10px'}}> 
                <ButtonBases/>
              </CardBody>
            </Card>             
          {localStorage.setItem('isLoggedIn',false)}
        </div>
      );
    }
  


}

export default MainPage ;