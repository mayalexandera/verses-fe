import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import ProfileHeader from "./ProfileHeader";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderUser = () => {
    return this.props.current_user && this.props.current_user ? (
      <div>
        <section className='profile-card-container'>
          <div className='profile-card'>
            <p className='profile-photo' />
            <div className='profile-title'>
              <p><strong>{this.props.current_user.name}</strong></p>
              <p className='profile-subtitle'>Verses member since June 2016</p>
          </div>
          </div>
        </section>
      </div>
    ) : null;
  };

  render() {
    return (
      <div>
        <div className='profile-header-wrapper'>
          <div className='profile-header-container'><ProfileHeader/></div>
          <div className='spacer'/>
        </div>
            <div className='profile-card-wrapper'>{this.renderUser()}</div>
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
