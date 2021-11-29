import './App.css';
import Addflights from "./Addflight" ;
import Schedule from "./Schedule";
import AdminPage from "./AdminPage";
import MainPage from "./MainPage";
import Searchflight from './searchFlight';
import Updateflight from "./Updateflight";
import {BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
import Searchflight from './Searchflight';

// import {Switch} from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/' element={<MainPage/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
            <Route path='/searchflight' element={<Searchflight/>} />
      </Routes>
    </Router>
  );
}

export default App;
