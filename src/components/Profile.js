import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import ProfileHeader from "./ProfileHeader";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPlan();
    this.props.initFetchPlans();
  }

  renderUser = () => {
    return this.props.current_user && this.props.current_user ? (
      <>
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
      </>
    ) : null;
  };

  renderPlan = () => {
    return this.props.current_plan && this.props.current_plan ? (
      <div className='profile-plan-container'>
        <div className='profile-plan'>{this.props.current_plan.id}</div>
      </div>
    ) : null;
  };

  render() {
    return (
      <>
        <div className='profile-header-wrapper'>
          <div className='profile-header-container'>
            <ProfileHeader />
          </div>
          <div className='spacer' />
        </div>
        <div className='profile-section-wrapper'>{this.renderUser()}</div>
        {/* <div className='profile-plan-wrapper'>{this.renderPlan()}</div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    current_plan: state.plan.current_plan,
    favorites: state.favorite.favorites,
    plans: state.plan.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
    fetchUserPlan: () => dispatch(actions.fetchUserPlan()),
    initFetchPlans: () => dispatch(actions.initFetchPlans()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
