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
            <div className='order-card-thumbnail-wrapper'>
              <img
                alt={order.number}
                src={this.props.products[0].images.split(",")[0]}
              />
            </div>
            <div className='order-card-details'>
              <p>
                <span>Ordered:</span> {order.ordered_date}
              </p>
              <p>
                <span>Order</span>#{order.number}
              </p>
            </div>
            <div className='order-history-buttons'>
              <button>
                View or Manage
              </button>
              <button>
                Shop Similar
              </button>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <>
        <div className='order-title'>Orders</div>
        <div className='orders-container'>
          <> {this.renderOrders()}</>
          
        </div>
      </>
    );
  }
}

const msp = (state) => {
  console.log(state);
  return { orders: state.order.orders, order_items: state.order.order_items, products: state.product.select };
};

const mdp = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(msp, mdp)(OrderContainer);
