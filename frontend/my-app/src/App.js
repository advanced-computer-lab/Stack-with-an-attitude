import './App.css';
import Addflights from "./Addflights" ;
import Schedule from "./Schedule";
import MainPage from "./MainPage";
import {BrowserRouter as Router , Route ,Routes } from 'react-router-dom';
// import {Switch} from 'react-router';

function App() {
  return (
    <Router>
      <h1> Flight title</h1>
      <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
      </Routes>
    </Router>
  );
}

export default App;
