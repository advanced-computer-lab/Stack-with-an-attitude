import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


function ViewProfile(){   //function component declaration
  const [updated,setUpdated]=useState(false);   //setting states these are like the local storage of a comp with a method to update them 
  //first param is the default value for said variable
  const [userState,setuserState] = useState([]);
  const {id} = useParams();

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    const update = {
      "firstName":e.target.firstName.value,
      "lastName":e.target.lastName.value,
      "passportNumber":e.target.passportNumber.value,
      "password":e.target.password.value,
      "email":e.target.email.value,
    }
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
  }
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

          <Link to='/user'><h2>Home</h2></Link>
          <br/>
        <h1>Update Profile</h1> 
        {updated && <h2 className="feedback-header">Updated Profile successfully </h2>}
        {console.log(userState)};
        <form onSubmit={handleSubmit} id="form">
          {(Object.keys(userState).slice(1,6)).map((f)=>(//loop over the userState info and map them to fields with their default value
          <TextField
          required
          key={f}
          id={f}
          label={f}
          name={f}
          defaultValue={userState[f]}
          margin='normal'
          />
          ))}
         
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
  

export default ViewProfile ;
