import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import OrderContainer from "./OrderContainer";

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderPlan = () => {
    return this.props.current_user && this.props.current_user.subscribed ? (
      <div className='row product-nav-centered'>
        <div className='profile-title row'>
          <span className='profile-title'>Your Plan:</span> <div className='product-show-title'>{this.props.current_user.plan_membership.plan_name}</div>
        </div>
      </div>
    ) : null;
  };

  renderUser = () => {
    return this.props.current_user && this.props.current_user ? (
      <div>
        <div className='profile-title'>
          <div className='title-placeholder' ><li className='row secondaryFont'>{this.props.current_user.name}</li></div>
          {/* {this.renderPlan()} */}
        </div>
      </div>
    ) : ( null
    );
  };

  render() {
    return (
      <div>
        <div className='box'>
          {this.renderUser()}
        </div>
        <OrderContainer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    favorites: state.favorite.favorites,
    products: state.favorite.products,
    loading: state.auth.loading,
    cart: state.cart.cart,
    cart_items: state.cart.cart_items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);