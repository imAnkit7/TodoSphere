import { useState, createContext } from 'react';
import './App.css';
import History from './components/History';
import Login from './components/Login';
import Mytodos from './components/Mytodos';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from './components/ForgotPassword';
const HistLenContext = createContext();
function App() {
  const [completedCount, setCompletedCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <HistLenContext.Provider value={{completedCount,setCompletedCount}}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/mytodos" element={<Mytodos />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="/history" element={<History />} /> */}
          </Routes>
        </HistLenContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
export { HistLenContext }