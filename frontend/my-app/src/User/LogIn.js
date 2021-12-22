import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Typography from '@mui/material/Typography';
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

          <Link to="/">
            <Button value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
          </Link>
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
          />
         
          <Button style={{marginLeft:'15px'}} value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Log in
          </Button>
        </form>
        </div>

      );
    }
  

export default LogIn ;
