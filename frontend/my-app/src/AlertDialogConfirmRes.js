import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import axios from 'axios' ;

export default function AlertDialogConfirmRes(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = async (e) => {

    await axios.post(`http://localhost:8000/user/createReservedFlight`,{'reservation':props.reservation})
    .then(data => console.log('CREATED!'));

    handleClose();
   // props.state([]);
    
  }
  return (
    <div>
        <Button  value="Submit" aria-label="delete" variant="contained" onClick={handleClickOpen} disabled={numOfchildren+numOfadults != numofresseats} endIcon={< EventSeatIcon />} id={props.id}>
            Reserve
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Reservation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to confirm this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    




  );
}