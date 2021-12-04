import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CountertopsOutlined } from '@mui/icons-material';
  


export default function Summary(props){   //function component declaration

    const {fSeats,sSeats,firstId,secondId} = props;

    const [secondFlight,setFlight] = useState({});

    let firstSeats = [];
    let secondSeats = [];

    const firstPrice = 0;
    const secondPrice = 0;
    

  useEffect(()=>{

    async function fetchData(){
    let firstFlightData = (await axios.get(`http://localhost:8000/getFlight/${firstId}`)).data
    firstPrice = firstFlightData.price;

    let secondFlightData = (await axios.get(`http://localhost:8000/getFlight/${secondId}`)).data
    setFlight(secondFlightData);
    secondPrice = secondFlightData.price;
    }

    for (let seat in fSeats) {
        seat++;
        firstSeats = firstSeats.concat(["A" + seat ]); 
        }

    for (let seat in sSeats) {
        seat++
        secondSeats = secondSeats.concat(["B" + seat]); 
        }

     console.log(secondSeats);   
  },[])

    useEffect(()=>{},[secondFlight]);  
    console.log('AHHHHHHHDICKHASSHHHHHHHHHHHHHHH',secondFlight);
      return(
                <div>
                <Card sx={{ maxWidth: 350 , margin: "auto"  }}>
            <CardContent>
                <Typography variant="body2">
                Chosen departure seats : {firstSeats}
                </Typography>
                <Typography variant="body2">
                Chosen return seats : {secondSeats}
                </Typography>
                <Typography variant="body2">
                Total price : {firstPrice * firstSeats.length + secondPrice * secondSeats.length}
                </Typography>
            </CardContent>
            </Card>
            </div>
      );
    
}
