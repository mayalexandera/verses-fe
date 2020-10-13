import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class AppHeader extends React.Component {
  render() {
    return (
      <nav className='nav-container'>
        <div className='nav-bar'>
          <div className='nav-links'>
            <NavLink className='nav-link-button' to='/brands'>
              Designers
            </NavLink>
            <NavLink className='nav-link-button' to='/products'>
              Clothing
            </NavLink>
            <NavLink className='nav-link-button' to='/accessories'>
              Accessories
            </NavLink>
            <NavLink className='nav-link-button' to='/plans'>
              Plans
            </NavLink>
            <div className='user-menu'>
              <NavLink className='nav-link-button' to='/favorites'>
                <ion-icon size='large' name='heart-outline'></ion-icon>
              </NavLink>
              <NavLink className='nav-link-button' to='/profile'>
                <ion-icon size='large' name='person-outline'></ion-icon>
              </NavLink>
              <NavLink className='nav-link-button' to='/cart'>
                <ion-icon size='large' name='cart-outline'></ion-icon>
              </NavLink>
              {this.props.token !== null ? (
                <NavLink
                  onClick={(e) => this.props.logout(e)}
                  className='nav-link-button'
                  to='/'
                >
                  Log Out
                </NavLink>
              ) : (
                <NavLink className='nav-link-button' to='/login'>
                  Log In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (e) => dispatch(actions.logout(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);