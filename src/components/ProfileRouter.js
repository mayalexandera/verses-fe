import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Cart from "./Cart";
import Profile from "./Profile";
import Favorites from "./Favorites";
import OrderContainer from "./OrderContainer";
import ProfileHeader from "./ProfileHeader";
import Settings from "./Settings";

export const ProfileRouter = (props) => {
  return (
    <div className='row'>
      <Router>
        <ProfileHeader />
        <div className='rapper-whatever'>
          <Route path='/cart' exact component={Cart} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/orders' exact component={OrderContainer} />
          <Route path='/favorites' exact component={Favorites} />
          <Route path='/settings' exact component={Settings} />
          <Redirect to='/' />
        </div>
      </Router>
    </div>
  );
};
