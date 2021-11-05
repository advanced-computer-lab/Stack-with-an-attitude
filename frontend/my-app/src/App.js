import './App.css';
import Addflights from "./Addflights" ;
import Schedule from "./Schedule";
import {BrowserRouter as Router , Route ,Routes , Switch} from 'react-router-dom';
// import {Switch} from 'react-router';

function App() {
  return (
    <Router>
      <Routes>
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/addFlight' element={<Addflights/>} />
      </Routes>
      {/* <Schedule/>
      <Addflights/> */}
    </Router>
  );
}

export default App;
