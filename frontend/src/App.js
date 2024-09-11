import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import components
import Nav from './components/Navbar/Navbar';
import Ticket from './components/Ticket/Ticket';
import Login from './components/LogIn/Login';


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Nav />
        
        <Routes>

          {/* routes for Private Components */}
            <Route path='/' element={<Login/>} />
            <Route path='/ticket' element={<Ticket/>} />
        </Routes>

      </BrowserRouter>
      
    </div>
   
  );
}
