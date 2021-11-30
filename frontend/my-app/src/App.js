import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream
=======
import Addflights from "./Addflight" ;
import Schedule from "./Schedule";
import MainPage from "./MainPage";
import Updateflight from "./Updateflight";
import {BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
import Searchflight from './Searchflight';
import Cancelflight from './Cancelflight';
import Cancres from './Cancres';


// import {Switch} from 'react-router';
>>>>>>> Stashed changes

function App() {



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





   
  











  





  return (
<<<<<<< Updated upstream
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
    <Router>
      <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
            <Route path='/searchflight' element={<Searchflight/>} />

            <Route path='/cancelflight' element={<Cancelflight/>} />


            <Route path='/Cancres' element={<Cancres/>} />

      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
