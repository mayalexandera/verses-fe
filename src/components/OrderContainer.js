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
              <OrderItem
                key={item.id}
                product_item={product_item}
                order_item={item}
                order={order}
              />
            );
          });
        }
      });
    }
  };

  render() {
    return (
      <div className='section-orders-wrapper'>
        <div className='section-orders'>
          <div className='order-title'>
            <p><strong>Orders</strong></p>
            <div className='order-header-wrapper'>
              <div className='order-header-container'>
                <div className='order-header-links'>
                  <ProfileHeader />
                </div>
              </div>
            </div>
          </div>
          <hr id='order-hr' />
        </div>
        <div className='orders-message-wrapper'>
          <div className='orders-message'>
            <img
              src='https://www.nike.com/assets/experience/membership/profile/dist/2.3.4/images/shopping_wearTests_icon.svg'
              alt='manage or track order'
            />
            <p>
              Click <strong>'View or Manage'</strong> to cancel an order, track a shipment, or
              start a return.
            </p>
          </div>
        </div>
        <div className='orders-container-wrapper'>
          <div className='orders-container'>
            <hr id='order-hr' />
            <> {this.renderOrders()}</>
          </div>
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
