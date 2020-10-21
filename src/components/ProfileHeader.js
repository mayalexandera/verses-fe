import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class ProfileHeader extends React.Component {
  
  render() {
    return (
      <nav className='profile-nav-container'>
          <NavLink
            value='Profile'
            className='profile-nav-link-button'
            to='/profile'
          >
            Profile
          </NavLink>
          <NavLink
            value='Orders'
            className='profile-nav-link-button'
            to='/orders'
          >
            Orders
          </NavLink>
          <NavLink
            value='Favorites'
            className='profile-nav-link-button'
            to='/favorites'
          >
            Favorites
          </NavLink>
          <NavLink
            value='Settings'
            className='profile-nav-link-button'
            to='/settings'
          >
            Settings
          </NavLink>
        </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
