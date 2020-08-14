import React, { Component, Suspense } from 'react';
// import React, { Suspense } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from './routes/Routes';

// import Logo from './asset/IMG_1131.gif';


// TODO: 
// Clear all code except the functional App component towards bottom
// Move code base to MadeOnEarth.js
// Make sure Route is connected

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <div className='app'>
          <Routes />
        </div>
      </Suspense>
    </Router>
  )
};

export default App;
