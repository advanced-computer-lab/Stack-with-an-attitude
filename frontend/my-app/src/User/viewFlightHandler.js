import {useParams,Route,Routes,Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewFlight from './ViewFlight';
import ViewFlight2 from './ViewFlight2';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SearchReturnFlight from './SearchReturnFlight';
import PlaneView from './PlaneView';
import PlaneView2 from './PlaneView2';
import AlertDialogConfirmRes from './AlertDialogConfirmRes';
import SimpleAccordion from './SimpleAccordion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function ViewFlightHandler(){

    function Testcomp(props){//replace with george's component props.func is a function that
        //sets the state of parent component for the secondFlight (return flight)
        const {func} = props;
        const handleTest=(e)=>{
            e.preventDefault();
            func(e.target.small.value);//replace with return flight id
        }
        return(
                <form onSubmit={handleTest}>
                    <input type='text' defaultValue='61a7c74e08fb58bbc6f6feff' id='small' name='small'/>
                    <button>
                        {false && <Button  value="Submit" variant="contained" endIcon={< EventSeatIcon />}>
                            reserve 2nd flight by id
                        </Button>
                        }
                    </button>
              </form>
    
        );
    }

    const {id,cabinclass,numofresseats}=useParams()

    const [secondFlight,setFlight] = useState(null)
    const [firstSeats,setFirst] = useState([])
    const [secondSeats,setSecond] = useState([])
    const [finalPrice,setFinalPrice] = useState(null)
    const [numOfadults,setNumofadults] = useState(0)
    const [numOfchildren,setNumOfchildren] = useState(0)

    const getPrice = (price) => {setFinalPrice(price)}

    useEffect(()=>{
        console.log(secondFlight)
    },[secondFlight])

    useEffect(()=>{
        console.log(firstSeats)
    },[firstSeats])

    useEffect(()=>{
        console.log(secondSeats)
    },[secondSeats])

    useEffect(()=>{
        console.log(finalPrice);
    },[finalPrice])

    useEffect(()=>{
        console.log(numOfadults);
    },[numOfadults])

    useEffect(()=>{
        console.log(numOfchildren);
    },[numOfchildren])

    

    return(
        <div>
            {secondSeats.length!==0?(
            <div>
                <Button style={{margin : '10px'}} startIcon={<ArrowBackIosNewIcon />} variant="outlined" 
                        onClick={()=>{setSecond([])}}>Back</Button>
                <Link underline='none' to="/user">
                    <Button value="home" variant="contained" endIcon={<HomeIcon />}>
                    Home
                    </Button>
                </Link>
                <Typography variant="h2" gutterBottom component="div">
                    Summary
                </Typography>
                <div style={{width : '80%' , margin :'auto' , marginTop : '20px' , marginBottom : '20px'}}>
                    <div>
                        <SimpleAccordion id={id} secondFlight={secondFlight} 
                            firstSeats={firstSeats} secondSeats={secondSeats} getPrice={getPrice}
                            />
                    </div>
                </div>
            <div>
          <TextField
          required
          id="noofadults"
          label="Number of adults"
          name="noofadults"
          type="number"
          onChange= {(e)=>{
              e.target.value >= 0 ?
            setNumofadults(e.target.value) : setNumofadults(0)
          }}
         pattern='[0-9]*'
          />
          <TextField
          required
          id="noofchildren"
          label="Number of children"
          name="noofchildren"
          type="number"
          onChange= {(e)=>{
            e.target.value >= 0 ?
            setNumOfchildren(e.target.value) : setNumOfchildren(0)
          }}
          
          />
            </div>
            <AlertDialogConfirmRes reservation={{reservedUserID:localStorage.getItem('userID'),
                                                reservedFlightIDs:[id,secondFlight],
                                                numberOfSeats:firstSeats.length,
                                                assignedDepartureSeats:firstSeats,
                                                assignedReturnSeats:secondSeats,
                                                price: finalPrice,
                                                cabinClass: cabinclass,
                                                numberOfAdults: numOfadults,
                                                numberOfChildren: numOfchildren,
                                                }}
                                                numOfadults={numOfadults}
                                                numOfchildren={numOfchildren}
                                                numofresseats={numofresseats}
                                                />
            </div>
        
        
            ):secondFlight==null?(
            firstSeats.length===0?
            <div>
                <button onClick={()=>{window.location.href='/'}}>back</button>
            <div style={{display:'flex' , flexDirection : 'row'}}>
                <div style={{width:'50%'}}>
                <ViewFlight  id={id}/>
                </div>
                <PlaneView id={id} type={cabinclass} seats={numofresseats} setFunc={(value)=>setFirst(value)} />
            </div>
            </div>:<div>
            {firstSeats.length!==0&&(
            <div>
                <button onClick={()=>{setFirst([])}}>back</button>
            <SearchReturnFlight flightId={id} setFunc={(value)=>setFlight(value)}/>
            </div>
            )}
          </div>
            ):
            <div>
                <button onClick={()=>{setFlight(null)}}>back</button>
                <div style={{display:'flex' , flexDirection : 'row'}}>
                <div style={{width:'50%'}}>
                <ViewFlight2 id={secondFlight}/>
                </div>
                <PlaneView2 id={secondFlight} type={cabinclass} seats={numofresseats} setFunc={(value)=>setSecond(value)}/>
                
            </div>
            </div>
            }
        
        </div>
    );
}


export default ViewFlightHandler ;