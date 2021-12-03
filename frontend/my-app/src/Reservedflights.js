import * as React from 'react';
import {Link,useParams} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios' ;
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialogReservation from './AlertDialogReservation';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function Reservedflights() {

  const [rows, setRows] = useState([]); //declare state param named rows for data of sched and its update method setRows
  const [state,setState] = useState([]);
  const {id} =  useParams();

  const getAllresFlights =async () => {
console.log(id);
        let flights = [];
        await axios.get(`http://localhost:8000/user/getAllReservedFlights/${id}`)                   
        .then(result => {

          result.data.forEach(flight => {

            flights.push(flight);
          });

        }).catch(err => {
                console.log(err);
                });
        setRows(flights);
        console.log(flights);    
  }    
  

  useEffect(() => {  //use useEffect as a method that runs when the component is created
     // by default useEffect runs both on creation and update we do change the state when we update row causing an infinite loop 
     // therefore add this second param [] to useEffect after the method to make it run on creation only
     // equivelent to componentDidMount and componentDidUpdate
    
    const interval = setInterval(() => {getAllresFlights()},10000);
    return () => clearInterval(interval); // equal to componentDidUnmount(clearInterval(interval);)
    
  },[]);

  useEffect(() => {
    getAllresFlights();
  },[state]);


      //Link to direct back to home
  return (
    <div >
     <Link to="/user">
<Button value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
</Link> 
          <br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Reservation number</StyledTableCell>
            <StyledTableCell>Flight number</StyledTableCell>
            <StyledTableCell>Number of seats</StyledTableCell>
            <StyledTableCell>Assigned seats</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Number of adults</StyledTableCell>
            <StyledTableCell>Number of children</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.reservationNumber}
              </StyledTableCell>
              <StyledTableCell>{row.reservedFlightIDs}</StyledTableCell>
              <StyledTableCell>{row.numberOfSeats}</StyledTableCell>
              <StyledTableCell>{row.assignedSeats}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.numberOfAdults}</StyledTableCell>
              <StyledTableCell>{row.numberOfChildren}</StyledTableCell>
              <StyledTableCell>
                <AlertDialogReservation id={row._id} state={(d) => setState(d)}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}





export default Reservedflights;