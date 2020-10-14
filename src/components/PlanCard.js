import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/index";

const PlanCard = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    return props.current_user && props.current_user.subscribed === false
      ? signUp()
      : deletePlan();
  };

  const signUp = () => {
    props.initPlanMembership(props.plan.id);
  };

  const deletePlan = () => {
    props.userPlanDelete();
  };

  const renderText = () => {
    if (!props.current_plan || !props.current_plan.plan_membership)
      return "Choose Plan";
    else if (props.current_plan.plan_membership.plan_id !== props.plan.id) {
      return "Choose Plan";
    } else {
      return "Current Plan";
    }
  };

  const renderId = () => {
    //guests
    if (props.current_plan === undefined || props.current_plan === null)
      return "plan-option";

    //members with or without plan membership
    return !props.current_plan.plan_membership ||
      props.plan.id !== props.current_plan.plan_membership.plan_id
      ? "plan-option"
      : "current-plan";
  };

  return (
    <div className='col span-1-of-3'>
      <div className='plan-card'>
        <React.Fragment>
          <div className='plan-card-details'>
            <ul className='plan-title'>Up to</ul>
            <p>{props.plan.items} </p>
            <span>items per month</span>
            <li className='plan-description'>{props.plan.description}</li>
          </div>
          <hr id='plan-hr' />
        </React.Fragment>
      <div className='plan-card-details'>
        <ul className='plan-bullet-points'>
          <li><ion-icon name="checkmark"></ion-icon>4 items at a time</li>
          <li>5,000+ items from 50+ designers</li>
          <li>Wear items with retail value up to $350</li>
          <li>Monthly shipments worth up to $1,400</li>
        </ul>
      </div>
      <div id='plan-button'>
        {props.current_user ? (
          <button
          plan={props.plan.id}
          id={renderId()}
          value='button'
          onClick={(e) => clickHandler(e)}
          >
            {renderText()}
          </button>
        ) : (
          <NavLink to='/login' activeStyle={{ color: "white" }}>
            <button plan={props.plan.id} id={renderId()} value='button'>
              TRY NOW
            </button>
          </NavLink>
        )}
      </div>
    </div>
        </div>
  );
};
const mapStateToProps = (state) => {
  return { current_user: state.auth.current_user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPlanMembership: (plan_id) =>
      dispatch(actions.initPlanMembership(plan_id)),
    userPlanDelete: () => dispatch(actions.userPlanDelete()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanCard);
