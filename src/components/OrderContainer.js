import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class OrderContainer extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrders = () => {
    if (this.props.orders && this.props.orders) {
      return this.props.orders.map((order) => {
        return (
          <div className='order-card'>
            <div className='row order-item'>
              <span>Order Date:</span> {order.order_date.slice(0,10)}
            </div>

            <div className='row order-item'>
              <span>Total: </span>
              {order.total_cost_string}
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div className='orders-container'>
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
