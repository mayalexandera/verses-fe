import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import CartItem from "./CartItem";

class Cart extends React.Component {
  componentDidMount() {
    this.props.initCart();
  }

  clickHandler = (e) => {
    e.preventDefault();
    e.target.value === "plans"
      ? this.props.history.push("/plans")
      : this.authorized();
  };

  authorized = () => {
    !this.props.current_user.plan_membership_id
      ? this.props.history.push("/plans")
      : this.props.initOrder();
  };

  renderText = () => {
    return this.props.cart_id !== null
      ? "Submit"
      : "You must be a subscriber to place orders";
  };

  value = () => {
    return this.props.cart_id !== null ? "submit" : "plans";
  };

  findProduct = (item) => {
    let product;
    product = this.props.products.filter(
      (product) => product.id === item.product_id
    );
    return product !== undefined ? product[0] : null;
  };

  findBrand = (product) => {
    let brand;
    if (product !== undefined && product !== null) {
      brand = this.props.brands.filter(
        (brand) => brand.id === product.brand_id
      );
      return brand[0];
    } else {
      return null;
    }
  };

  renderList = () => {
    if (this.props.error_message)
      return (
        <div className='title-placeholder'>{this.props.error_message}</div>
      );

    return this.props.cart_items === undefined ? (
      <div className='guest-message'>
        {" "}
        <div>You should subscribe... </div>
      </div>
    ) : (
      this.props.cart_items.map((item) => {
        let product = this.findProduct(item);
        let brand = this.findBrand(product);
        return (
          <CartItem
            cart_item={item}
            brand={brand}
            key={item.id}
            product={product}
          />
        );
      })
    );
  };

  render() {
    return (
      <section>
        <div className='col span-4-of-9 product-cart-container'>
          {this.renderList()}
          <button
            value={this.value()}
            className='product-nav-centered cart-re-route'
            id='favorite-card-button'
            onClick={(e) => this.clickHandler(e)}
          >
            {this.renderText()}
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart_id: state.cart.cart_id,
    current_user: state.auth.current_user,
    member_id: state.cart.member_id,
    cart_items: state.cart.cart_items,
    products: state.product.select,
    brands: state.brand.select,
    error_message: state.cart.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initCart: () => dispatch(actions.initCart()),
    addToCart: (user_id, product_id, size) =>
      dispatch(actions.addProductToCart(user_id, product_id, size)),
    removeProductFromCart: (user_id, product_id, size) =>
      dispatch(actions.removeProductFromCart(user_id, product_id, size)),
    initOrder: () => dispatch(actions.initOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
