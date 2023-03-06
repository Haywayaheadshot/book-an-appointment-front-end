import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/logInPage" element={<LogIn />} />
          <Route exact path="/landingPage" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
