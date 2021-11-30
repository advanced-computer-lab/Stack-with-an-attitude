import './App.css';
import Addflights from "./Addflight" ;
import Schedule from "./Schedule";
import AdminPage from "./AdminPage";
import MainPage from "./MainPage";
import MainPageUser from "./MainPageUser";
import Updateflight from "./Updateflight";
import {BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
import Searchflight from './Searchflight';
import SearchflightUser from './SearchflightUser';
import ViewFlight from './ViewFlight';
import PlaneView from './PlaneView';

// import {Switch} from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/' element={<MainPage/>} />
            <Route path='/user' element={<MainPageUser/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
            <Route path='/searchflight' element={<Searchflight/>} />
            <Route path='/searchflightuser' element={<SearchflightUser/>} />
            <Route path='/viewflight/:id' element={<ViewFlight/>} />
            <Route path='/PlaneView/:id' element={<PlaneView/>} />
      </Routes>
    </Router>
  );
}

export default App;
