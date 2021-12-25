import {useParams,Route,Routes,Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewFlight from './ViewFlight';
import ViewFlight2 from './ViewFlight2';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SearchReturnFlight from './SearchReturnFlight';
import SearchArrFlight from './SearchArrFlight';
import PlaneViewEdit from './PlaneViewEdit';
import PlaneView from './PlaneView';
import PlaneView2 from './PlaneView2';
import AlertDialogConfirmRes from './AlertDialogConfirmRes';
import SimpleAccordion from './SimpleAccordion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './Logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';

function EditFlightHandler(){

   let {reservationId} = useParams([]);
    let [firstFlight,setFirstFlight] = useState(null);
    let [secondFlight,setSecondFlight] = useState(null);
    let [firstSeats,setFirstSeats] = useState(null);
    let [secondSeats,setSecondSeats] = useState(null);
    let [Cabin,setCabin] = useState(null);

    useEffect(()=>{
        async function fetchData(){
        let data = await (await axios.get(`http://localhost:8000/user/reservedFlight/${reservationId}`)).data.data
        console.log(data);
        setCabin(data.cabinClass);
        setFirstFlight(data.reservedFlightIDs['0']);
        setSecondFlight(data.reservedFlightIDs['1']);
        setFirstSeats(data.assignedDepartureSeats);
        setSecondSeats(data.assignedReturnSeats);
        
        }
        fetchData();
    },[])

   useEffect(()=>{
 console.log(firstFlight);
   },[firstFlight,secondFlight,firstSeats,secondSeats])

   

    return(
        <div>
            <h1>hello</h1>
            {firstFlight&&<SearchArrFlight flightId={firstFlight} setFunc={(value)=>setFirstFlight(value)}/>}
            {firstSeats&&<PlaneViewEdit id={firstFlight} type={Cabin} seats={firstSeats} setFunc={(value)=>{setFirstSeats(value)}} />}
            {secondFlight&&<SearchReturnFlight flightId={firstFlight} setFunc={(value)=>setSecondFlight(value)}/>}
        </div>
        
    );
}


export default EditFlightHandler;