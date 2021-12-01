import {useParams} from 'react-router-dom'
import ViewFlight from 'ViewFlight';
import Button from '@mui/material/Button';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import React, { useEffect, useState } from 'react'
import PlaneView from 'PlaneView';

function ViewFlightHandler(){

    function Testcomp(props){
        const {func} = props;
        const handleTest=(e)=>{
            e.preventDefault();
            func(e.target.small.value);
        }
        return(
                <form onSubmit={handleTest}>
                    <input type='text' defaultValue='61a7c74e08fb58bbc6f6feff' id='small' name='small'/>
                    <button>
                        <Button  value="Submit" variant="contained" endIcon={< EventSeatIcon />}>
                            reserve seats
                        </Button>
                    </button>
              </form>
    
        );
    }

    const [secondFlight,setFlight] = useState(null)

    const {id}=useParams()



    useEffect(()=>{
        console.log(secondFlight)
    },[secondFlight])


    return(
        <div>
        {secondFlight==null?(
            <div>
                <ViewFlight id={id}/>
                <PlaneView id={id} />
            </div>
        ):
            <div>
                <ViewFlight id={secondFlight}/>
                <PlaneView id={secondFlight} />
            </div>
        }
        <div style={{display:'flex',justifyContent:'space-around',margin:'1rem'}}>
            {!secondFlight&&<Testcomp func={(value)=>setFlight(value)}/>}
          </div>
        </div>
    );
}





export default ViewFlightHandler ;