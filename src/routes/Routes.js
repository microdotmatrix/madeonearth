import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import MadeOnEarth from '../components/madeonearth/MadeOnEarth';

const ProductPage = lazy((() => import('../components/productPage/ProductPage')));

const Routes = () => {
  return (
    <Switch>
      <Route exact path ='/' component={ MadeOnEarth } />
      {/* <Route exact path ='/productpage/:productId' component={ ProductPage } /> */}
      <Route exact path ='/productpage/:productId' render={(props) => <ProductPage {...props} />} />
    </Switch>
  )
};

export default Routes;