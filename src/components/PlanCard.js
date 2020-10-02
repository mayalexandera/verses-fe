import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/index";

const PlanCard = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    return props.current_user && !props.current_user.subscribed
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
    return !props.current_plan || props.plan.id !== props.current_plan.plan_id
      ? "Choose Plan"
      : "Current Plan";
  };

  const renderId = () => {
    //guests
    if (!props.current_user || props.current_user === null)
      return "plan-option";

    //members with or without plan membership
    return !props.current_plan || props.plan.id !== props.current_plan.plan_id
      ? "plan-option"
      : "current-plan";
  };

  return (
    <div className='col span-1-of-3'>
      <div className='plan-card'>
        <div className='col plan-outer'>
          <React.Fragment>
            <ul className='plan-card-details'>
              <li className='plan-title'>{props.plan.name}</li>
              <li id='plan-price'>
                {props.plan.price_string}
                <span>/month</span>
              </li>
              <li className='plan-subtitle'>{props.plan.description}</li>
            </ul>
          </React.Fragment>
        </div>
        <hr id='plan-hr' />
        <div className='plan-card-details'>
          <ul className='plan-bullet-points'>
            <li>4 items at a time</li>
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
  return {
    current_user: state.auth.current_user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPlanMembership: (plan_id) =>
      dispatch(actions.initPlanMembership(plan_id)),
    userPlanDelete: () => dispatch(actions.userPlanDelete()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanCard);
