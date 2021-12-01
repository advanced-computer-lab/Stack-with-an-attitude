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
import AlertDialog from './AlertDialog';

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



  function Cancelflight() {

    const {id} = useParams();


     const reserveddflights= [


    {   
      "username": 'ahmed1',
      "password":'abc',
      "email":'hossamnew16@gmail.com',
      "flightnumber":1,
      "isreserved":true,
      "price":500
  },
  
  
  
  {   
      "username": 'ahmed2',
      "password":'abc',
      "email":'hossamnew16@gmail.com',
      "flightnumber":1,
      "isreserved":true,
      "price":700
  },
  
  
  
  {   
      "username": 'ahmed3',
      "password":'abc',
      "email":'hossamnew16@gmail.com',
      "flightnumber":1,
      "isreserved":false,
      "price":900
  }



  ]

    



    const [rows, setRows] = useState([]); //declare state param named rows for data of sched and its update method setRows
    const [state,setState] = useState([]);
  
    const getAllreservedFlights =async () => {
  
      // get User ID from local storage then send it with get request below.
          let reservedflights = [];
          await axios.get(`http://localhost:8000/user/getAllReservedFlights/${id}`)             
          .then(result => {
  
            result.data.forEach(flight => {
  
                reservedflights.push(flight);
            });
  
          }).catch(err => {
                  console.log(err);
                  });
          setRows(reservedflights);
          console.log(reservedflights);    
    }   
    
    useEffect(() => { 
       
       const interval = setInterval(() => {getAllreservedFlights()},10000);
       return () => clearInterval(interval);
       
     },[]);
   
     useEffect(() => {
        getAllreservedFlights();
     },[state]);
     


     const handleDeletereserveClick = async (e) => {

        await axios.delete(`http://localhost:8000/deletereservedFlight/${e.currentTarget.id}`)
        .then(data => console.log('DELETED!'));
    
        setState();
        
      }

      return (
        <div >
          <Link to='/'><h2>Home</h2></Link>  
              <br/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Reservation Number</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Arrival Date</StyledTableCell>
                <StyledTableCell>Arrival Time</StyledTableCell>
                <StyledTableCell>Departure Date</StyledTableCell>
                <StyledTableCell>Departure Time</StyledTableCell>
                <StyledTableCell>Departure</StyledTableCell>
                <StyledTableCell>Destination</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.flightNumber}
                  </StyledTableCell>
                  <StyledTableCell>
                    <AlertDialog id={row._id} state={(d) => setState(d)}/>
                  </StyledTableCell>  
                  <StyledTableCell>
                    {/* <IconButton aria-label="cancelflight" onClick={handleDeletereserveClick} id={row._id}>
                      <DeleteIcon />
                    </IconButton> */}
                    <Link to={"/updateflight/" + row._id}>
                      <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{row.arrivalDate}</StyledTableCell>
                  <StyledTableCell>{row.arrivalTime}</StyledTableCell>
                  <StyledTableCell>{row.departureDate}</StyledTableCell>
                  <StyledTableCell>{row.departureTime}</StyledTableCell>
                  <StyledTableCell>{row.from}</StyledTableCell>
                  <StyledTableCell>{row.to}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
    }

    

export default Cancelflight;
