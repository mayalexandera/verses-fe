import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class Layout extends React.Component {
  componentDidMount() {
    this.props.initBrands();
    this.props.initProducts();
    this.props.fetchUser();
    this.props.initFavorites();
    this.props.fetchOrders();
  }

  render() {
    return <main>{this.props.children}</main>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    current_user: state.auth.current_user,
    current_plan: state.plan.current_plan,
    products: state.product.select,
    brands: state.brand.select,
    favorites: state.favorite.select,
    orders: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initProducts: () => dispatch(actions.initProducts()),
    initBrands: () => dispatch(actions.initBrands()),
    initFavorites: () => dispatch(actions.initFavorites()),
    fetchUser: () => actions.fetchUser(),
    fetchOrders: () => actions.fetchOrders(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
