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

    const [secondFlight,setFlight] = useState(null)
    const [firstSeats,setFirst] = useState([])
    const [secondSeats,setSecond] = useState([])
    const {id,cabinclass,numofresseats}=useParams()



    useEffect(()=>{
        console.log(secondFlight)
    },[secondFlight])

    useEffect(()=>{
        console.log(firstSeats)
    },[firstSeats])

    useEffect(()=>{
        console.log(secondSeats)
    },[secondSeats])


    return(
        <div>
            {secondSeats.length!=0?(
            <div>
                <div style={{display: 'flex',
                                                justifyContent: 'space-evenly',
                                                margin: 40
            }}><ViewFlight2 id={id}/>
                <ViewFlight2 id={secondFlight}/>
                <Summary fSeats={firstSeats} sSeats={secondSeats} firstId={id} secondId={secondFlight}/> //add total price    
            </div>
            <AlertDialogConfirmRes/>
            </div>
        
        
            ):secondFlight==null?(
            firstSeats.length==0?
            <div>
                <ViewFlight id={id}/>
                <PlaneView id={id} type={cabinclass} seats={numofresseats} setFunc={(value)=>setFirst(value)} />
            </div>:<div style={{display:'flex',justifyContent:'space-around',margin:'1rem'}}>
            {firstSeats.length!=0&&<SearchReturnFlight flightId={id} setFunc={(value)=>setFlight(value)} />}
          </div>
            ):
            <div>
                <ViewFlight2 id={secondFlight}/>
                <PlaneView2 id={secondFlight} type={cabinclass} seats={numofresseats} setFunc={(value)=>setSecond(value)}/>
            </div>
            }
        
        </div>
    );
}


export default ViewFlightHandler ;