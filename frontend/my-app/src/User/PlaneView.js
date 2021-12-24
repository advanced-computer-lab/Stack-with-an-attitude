import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';





function PlaneView(props){   //function component declaration
  const [selected,setSelected] = useState([]);
  const [flight,setFlight] = useState([]);
  const {id} = props;
  let i =0;

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    
    console.log(selected);
  }
//checkbtn
  const handleChange=(e)=>{
    let id=e.target.id;
    let seats = selected
    if(e.target.checked){
        if(!seats.includes(id)){
            seats.push(id);
        }
    }
    else{
    seats = seats.filter(seat=>(seat!=id))
    }
    setSelected(seats)

    console.log(seats)
  }

  useEffect(()=>{
    console.log(selected)
  },[selected])
  
  useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/getFlight/${id}`)).data
    setFlight(data.reservedEconomySeats);
    console.log(data.reservedEconomySeats);
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the flight data arrives or when the flight variable is updated just rerender the component and populate the fields
  //with the flight data captured from the request
  useEffect(()=>{
      console.log('flight loaded successfully')
  },[flight])

      return(
        <div>

<<<<<<< Updated upstream:frontend/my-app/src/planeView.js
          <Link to='/'><h2>Home</h2></Link>
          <br/>
        <h1>reserve seats</h1> 
=======
          <Typography  variant="h2" gutterBottom component="div" style={{textAlign:'center'}}>
            Reserve your departure seats :
          </Typography>
>>>>>>> Stashed changes:frontend/my-app/src/User/PlaneView.js
        
        <form onSubmit={handleSubmit} id="form">
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            {flight.map((fly,index)=>
            <div style={{width:'14%'}}>
                {(fly?
                    <Checkbox
                    id={index.toString()}
                    key={index.toString()}
                    disabled
<<<<<<< Updated upstream:frontend/my-app/src/planeView.js
                    defaultChecked
                    
=======
                    checked
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 135 } }}
>>>>>>> Stashed changes:frontend/my-app/src/User/PlaneView.js
                    />:
                    <Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 135 } }}
                    id={index.toString()}
                    key={index.toString()}
                    color="success"
                    onChange={handleChange}
                    />)}
                    </div>
                )
            }   
            </div>
         
<<<<<<< Updated upstream:frontend/my-app/src/planeView.js
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
=======
          <div style={{width : '10%' , margin : '10px auto'}}>
          <Button value="Submit" type="submit" variant="contained" disabled={selected.length<seats} endIcon={<SendIcon />}>
>>>>>>> Stashed changes:frontend/my-app/src/User/PlaneView.js
              Submit
          </Button>
          </div>
        </form>
        </div>

      );
    }
  

export default PlaneView ;
