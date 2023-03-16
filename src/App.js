import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import './styles/App.css';
import Main from './pages/Main';

const App = () => (
  <Router>
    <div className="">
      <Main />
    </div>
  </Router>
);

export default App;
