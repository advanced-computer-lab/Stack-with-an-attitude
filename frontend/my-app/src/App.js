import {BrowserRouter as Router , Route ,Routes,useParams, Navigate } from 'react-router-dom';
import './App.css';
import Addflights from "./Admin/Addflight" ;
import Schedule from "./Admin/Schedule";
import AdminPage from "./Admin/AdminPage";
import MainPage from "./User/MainPage";
import MainPageLoggedIn from "./User/MainPageLoggedIn";
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
import Cancelflight from './Admin/Cancelflight';
import AdminLogIn from './Admin/AdminLogIn';
import HomeIcon from '@mui/icons-material/Home';
import Header from 'components/Header/Header.js';
import HeaderLinksLoggedIn from 'components/Header/HeaderLinksLoggedIn.js';
import { ReactComponent as Logo } from './User/Logo.svg';
import {Link} from 'react-router-dom'

function App() {



  return (
    <Router>
      <Routes>
            <Route path='/addFlight' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/admin/login" />:<Addflights/>}/>
            <Route path='/admin/login' element={(localStorage.getItem("isAdminLoggedIn") == true)?<Navigate  to="/admin" />:<AdminLogIn/>}/>
            <Route path='/admin' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/admin/login" />:<AdminPage/>}/>
            <Route path='/cancelflight' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/admin/login" />:<Cancelflight/>}/>
            <Route path='/schedule' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/admin/login" />:<Schedule/>}/>
            <Route path='/searchflight' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/admin/login" />:<Searchflight/>}/>
            <Route path='/updateflight/:id' element={(!localStorage.getItem("isAdminLoggedIn") || localStorage.getItem("isAdminLoggedIn") == false)?<Navigate  to="/admin/login" />:<Updateflight/>}/>

            {/* <Route path='/admin' element={<AdminPage/>} /> */}
            {/* <Route path='/admin/login' element={<AdminLogIn/>} /> */}
            <Route path='/' element={<MainPage/>} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/user' element={<MainPageLoggedIn/>} />
            <Route path='/user/profile/:id' element={<ViewProfile/>} />
            {/* <Route path='/schedule' element={<Schedule/>} /> */}
            {/* <Route path='/addFlight' element={<Addflights/>} /> */}
            {/* <Route path='/updateflight/:id' element={<Updateflight/>}/> */}
            {/* <Route path='/searchflight' element={<Searchflight/>} /> */}
            <Route path='/searchflightuser' element={<SearchflightUser/>} />
            <Route path='/yourreservedflights/:id' element={<Reservedflights/>} />
            {/* <Route path='/viewflight/:id' element={<ViewFlightHandler />} /> */}
            <Route path='/PlaneView/:id' element={<PlaneView/>} />
            {/* <Route path='/viewflight/:id' element={<ViewFlight/>} /> */}
            <Route path='/viewreturnflight/:id' element={<ViewReturnFlight/>} />
            {/* <Route path='/searchreturnflight/:from/:to' element={<SearchReturnFlight/>} /> */}
            <Route path='/viewflight/:id/:cabinclass/:numofresseats' element={<ViewFlightHandler/>} />
            {/* <Route path='/cancelflight' element={<Cancelflight/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
