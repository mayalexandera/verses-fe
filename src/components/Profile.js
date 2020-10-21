import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import OrderContainer from "./OrderContainer";
import ProfileHeader from "./ProfileHeader";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderUser = () => {
    return this.props.current_user && this.props.current_user ? (
      <div>
        <section className='profile-card-wrapper'>
          <div className='profile-card'>
            <p className='profile-photo' />
            <div className='profile-title'>
              <p>{this.props.current_user.name}</p>
              <p className='profile-subtitle'>Verses member since June 2016</p>
          </div>
          </div>
        </section>
      </div>
    ) : null;
  };

  render() {
    return (
      <div className='header-wrapper'>
        <ProfileHeader/>
        <div className='spacer'/>
          {this.renderUser()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    favorites: state.favorite.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
