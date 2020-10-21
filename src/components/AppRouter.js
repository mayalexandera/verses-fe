import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import ProductIndex from "./ProductIndex";
import ProductShow from "./ProductShow";
import Accessories from "./Accessories";
import Plans from "./Plans";
import Landing from "./Landing";
import AppHeader from "./AppHeader";
import Brands from "./Brands";
import Cart from "./Cart";
import Profile from "./Profile";
import Favorites from "./Favorites";
import OrderContainer from "./OrderContainer";
import Auth from "./auth/Auth";

export const AppRouter = (props) => {
  return (
    <div className='row'>
      <Router>
        <AppHeader />
        <div className='rapper-whatever'>
          <Route exact path='/' exact component={Landing} />
          <Route path='/plans' exact component={Plans} />
          <Route path='/products' exact component={ProductIndex} />
          <Route path='/accessories' exact component={Accessories} />
          <Route path='/products/:product_id' exact component={ProductShow} />
          <Route exact path='/login' exact component={Auth} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/Brands' exact component={Brands} />
          <Route path='/profile' component={Profile} />
          <Route path='/orders' component={OrderContainer} />
          <Route path='/profile/update' exact component={Profile} />
          <Route path='/favorites' exact component={Favorites} />
          <Redirect to='/' />
        </div>
      </Router>
    </div>
  );
};
