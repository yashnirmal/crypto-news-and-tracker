import './App.css';
import Exchange from './components/Exchange';
import Navbar from './components/Navbar'
import Newscontainer from './components/Newscontainer';
import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";
import Bottom from './components/Bottom';
import SingleCoin from './components/SingleCoin';

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Exchange/>} exact />
        <Route path="/news" element={<Newscontainer/>} />
        <Route path="/crypto" element={<Navigate replace to="/"/>} />
        <Route path="/coin/:id" element={<SingleCoin /> } />
      </Routes>
      
      <Bottom/>
    </>
  );
}

export default App;
