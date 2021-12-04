import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './AlertDialog';
import Paper from '@mui/material/Paper';
import PreviewIcon from '@mui/icons-material/Preview';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';


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

export default function SearchflightUser() {
  const [cabinclass, setCabinclass] = React.useState('economy');
  const [numofresseats, setNumofresseats] = React.useState(0);

  const handleChange = (e) => {
    setCabinclass(e.target.value);
  };

  const [state,setState] = React.useState([]);
  const [rows,setRows] = React.useState([]);
  
  const submit= async (e) => {
    e.preventDefault();
    const flight = {
      "departureTime": e.target.deptime.value,
      "arrivalTime": e.target.arrtime.value,
      "departureDate": e.target.depdate.value,
      "arrivalDate": e.target.arrdate.value,
      "from": e.target.fromf.value,
      "to": e.target.to.value
    }
    const selected = {
      "select" : cabinclass,
      "numofseats" : e.target.numofseats.value
    }
    setNumofresseats(e.target.numofseats.value);
    await axios.post('http://localhost:8000/searchFlightsuser', {"flight" : flight , "selected":selected}).then((data) => {
      console.log("search successful!");


      console.log(data.data);
      setState([]);
      setRows(data.data);

      e.target.deptime.value='';
      e.target.arrtime.value='';
      e.target.depdate.value='';
      e.target.arrdate.value='';
      e.target.fromf.value='';
      e.target.to.value='';
      e.target.fromf.value='';
      

    }).catch(err => console.log(err));


  }  
    return(
      <div>
        {localStorage.getItem('isLoggedIn') ? (
          <Link to="/user" >
             <Button value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
          </Link>
        ) : (
          <Link to="/" >
           <Button value="home" variant="contained" endIcon={<HomeIcon />}>
                Home
            </Button>
          </Link>
        )}
           
          <br/>
        <h1>Search and reserve your Flight seats</h1>  
        <div className='containerS'>
          <form onSubmit={submit} id="form" className='form'>
          <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="cabinclasslabel">Cabin Class</InputLabel>
        <Select
          labelId="cabinclasslabel"
          id="cabinclass"
          value = {cabinclass}
          onChange = {handleChange}
          label="cabinclass"
        >
          <MenuItem value="business">business</MenuItem>
          <MenuItem value = "economy">Economy</MenuItem>
        </Select>
      </FormControl>
            <TextField
            required
            id="numofseats"
            label="number of seats"
            name="numofseats"
            type="number"
            />
            <TextField
            id="depdate"
            label="Departure Date"
            name="depdate"
            type="date"
            />
            <TextField
            id="deptime"
            label="Departure Time"
            name="deptime"
            type="time"
            />
            <TextField
            id="arrdate"
            label="Arrival Date"
            name="arrdate"
            type="date"
            />
            <TextField
            id="arrtime"
            label="Arrival Time"
            name="arrtime"
            type="time"
            />
            <TextField
            id="fromf"
            label="From Terminal"
            name="fromf"
            />
            <TextField
            id="to"
            label="To Terminal"
            name="to"
            />
            <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
                Submit
            </Button>
          </form>
          <TableContainer component={Paper} className='sched'>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Arrival Date</StyledTableCell>
                    <StyledTableCell>Arrival Time</StyledTableCell>
                    <StyledTableCell>Departure Date</StyledTableCell>
                    <StyledTableCell>Departure Time</StyledTableCell>
                    <StyledTableCell>Departure</StyledTableCell>
                    <StyledTableCell>Destination</StyledTableCell>
                    <StyledTableCell>view a flight</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (  //loop on rows and map to the template TableRows and Columns 
                    <StyledTableRow key={row._id}>
                      <StyledTableCell>{row.arrivalDate}</StyledTableCell>
                      <StyledTableCell>{row.arrivalTime}</StyledTableCell>
                      <StyledTableCell>{row.departureDate}</StyledTableCell>
                      <StyledTableCell>{row.departureTime}</StyledTableCell>
                      <StyledTableCell>{row.from}</StyledTableCell>
                      <StyledTableCell>{row.to}</StyledTableCell>
                      <StyledTableCell>
                        {/* <IconButton aria-label="delete" onClick={handleDeleteClick} id={row._id}>
                          <DeleteIcon />
                        </IconButton> */}
                        <Link to={"/viewflight/" + row._id + "/" + cabinclass+"/"+numofresseats}>
                          <IconButton color="primary" aria-label="upload picture" component="span" id={row._id}>
                            <PreviewIcon />
                          </IconButton>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
      </div>
      );
    
  


}
