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

    const [firstFlight,set1Flight] = useState({});
    const [secondFlight,set2Flight] = useState({});
    const [firstPrice,set1Price] = useState(0);
    const [secondPrice,set2Price] = useState(0);
    const [finalPrice,setFinalPrice] = useState(0);

    let firstSeats = [];
    let secondSeats = [];


    async function fetchData(){

        let result = await axios.get(`http://localhost:8000/getFlight/${firstId}`);
        
            
            set1Flight(result);

            for (let seat in fSeats) {
                seat++;
                firstSeats = firstSeats.concat(["A" + seat ]); 
                }
    
            for (let seat in sSeats) {
                seat++
                secondSeats = secondSeats.concat(["B" + seat]); 
                }
        
    
        let secondResult = await axios.get(`http://localhost:8000/getFlight/${secondId}`);

        set2Flight(secondResult);

        console.log(firstFlight);
        console.log(secondFlight);
        
        set1Price(result.data.price);
        set2Price(secondResult.data.price);   

        console.log(firstFlight.data.price);
        console.log(firstSeats.length , secondSeats.length);

        setFinalPrice(firstPrice * firstSeats.length + secondPrice * secondSeats.length);
        console.log(finalPrice);
    }

useEffect(()=>{ fetchData();},[]);

useEffect(()=>{console.log(firstSeats)},[secondPrice , finalPrice]);

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
                Total price : {finalPrice}
                </Typography>
            </CardContent>
            </Card>
            </div>
      );
    
}
