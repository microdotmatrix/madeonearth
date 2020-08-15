import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import MadeOnEarth from '../components/madeonearth/MadeOnEarth';

const Routes = () => {
  return (
    <Switch>
      <Route path ='/' exact component={ MadeOnEarth } />
      {/* <Route path ='Selected product' component={ ProductPage } /> */}
    </Switch>
  )
};

export default Routes;