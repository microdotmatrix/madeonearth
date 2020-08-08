import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
// import MadeOnEarth from '../components/merchContianer/MerchContainer';

const Routes = () => {
  return (
    <Switch>
      <Route path ='/' exact component={ MadeonEarth } />
    </Switch>
  )
};

export default Routes;