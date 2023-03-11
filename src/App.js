
// import './App.css';
import './dist/output.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';



// Components
import NavigationBar from './components/NavigationBar/NavigationBar';
import MainComponent from './components/Parts/MainComponent';


function App() {


  return (
    <>
      <Router>  
          {/* <NavigationBar /> */}
        <Routes>
           <Route path="/" element={ <MainComponent />} />
            {/* <Route path="/trucks" element={ <TruckSideBarContainer /> } /> */}
            {/* <Route path="trucks/add" element={ <NewTruckComponent /> } /> */}
            {/* <Route path="/trucks/:truckId" element={ <TruckDetailComponent />} /> */}
            {/* <Route path="parts/add" element={ <NewPartComponent />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
