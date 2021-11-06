import * as React from 'react';
import {Link} from 'react-router-dom';
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



function Schedule() {

  const [rows, setRows] = useState([]); //declare state param named rows for data of sched and its update method setRows

  useEffect(() => {  //use useEffect as a method that runs when the component is created
  
     // by default useEffect runs both on creation and update we do change the state when we update row causing an infinite loop 
     // therefore add this second param [] to useEffect after the method to make it run on creation only
     // equivelent to componentDidMount and componentDidUpdate
    const interval = setInterval(async () => {

                    let flights = [];
                        await axios.get('http://localhost:8000/allFlights')                   
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
                      ,10000); 
    return () => clearInterval(interval);
  },[]);
      //Link to direct back to home
  return (
    <div >
      <Link to='/'><h2>Home</h2></Link>  
          <br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight number</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">ArrivalTime</StyledTableCell>
            <StyledTableCell align="right">DepartureTime</StyledTableCell>
            <StyledTableCell align="right">Departure</StyledTableCell>
            <StyledTableCell align="right">Destination</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.flightNumber}
              </StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.arrivalTime}</StyledTableCell>
              <StyledTableCell align="right">{row.departureTime}</StyledTableCell>
              <StyledTableCell align="right">{row.from}</StyledTableCell>
              <StyledTableCell align="right">{row.to}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}


export default Schedule;