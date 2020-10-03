import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class OrderContainer extends React.Component {
  componentDidMount() {
       this.props.fetchOrders()
  }

  renderError = () => {
    console.log("in render order");
    return (
      <>
        <div className='title-placeholder'>You must be a subscriber to place orders</div>
        <Link to={"/plans/"}>
          <button id='plan-option' value='button'>
            See Subscriptions
          </button>
        </Link>
      </>
    );
  };


  renderOrders = () => {
    if (this.props.orders && this.props.orders){
    return this.props.orders.map((order) => {
      return (
        <div className='order-card'>
          <div className='row order-item'>
            <span>Order Date:</span> {order.order_date}
          </div>

          <div className='row order-item'>
            <span>Total: </span>
            {order.total_cost_string}
          </div>

        </div>
      );
    });
  }}

  render() {
    return (
      <div className='row order-box section-order'>
          <div className='order-title'>Order History</div>
          <> {this.renderOrders()}</>
        </div>
    );
  }
}

const msp = (state) => {
  return { orders: state.order.orders };
};

const mdp = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(msp, mdp)(OrderContainer);
