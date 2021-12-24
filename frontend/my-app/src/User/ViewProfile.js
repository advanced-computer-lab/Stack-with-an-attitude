import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
<<<<<<< Updated upstream:frontend/my-app/src/ViewProfile.js
=======
import HomeIcon from '@mui/icons-material/Home';
import reactDom from 'react-dom';
import Typography from '@mui/material/Typography';
>>>>>>> Stashed changes:frontend/my-app/src/User/ViewProfile.js


function ViewProfile(){   //function component declaration
  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [userState,setuserState] = useState([]);
  const {id} = useParams();
  const [authpass,setAuthpass] = useState("");

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    const update = {
      "firstName":e.target.firstName.value,
      "lastName":e.target.lastName.value,
      "passportNumber":e.target.passportNumber.value,
      "password":e.target.npassword.value,
      "email":e.target.email.value,
    }
    const opassword = e.target.password.value
    console.log("opp" , opassword)
    console.log("opp" ,authpass)
    if( opassword === authpass){
    console.log(update);
    axios.put(`http://localhost:8000/user/update/${id}`,{user:update})  //the update request
    .then(data=>{
      console.log(data);
      console.log("updated successfully")
        //in the then part meaning if the request is successful clear the feilds and set a flag "updated" to true 
        //its part of the state of the component so if you have a listener for it (the useEffect) it will sense that the flag is updated
        //therefore reupdating the component 
        e.target.firstName.value='';
        e.target.lastName.value='';
        e.target.passportNumber.value='';
        e.target.password.value='';
        e.target.email.value='';

      setUpdated(true);

    }).catch(error=>{
      console.log(error)
    })
  }else{
    console.log("wrong pass")
  }}
  //the useEffects aka the listeners who does a update method initially when the component is created
  // and when the prameter which it is listining to is updated
  // the list of dependencies(sensed/listened to) variables are passed as a second paramater to the useEffect
  //in this case its the state variable updated 
  //the update method itself is  an emtpy method body meaning it just rerenders the component whithout doing any computations or fetchs

  useEffect(()=>{
  },[updated])  //<===== this is the dependency list


  //in this one the dependency list is empty it runs only on creation 
  //so basically it does fetch the userState once by the id sets another variable to the result of the request
  //notice that we have another listener for the userState variable meaning that when the data arrives it does sth which is basically a rerender
   useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/user/getInfo/${id}`)).data
    setuserState(data);
    setAuthpass(data.password) 
    console.log("right" ,authpass)
    console.log(data);
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the userState data arrives or when the userState variable is updated just rerender the component and populate the fields
  //with the userState data captured from the request
  useEffect(()=>{
  },[userState])

      return(
        <div>

<<<<<<< Updated upstream:frontend/my-app/src/ViewProfile.js
          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>Update Profile</h1> 
=======
          <Link to="/user">
            <Button value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
          </Link>
          <Typography variant="h2" gutterBottom component="div" style={{textAlign: 'center'}}>
                    Update Profile
                </Typography>
>>>>>>> Stashed changes:frontend/my-app/src/User/ViewProfile.js
        {updated && <h2 className="feedback-header">Updated Profile successfully </h2>}
        {console.log(userState)};
        
        <form onSubmit={handleSubmit} id="form" style={{margin:'auto' , width:'20%'}}>
          <div style={{display:'flex', flexDirection:'column' , flexWrap:'wrap',height:"400px"}}>
          {(Object.keys(userState).slice(1,6)).map((f)=>(//loop over the userState info and map them to fields with their default value
         <React.Fragment>
         {f=="password" ?(
           <React.Fragment>

         </React.Fragment>):(
         <TextField 
          required
          key={f}
          id={f}
          label={f}
          name={f}
          defaultValue={(f=="password") ? "" : userState[f]}
          margin='normal'
          />)}
          </React.Fragment>
          ))}

                       <div style={{marginLeft:"60px",border:"solid #1976d2 3px",padding:"20px",borderRadius:"10px"}}>
                <Typography variant="caption" style={{fontSize:'16px'}} color = "#1976d2"  gutterBottom component="div">
                    Update password
                </Typography>
                  <TextField sx={{marginRight:"20px"}}
                  required
                  key="password"
                  id="password"
                  label="old password"
                  name="password"
                  defaultValue=""
                  margin='normal'
                  />
         <TextField sx={{marginRight:"10px"}}
         required
         id="npassword"
         label="new password"
         name="npassword"
         margin='normal'
         />
         </div>
         
          </div>
          <div style={{margin:"auto" , marginLeft:'300px'}}>
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Update Profile
          </Button>
          </div>
        </form>
        </div>

      );
    }
  

export default ViewProfile ;
