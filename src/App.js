
import './dist/output.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';



// Components
import MainComponent from './components/Parts/MainComponent';


function App() {


  return (
    <>
      <Router>  
        <Routes>
          <Route path="/" element={ <MainComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
