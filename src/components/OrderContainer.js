import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import ProfileHeader from "./ProfileHeader";
import { Link } from "react-router-dom";

class OrderContainer extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrders = () => {
    if (this.props.orders && this.props.orders) {
      return this.props.orders.map((order) => {
        if (order.order_items && order.order_items) {
          return order.order_items.map((item) => {
            let product_item;
            product_item = this.props.products.filter(
              (prod) => prod.id === item.product_id
            );
            return (
              <OrderItem key={item.id} product_item={product_item} order_item={item} order={order} />
              
            );
          });
        }
      });
    }
  };

  render() {
    return (
      <div className='section-orders'>
        <div className='header-wrapper'>
          <div className='order-title'><p>Orders</p>
          <ProfileHeader/>
          </div>
          <hr id='order-hr' />
          <div className='spacer'/>
        </div>
          <div className='orders-container'>
            <> {this.renderOrders()}</>
          </div>
      </div>
    );
  }
}

const msp = (state) => {
  console.log(state);
  return {
    orders: state.order.orders,
    order_items: state.order.order_items,
    products: state.product.select,
  };
};

const mdp = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(msp, mdp)(OrderContainer);
