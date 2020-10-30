import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class Layout extends React.Component {
  componentDidMount() {
    this.props.initBrands();
    this.props.initProducts();
    this.props.initAccessories();
    this.props.initFetchPlans();
  }

  render() {
    return <main>{this.props.children}</main>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    current_user: state.auth.current_user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initProducts: () => dispatch(actions.initProducts()),
    initAccessories: () => dispatch(actions.initAccessories()),
    initBrands: () => dispatch(actions.initBrands()),
    initFetchPlans: () => dispatch(actions.initFetchPlans()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
