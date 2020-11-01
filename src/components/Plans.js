import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import PlanCard from "./PlanCard";

class Plans extends React.Component {
  componentDidMount() {
    this.props.fetchUserPlan();
  }

  renderPlans = () => {
    return this.props.loading ? (
      <div>loading</div>
    ) : (
      this.props.plans.map((plan) => {
        return <PlanCard current_plan_membership={this.props.current_plan_membership} plan={plan} />;
      })
    );
  };

  render() {
    let result;
    this.props.error !== 204
      ? (result = this.renderPlans())
      : (result = (
          <div>
            <div className='plan-message'>
              <div className='spacer-20' />
              {this.props.message.split(". ").map((line) => {
                return <p>{line}</p>;
              })}
            </div>
            <div id='plan-button'>
              <button
                id='plan-route-button'
                onClick={() => this.props.userPlanDelete()}
              >
                Yes
              </button>
              <button id='plan-route-button' onClick={() => this.props.fetchUserPlan()}>
                No
              </button>
            </div>
          </div>
        ));
    return (
      <div className='plan-background'>
        <div className='plan-header'>Pick a Plan</div>
        <div className='plan-header-subtitle'>
          <p>
            Become a member to access a forever-evolving closet of
            identity-affirming designer clothing, accessories, and more.
          </p>
          <hr id='plan-hr' />
          <em>No commitments. Pause or cancel at any time.</em>
        </div>
        <div className=' plan-box'>
          <div>{result}</div>
          <div>{() => this.renderPlans()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.plan.loading,
    current_plan_membership: state.plan.current_plan_membership,
    plans: state.plan.select,
    error: state.plan.error,
    message: state.plan.message,
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
