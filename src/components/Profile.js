import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import ProfileHeader from "./ProfileHeader";
import Favorites from "./Favorites";

class Profile extends React.Component {

  componentDidMount = () => {
    this.props.fetchUser()
    this.props.fetchUserPlan()
  }

  renderUser = () => {
    return this.props.current_user && this.props.current_user ? (
      <section className='profile-section-container'>
        <div className='profile-section'>
          <p className='profile-photo' />
          <div className='profile-title'>
            <p>
              <strong>{this.props.current_user.name}</strong>
            </p>
            <p className='profile-subtitle'>Verses member since June 2016</p>
          </div>
        </div>
      </section>
    ) : null;
  };

  renderPlan = () => {
    if (
      this.props.current_plan &&
      this.props.current_plan
    ) {
      return (
        <div className='profile-plan'>
          <p>Current Plan</p>
          <strong>{this.props.current_plan.items} </strong>items per
          month |
          <strong>{this.props.current_plan.price_string}</strong>
          /month
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div className='profile-header-wrapper'>
          <div className='profile-header-container'>
            <ProfileHeader />
          </div>
        </div>
        <div className='spacer' />
        <div className='profile-section-wrapper'>
          {this.renderUser()}
          {this.renderPlan()}
        </div>
        <div className='spacer' />
        <hr id='order-hr' />
        <div className='section-favorites-wrapper'>
          <div className='order-title'>
            <p>
              <strong>Favorites</strong>
            </p>
          </div>
          <Favorites />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    current_plan: state.plan.current_plan,
    favorites: state.favorite.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
    initFavorites: () => dispatch(actions.initFavorites()),
    fetchUserPlan: () => dispatch(actions.fetchUserPlan())  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
