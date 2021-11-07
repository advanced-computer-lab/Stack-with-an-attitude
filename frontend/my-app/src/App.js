import './App.css';
import Addflights from "./Addflight" ;
import Schedule from "./Schedule";
import MainPage from "./MainPage";
import Updateflight from "./Updateflight";
import {BrowserRouter as Router , Route ,Routes } from 'react-router-dom';

// import {Switch} from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
            <Route path='/updateflight/:id' element={<Updateflight/>}/>
      </Routes>
    </Router>
  );
}

export default App;
