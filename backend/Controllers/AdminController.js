const Flight = require('../Models/Flight');

/*hossam
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  render() {
    return (
      <Register />
    );
  }
}

class Register extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit} noValidate >
            <div className='fullName'>
              <label htmlFor="fullName">Full Name</label>
              <input type='text' name='fullName' onChange={this.handleChange} noValidate />
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={this.handleChange} noValidate />
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={this.handleChange} noValidate />
            </div>
            <div className='info'>
              <small>Password must be eight characters in length.</small>
            </div>
            <div className='submit'>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));




handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  let errors = this.state.errors;

  switch (name) {
    case 'fullName': 
      errors.fullName = 
        value.length < 5
          ? 'Full Name must be 5 characters long!'
          : '';
      break;
    case 'email': 
      errors.email = 
        validEmailRegex.test(value)
          ? ''
          : 'Email is not valid!';
      break;
    case 'password': 
      errors.password = 
        value.length < 8
          ? 'Password must be 8 characters long!'
          : '';
      break;
    default:
      break;
  }

  this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
  })
}


let name = event.target.name;
let value = event.target.value;



const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


  this.setState({errors, [name]: value});



  handleSubmit = (event) => {
  event.preventDefault();
  if(validateForm(this.state.errors)) {
    console.info('Valid Form')
  }else{
    console.error('Invalid Form')
  }
}



const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


const {errors} = this.state;

{errors.fullName.length > 0 && 
  <span className='error'>{errors.fullName}</span>}



  {errors.email.length > 0 && 
  <span className='error'>{errors.email}</span>}



  {errors.password.length > 0 && 
  <span className='error'>{errors.password}</span>}

*/


/*Final Version
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  render() {
    return (
      <Register />
    );
  }
}

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNumber: null,
      departureTime: null,
      arrivalTime: null,
      date: null,
      economySeats: null,
      businessSeats: null,
      from: null,
      to: null,
      
      errors: {
        
         flightNumber: "",
      departureTime: "",
      arrivalTime: "",
      date: "",
      economySeats: "",
      businessSeats: "",
      from: "",
      to: "",
     

      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'flightNumber': 
        errors.flightNumber = 
          value.length <= 0
            ? 'please insert flight number!'
            : '';
        error.flightNumber=  !(value.isNaN())
            ? 'please insert a number'
            : '';
        break;
      case 'departureTime': 
        errors.departureTime = 
            !(value.matches("^([01]\d|2[0-3]):[0-5]\d$"))
            ? 'Time is not valid'
            : '';
        break;
      case 'arrivalTime': 
        errors.arrivalTime = 
           !(value.matches("^([01]\d|2[0-3]):[0-5]\d$"))
            ? 'Time is not valid'
            : '';
        break;


          case 'date': 
      errors.date = 
        !(value.Date. parse()) 
          ? 'Invalid Date!'
          : '';
      break;
      
          case 'economySeats': 
      errors.economySeats = 
       value.length < 0
            ? 'please insert amount of economy seats!'
            : '';
        error.economySeats=  !(value.isNaN())
            ? 'please insert a number'
            : '';
      break;


         case 'businessSeats': 
      errors.businessSeats = 
       value.length < 0
            ? 'please insert amount of economy seats!'
            : '';
        error.businessSeats=  !(value.isNaN())
            ? 'please insert a number'
            : '';
      break;


        case 'from': 
      errors.from = 
        value.length <= 0
          ? 'Please insert departure location'
          : '';
      break;

            
        case 'to': 
      errors.to = 
        value.length <= 0
          ? 'Please insert destination location'
          : '';
      break;

      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Success')
    }else{
      console.error('Failed')
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            
          
            
          <div className='flightNumber'>
              <label htmlFor="flightNumber">FlightNumber</label>
              <input type='text' name='flightNumber' onChange={this.handleChange} noValidate />
              {errors.flightNumber.length > 0 && 
                <span className='error'>{errors.flightNumber}</span>}
            </div>


             <div className='departureTime'>
              <label htmlFor="departureTime">DepartureTime</label>
              <input type='Number' name='departureTime' onChange={this.handleChange} noValidate />
              {errors.departureTime.length > 0 && 
                <span className='error'>{errors.departureTime}</span>}
            </div>
            
            
           



            <div className='arrivalTime'>
              <label htmlFor="arrivalTime">ArrivalTime</label>
              <input type='Number' name='arrivalTime' onChange={this.handleChange} noValidate />
              {errors.arrivalTime.length > 0 && 
                <span className='error'>{errors.arrivalTime}</span>}
            </div>




            <div className='date'>
              <label htmlFor="date">Date</label>
              <input type='text' name='date' onChange={this.handleChange} noValidate />
              {errors.date.length > 0 && 
                <span className='error'>{errors.date}</span>}
            </div>




            <div className='economySeats'>
              <label htmlFor="economySeats">EconomySeats</label>
              <input type='Number' name='economySeats' onChange={this.handleChange} noValidate />
              {errors.economySeats.length > 0 && 
                <span className='error'>{errors.economySeats}</span>}
            </div>




            <div className='businessSeats'>
              <label htmlFor="businessSeats">BusinessSeats</label>
              <input type='Number' name='businessSeats' onChange={this.handleChange} noValidate />
              {errors.businessSeats.length > 0 && 
                <span className='error'>{errors.businessSeats}</span>}
            </div>



            <div className='from'>
              <label htmlFor="from">From</label>
              <input type='text' name='from' onChange={this.handleChange} noValidate />
              {errors.from.length > 0 && 
                <span className='error'>{errors.from}</span>}
            </div>



            <div className='to'>
              <label htmlFor="to">To</label>
              <input type='text' name='to' onChange={this.handleChange} noValidate />
              {errors.to.length > 0 && 
                <span className='error'>{errors.to}</span>}
            </div>






            
            
            <div className='submit'>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
*/



exports.searchFlight = async function(req,res) {

    let flight = {};

    const query = req.query;

    if(query.flightNumber){
        flight.flightNumber = query.flightNumber; 
    }
    if(query.departureTime){
        flight.departureTime = parseInt(query.departureTime); 
    }
    if(query.arrivalTime){
        flight.arrivalTime = parseInt(query.arrivalTime);
    }
    if(query.airport){
        flight.airport = query.airport; 
    }
    // date condition missing!!!



    console.log(req.query);
    console.log(flight);
    
    const flightResults = await Flight.find(flight).exec();

    res.status(200).send(flightResults);
    // then send it to FE.
}

exports.getAllFlights = async function(req,res) {

    await Flight.find({})
            .then( (flights) => {
                res.status(200)
                res.json(flights)
            })
            .catch( (err) => {
                res.status(404)
                console.log(err)})

    // then send it to FE.
}

exports.getFlightById = async function(req,res) {

    let ID = req.params.getID

    await Flight.findById(ID)
    .then( (flights) => {
        res.status(200)
        res.json(flights)
    })
    .catch( (err) => {
        res.status(404)
        console.log(err)})
}

// router.get("/:getID", (req, res) =>

// Create FLight
exports.newFlight = async function(req,res) {

    let newFlight = new Flight(req.body.flight);
    await newFlight.save()
        .then( (flight) => {
            res.status(200)
            res.json(flight)
        })
        .catch( (err) => {
            if(err.name === "ValidationError") {
                let errors = {};
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message;
                });
          
                return res.status(400).send(errors);
              }

            res.status(500).send(err.name)
            console.log(err.message)})
}


// router.post("/", (req, res) => {


// Update Flight
exports.updateFlightById = async function(req,res) {

    let ID = req.params.updateID;

    await Flight.findByIdAndUpdate(ID, req.body.flight, {new: true})
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            if (err.name === "ValidationError") {
                let errors = {};
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message;
                });
                
                return res.status(400).send(errors);
              }

            res.status(500).send(err.name)
            console.log(err.message)})
}

// router.put("/:updateID", (req, res) => {

// Delete Flight
exports.deleteFlightById = async function(req,res) {

    let ID = req.params.deleteID;

    await Flight.findByIdAndDelete(ID)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.status(404)
            console.log(err)})
}


// router.delete("/:deleteID", (req, res) => {
