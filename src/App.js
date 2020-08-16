import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from './routes/Routes';

// import Logo from './asset/IMG_1131.gif';


const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
          <Routes />
      </Suspense>
    </Router>
  )
};

export default App;
