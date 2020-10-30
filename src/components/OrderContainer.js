import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import ProfileHeader from "./ProfileHeader";
class OrderContainer extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrders = () => {
    if (this.props.orders !== undefined && this.props.orders !== undefined) {
      return this.props.orders.map((order) => {
        return order.order_items !== undefined
          ? order.order_items.map((item) => {
              return (
                <OrderItem key={item.id} order_item={item} order={order} />
              );
            })
          : null;
      });
    }
  };

  render() {
    return (
      <div className='section-orders-wrapper'>
        <div className='section-orders'>
          <div className='order-title'>
            <p>
              <strong>Orders</strong>
            </p>
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
              Click <strong>'View or Manage'</strong> to cancel an order, track
              a shipment, or start a return.
            </p>
          </div>
        </div>
        <div className='orders-container-wrapper'>
          <div className='orders-container'>
            <hr id='order-hr' />
            <div> {this.renderOrders()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
