import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const PlanCard = (props) => {
  const clickHandler = (e) => {
    e.preventDefault();
    props.initPlanMembership(props.plan.id);
  };

  const renderText = () => {
return (props.current_plan_membership === null ||
  props.plan.id !== props.current_plan_membership.plan_id)
  ? "Try Now"
  : "Current Plan";
  };

  const renderId = () => {
return (props.current_plan_membership === null ||
  props.plan.id !== props.current_plan_membership.plan_id)
  ? "plan-option"
  : "current-plan";
  };

  return (
    <div className='plan-card'>
      <div className='plan-card-body'>
        <div className='plan-card-details'>
          <ul className='plan-title'>Up to</ul>
          <p>{props.plan.items} </p>
          <span>items per month</span>
          <li className='plan-description'>{props.plan.description}</li>
        </div>
        <hr id='order-hr' />
        <div className='plan-card-features'>
          <ul className='plan-bullet-points'>
            {props.plan.features.split(",").map((feature) => {
              return (
                <li>
                  <ion-icon name='checkmark'></ion-icon>
                  <span>{feature}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div id='plan-button'>
          <button
            plan={props.plan.id}
            id={renderId()}
            value='button'
            onClick={(e) => clickHandler(e)}
          >
            {renderText()}
          </button>
        </div>
        <div className='plan-price'>
          <span>{props.plan.price_string}</span> <p>/month</p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanCard);
