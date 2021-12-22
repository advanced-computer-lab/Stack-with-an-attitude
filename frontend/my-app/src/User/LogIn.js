import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Typography from '@mui/material/Typography';
import background from "./travel.jpg";
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';
import { circularProgressClasses } from '@mui/material';


function LogIn(props){   //function component declaration

  const {handleClick} = props;

  const [isLoggedIn , setIsLoggedIn] = useState(false);

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
   
    e.preventDefault();

    
    // get user email & password from form here (in sprint 3).

    const email = e.target.email.value;
    const password = e.target.password.value;
    axios.post('http://localhost:8000/user/login',{'email':email , 'password':password})
                .then((result) => {
                  if(result.data.statusCode == 401){
                    // insert error handling code here
                  }else{
                  const userId = result.data.user ; 
                  setIsLoggedIn(true);
                  console.log('MY SAAAAAATE :' , isLoggedIn);
                  //(() => handleClick(isLoggedIn))();
                  localStorage.setItem('userID',userId);
                  localStorage.setItem('isLoggedIn',true);
                  window.location.href='/user'
                  }
                                })
  
                .catch(error=>{
                  console.log(error)
                })
               
    }

    //useEffect(() => {(() => handleClick(isLoggedIn))();},[isLoggedIn])

      return(
        <div>
                    <div style={{marginBottom : '0px'}}>
            <Header color='info' style={{position:"static"}} transparent leftLinks={<Link to='/user'><div style={{height:'70px',width: '100px' }}>
              <Logo />
             </div></Link>} rightLinks={<HeaderLinksLoggedIn/>} fixed/>
        <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",height: "600px"}}>
          <div >
          <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                   Please enter your credentials
          </Typography>
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
        <TextField 
          required
          key='email'
          id='email'
          label='Email'
          name='email'
          margin='normal'
          />
          <TextField 
          required
          key='password'
          id='password'
          label='Password'
          name='password'
          margin='normal'
          type="password"
          />
         
          <Button style={{marginLeft:'15px'}} value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Log in
          </Button>
        </form>
        </div>
        <div>
        <footer style={{position:"fixed",bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
        </div>
        </div>
        </div>

      );
    }
  

export default LogIn ;
