import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Typography from '@mui/material/Typography';
import background from "../assets/img/travel.jpg";
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';

function AdminLogIn(){   //function component declaration

  const [errorMessage,setErrorMessage]=useState("");

  useEffect(()=>{
  },[errorMessage])

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
   
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    axios.post('http://localhost:8000/admin/login',{'username':username , 'password':password})
                .then((result) => {
                  //console.log(result);
                  if(result.data.statusCode == 401){
                    // insert error handling code here
                    setErrorMessage("check your info");
                  }else{
                    setErrorMessage("");
                  const adminId = result.data.admin;
                  localStorage.setItem('adminID',adminId);
                  localStorage.setItem('isAdminLoggedIn',true);
                  window.location.href='/admin'
                  }
                                })
  
                .catch(error=>{
                  console.log(error)
                })
               
    }
      return(
        <div>
                    <div style={{marginBottom : '0px'}}>
        <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",height: "600px"}}>
          <div >
            <br/>
          <Typography variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
                   Login to Admin Portal
          </Typography>
          {<h2 style={{color:"red", textAlign:'center'}} className="feedback-header">{errorMessage}</h2>}
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
        <TextField 
          required
          key='username'
          id='username'
          label='Username'
          name='username'
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
  

export default AdminLogIn ;
