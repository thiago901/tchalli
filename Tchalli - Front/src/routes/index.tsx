import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

// import Signin from '../pages/SignIn';
// import SignUp from '../pages/SignUp';

import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Sales from '../pages/Sales';
import SalesDetail from '../pages/SalesDetail';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      {/* <Route path="/" exact component={Signin} />
      <Route path="/signup" component={SignUp} /> */}

      <Route path="/" exact component={Products} />
      <Route path="/cart" component={Cart} />
      <Route path="/sales" exact component={Sales} />
      <Route path="/sales/:id" component={SalesDetail} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
