import {useParams,Route,Routes} from 'react-router-dom'
import ViewFlight from 'ViewFlight';
import ViewFlight2 from 'ViewFlight2';
import Button from '@mui/material/Button';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import React, { useEffect, useState } from 'react'
import SearchReturnFlight from 'SearchReturnFlight';
import PlaneView from 'PlaneView';
import PlaneView2 from 'PlaneView2';
import Summary from 'Summary';
import AlertDialogConfirmRes from 'AlertDialogConfirmRes';

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

    

    return(
        <div>
            {secondSeats.length!=0?(
            <div>
                <button onClick={()=>{setSecond([])}}>back</button>
                <div style={{display: 'flex',
                                                justifyContent: 'space-evenly',
                                                margin: 40
            }}><div><h2>Depature Details</h2><ViewFlight2 id={id}/></div>
                <div><h2>Return Details</h2><ViewFlight2 id={secondFlight}/></div>
                <div><h2>Additional Info</h2><Summary fSeats={firstSeats} sSeats={secondSeats} firstId={id} secondId={secondFlight} handleClick={getPrice}/></div>    
            </div>
            <AlertDialogConfirmRes reservation={{reservedUserID:localStorage.getItem('userID'),
                                                reservedFlightIDs:[id,secondFlight],
                                                numberOfSeats:firstSeats.length,
                                                assignedDepartureSeats:firstSeats,
                                                assignedReturnSeats:secondSeats,
                                                price: finalPrice,
                                                cabinClass: cabinclass,
                                                }}/>
            </div>
        
        
            ):secondFlight==null?(
            firstSeats.length==0?
            <div>
                <button onClick={()=>{window.location.href='/'}}>back</button>
            <div>
                <ViewFlight id={id}/>
                <PlaneView id={id} type={cabinclass} seats={numofresseats} setFunc={(value)=>setFirst(value)} />
            </div>
            </div>:<div style={{display:'flex',justifyContent:'space-around',margin:'1rem'}}>
            {firstSeats.length!=0&&(
            <div>
                <button onClick={()=>{setFirst([])}}>back</button>
            <SearchReturnFlight flightId={id} setFunc={(value)=>setFlight(value)}/>
            </div>
            )}
          </div>
            ):
            <div>
                <button onClick={()=>{setFlight(null)}}>back</button>
            <div>
                <ViewFlight2 id={secondFlight}/>
                <PlaneView2 id={secondFlight} type={cabinclass} seats={numofresseats} setFunc={(value)=>setSecond(value)}/>
            </div>
            </div>
            }
        
        </div>
    );
}


export default ViewFlightHandler ;