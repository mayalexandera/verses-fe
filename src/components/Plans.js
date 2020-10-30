import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import PlanCard from "./PlanCard";

class Plans extends React.Component {

  renderPlans = () => {
    return this.props.loading ? (
      <div>loading</div>
    ) : (
      this.props.plans.map((plan) => {
        return <PlanCard plan={plan} current_plan={this.props.current_plan}/>;
      })
    );
  };

  render() {
    let result;
    this.props.message === null
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
              <button id='plan-route-button' onClick={() => this.reload()}>
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
        <div className='spacer' />
        <div className=' plan-box'>
          <div>{result}</div>
          <div>{() => this.renderPlans()}</div>
        </div>
        <div className='spacer' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.plan.loading,
    plans: state.plan.select,
    current_plan: state.plan.current_plan,
    message: state.plan.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initFetchPlans: () => dispatch(actions.initFetchPlans()),
    fetchUserPlan: () => dispatch(actions.fetchUserPlan()),
    userPlanDelete: () => dispatch(actions.userPlanDelete())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
