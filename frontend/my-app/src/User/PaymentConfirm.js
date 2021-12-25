import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



function PaymentConfirmation(){   //function component declaration
  const {id} = useParams();
  const [confirmed,setConfirmed] = useState(false);

   useEffect(()=>{
    async function fetchData(){
    await axios.post(`http://localhost:8000/confirm-payment/${id}`)
    .then((data)=>{setConfirmed(true)})
    }


    fetchData();
  },[id]) 
  

  useEffect(()=>{},[confirmed])


      return(
        <div>
<Link to='/user'><h2>Home</h2></Link>
<Card sx={{ maxWidth: 250 , margin: "auto"  }}>
      <CardContent>
        <Typography variant="h3">
        {confirmed?"confimed":"pending"}
        </Typography>
        
      </CardContent>
      
    </Card>
    </div>
      );
    
    }

export default PaymentConfirmation ;
