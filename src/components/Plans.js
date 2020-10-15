import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import PlanCard from "./PlanCard";

class Plans extends React.Component {
  componentDidMount() {
    this.props.initFetchPlans();
    this.props.fetchUserPlan();
    this.renderHandler();
  }

  renderPlans = () => {
    return this.props.loading ? (
      <div>loading</div>
    ) : (
      this.props.plans.map((plan) => {
        return <PlanCard plan={plan} current_plan={this.props.current_plan} />;
      })
    );
  };

  renderPlanActions = () => {
    return (
      <div className='title'>
        <button
          className='row'
          id='plan-route-button'
          onClick={(e) => this.changePlanHandler(e)}
        >
          Yes
        </button>
        <button
          className='profile-title'
          id='plan-route-button'
          onClick={(e) => this.unsubscribeHandler(e)}
        >
          No, I'd like to unsubscribe.
        </button>
      </div>
    );
  };

  unsubscribeHandler = () => {
    this.props.userPlanDelete();
  };

  changePlanHandler = () => {
    this.props.userPlanDelete();
    this.props.initFetchPlans();
  };

  renderText = () => {
    return this.props.error_message ===
      "You currently have a subscription.  Would you like to change your plan?"
      ? this.renderPlanActions()
      : "See Plans";
  };

  renderHandler = () => {
    let signUpResponse;
    if (this.props.error_message) {
      signUpResponse = (
        <>
          <div className='title'>{this.props.error_message}</div>
          {this.renderPlanActions()}
        </>
      );
    } else {
      signUpResponse = this.renderPlans();
    }
    return signUpResponse;
  };

  render() {
    return (
      <div className='background'>
        <div className='plan-header'>Join Us</div>
        <hr id='plan-title-hr' />
        <div className=' plan-box'>{this.renderHandler()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.plan.loading,
    current_plan: state.plan.current_plan,
    plans: state.plan.select,
    error_message: state.plan.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userPlanDelete: () => dispatch(actions.userPlanDelete()),
    initFetchPlans: () => dispatch(actions.initFetchPlans()),
    fetchUserPlan: () => dispatch(actions.fetchUserPlan()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
