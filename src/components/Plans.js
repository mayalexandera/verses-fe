import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import PlanCard from "./PlanCard";

class Plans extends React.Component {
  componentDidMount() {
    this.props.initFetchPlans();
    this.props.fetchUser();
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

  deletePlanHandler = () => {
    this.props.userPlanDelete();
    this.props.initFetchPlans();
  };

  renderText = () => {
    return this.props.error_message ===
      "You currently have a subscription.  Would you like to change your plan?"
      ? "Yes"
      : "See Plans";
  };

  clickHandler = () => {
    this.props.error_message ===
    "You currently have a subscription.  Would you like to change your plan?"
      ? this.deletePlanHandler()
      : this.props.initFetchPlans();
  };

  renderHandler = () => {
    let signUpResponse;
    if (this.props.error_message) {
      signUpResponse = (
        <div>
          <div className='title'>{this.props.error_message}</div>
          <button
            className='row'
            id='plan-route-button'
            onClick={(e) => this.clickHandler(e)}
          >
            {this.renderText()}
          </button>
        </div>
      );
    } else {
      signUpResponse = <div>{this.renderPlans()}</div>;
    }
    return signUpResponse;
  };

  render() {
    return (
      <div className='row plan-box'>
        <li id='plan-header'>Join Us</li>
        <hr id='plan-title-hr' />
        <div>{this.renderHandler()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.plan.loading,
    current_user: state.auth.current_user,
    current_plan: state.plan.current_plan,
    plans: state.plan.select,
    error: state.plan.error,
    error_message: state.plan.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPlanMembership: (plan_id) =>
      dispatch(actions.initPlanMembership(plan_id)),
    userPlanDelete: () => dispatch(actions.userPlanDelete()),
    initFetchPlans: () => dispatch(actions.initFetchPlans()),
    fetchUser: () => dispatch(actions.fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
