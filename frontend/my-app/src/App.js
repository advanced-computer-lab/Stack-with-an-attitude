import {BrowserRouter as Router , Route ,Routes,useParams,Navigate } from 'react-router-dom';
import './App.css';
import Addflights from "./Admin/Addflight" ;
import Schedule from "./Admin/Schedule";
import AdminPage from "./Admin/AdminPage";
import MainPage from "./User/MainPage";
import MainPageLoggedIn from "./User/MainPageLoggedIn";
import PaymentConfirm from "./User/PaymentConfirm"
import Updateflight from "./Admin/Updateflight";
import Searchflight from './Admin/Searchflight';
import SearchflightUser from './User/SearchflightUser';
import Reservedflights from './User/Reservedflights';
import PlaneView from './User/PlaneView';
import ViewProfile from './User/ViewProfile';
import LogIn from './User/LogIn';
import Register from './User/Register';
import ViewFlightHandler from './User/viewFlightHandler';
import ViewReturnFlight from './User/ViewReturnFlight';
import ForbiddenAccess from './Admin/ForbiddenAccess';
import HomeIcon from '@mui/icons-material/Home';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './User/Logo.svg';
import {Link} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
             <Route path='/denied' element={<ForbiddenAccess/>} />
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/' element={<MainPage/>} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/user' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<MainPageLoggedIn/>}/>
            <Route path='/user/profile/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<ViewProfile/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
            <Route path='/searchflight' element={<Searchflight/>} />
            <Route path='/searchflightuser' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<SearchflightUser/>} />
            <Route path='/yourreservedflights/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<Reservedflights/>} />
            {/* <Route path='/viewflight/:id' element={<ViewFlightHandler />} /> */}
            <Route path='/PlaneView/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<PlaneView/>} />
            {/* <Route path='/viewflight/:id' element={<ViewFlight/>} /> */}
            <Route path='/viewreturnflight/:id' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<ViewReturnFlight/>} />
            {/* <Route path='/searchreturnflight/:from/:to' element={<SearchReturnFlight/>} /> */}
            <Route path='/viewflight/:id/:cabinclass/:numofresseats' element={!localStorage.getItem("userID")?<Navigate  to="/login" />:<ViewFlightHandler/>} />
      </Routes>
    </Router>
  );
}

export default App;
