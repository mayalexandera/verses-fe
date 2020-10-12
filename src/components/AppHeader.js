import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class AppHeader extends React.Component {

  render() {
    return (
      <nav className='nav-container'>
        <div className='row'>
          <div className='nav-bar'>
            <div className='nav-links'>
              <ul className='main-nav'>
                <li>
                  <Link to='/brands'>
                    <span id='button'>DESIGNERS</span>
                  </Link>
                </li>
                <li>
                  <Link to='/products'>
                    <span id='button'>CLOTHING</span>
                  </Link>
                </li>
                <li>
                  <Link to='/accessories'>
                    <span id='button'>
                      ACCESSORIES
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to='/plans'>
                    <span id='button'>PLANS</span>
                  </Link>
                </li>
              </ul>
              <ul className='user-menu'>
                <span>
                  {this.props.token !== null ? (
                    <>
                    <Link to='/favorites'>
                      <ion-icon size='large' name='heart-outline'></ion-icon>
                    </Link>
                    <Link to='/profile'>
                      <ion-icon size='large' name='person-outline'></ion-icon>
                    </Link>
                    <Link to='/cart'>
                      <ion-icon size='large' name='cart-outline'></ion-icon>
                    </Link>
                    <Link to='/login'>
                      <span id='button' onClick={(e) => this.props.logout(e)}>
                        LOGOUT
                      </span>
                    </Link>
                    </>
                  ) : (
                    <>
                    <Link to='/login'>
                      <ion-icon size='large' name='heart-outline'></ion-icon>
                    </Link>
                    <Link to='/login'>
                      <ion-icon size='large' name='person-outline'></ion-icon>
                    </Link>
                    <Link to='/login'>
                      <ion-icon size='large' name='cart-outline'></ion-icon>
                    </Link>
                    <Link to='/login'>
                      <span id='button'>SIGN UP | LOG IN</span>
                    </Link>
                    </>
                  )}
                </span>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    token: state.auth.token,
    favorites: state.favorite.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (e) => dispatch(actions.logout(e)),
    initProducts: () => dispatch(actions.initProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
