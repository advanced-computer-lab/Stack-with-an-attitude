import './App.css';
import Addflights from "./Addflight" ;
import Schedule from "./Schedule";
import AdminPage from "./AdminPage";
import MainPage from "./MainPage";
import MainPageLoggedIn from "./MainPageLoggedIn";
import Updateflight from "./Updateflight";
import {BrowserRouter as Router , Route ,Routes,useParams } from 'react-router-dom';
import Searchflight from './Searchflight';
import SearchflightUser from './SearchflightUser';
import ViewFlight from './ViewFlight';
import PlaneView from './PlaneView';
import ViewProfile from './ViewProfile';
import ViewFlightHandler from './viewFlightHandler';
import ViewReturnFlight from './ViewReturnFlight';
import SearchReturnFlight from './SearchReturnFlight';
import Cancelflight from './Cancelflight';
import Cancres from './Cancres';


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
    <Router>
      <Routes>
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/' element={<MainPage/>} />
            <Route path='/user' element={<MainPageLoggedIn/>} />
            <Route path='/user/profile/:id' element={<ViewProfile/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
            <Route path='/searchflight' element={<Searchflight/>} />
            <Route path='/searchflightuser' element={<SearchflightUser/>} />
            <Route path='/viewflight/:id' element={<ViewFlightHandler />} />
            <Route path='/PlaneView/:id' element={<PlaneView/>} />
            <Route path='/viewflight/:id' element={<ViewFlight/>} />
            <Route path='/viewreturnflight/:id' element={<ViewReturnFlight/>} />
            <Route path='/searchreturnflight/:from/:to' element={<SearchReturnFlight/>} />
            <Route path='/viewflight/:id/:cabinclass/:numofresseats' element={<ViewFlight/>} />
            <Route path='/cancelflight' element={<Cancelflight/>} />
            <Route path='/Cancres' element={<Cancres/>} />
      </Routes>
    </Router>
  );
}

export default App;
