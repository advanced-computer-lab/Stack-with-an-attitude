import {useParams} from 'react-router-dom'
import ViewFlight from 'ViewFlight';
import Button from '@mui/material/Button';
import EventSeatIcon from '@mui/icons-material/EventSeat';
function ViewFlightHandler(){
    const {id}=useParams()


    return(
        <div>
        <ViewFlight id={id}/>
        <div style={{display:'flex',justifyContent:'space-around',margin:'1rem'}}>
        <Button  value="Submit" variant="contained" endIcon={< EventSeatIcon />}>
              reserve seats
          </Button>
          </div>
        </div>
    );
}
export default ViewFlightHandler ;