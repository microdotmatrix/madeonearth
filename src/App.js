import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';

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
