import './App.css';
import Addflights from "./Addflights" ;
import Schedule from "./Schedule";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';

function App() {
  return (
    
    <div>
        <div className="App">
            <Route path='/schedule' exact component={Schedule} />
            <Route path='/addFlight' exact component={Addflights} />
        </div>
      

      {/* <Schedule/>
      <Addflights/> */}
    </div>
  );
}

export default App;
