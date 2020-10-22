import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import CartItem from "./CartItem";

class Cart extends React.Component {
  componentDidMount() {
    this.props.initCart();
    this.props.fetchUser();
  }

  clickHandler = (e) => {
    e.preventDefault();
    this.props.current_user === null
      ? this.props.history.push("/plans")
      : this.authorized();
  };

  authorized = () => {
    !this.props.current_user.plan_membership_id
      ? this.props.history.push("/plans")
      : this.props.initOrder();
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
    return this.props.cart_items === undefined || this.props.cart_items.length === 0 ? (
      <p>There are no items in your cart</p>
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
    let submitButton, message, cart, guestMessage, memberCart;
    this.props.cart_items === undefined
      ? (message = "0 Items | $0.00")
      : (message = null);
    this.props.cart_items === undefined ? (cart = "Cart") : (cart = null);

    this.props.cart_items === undefined || this.props.cart_items.length === 0
      ? (submitButton = null)
      : (submitButton = (
          <button
            id='add-to-favorites-button'
            onClick={(e) => this.clickHandler(e)}
          >
            Checkout
          </button>
        ));
    guestMessage = <div>{cart}</div>;
    this.props.current_user
      ? (memberCart = "Cart")
      : (memberCart = (
          <div>
            <div className='cart-message'>
              <p>Free Shipping for Members</p>
              <p>
                {"Become a Verses member for fast and free shipping. "}
                <a
                  className='guest-cart-link'
                  onClick={() => this.props.history.push("/login")}
                >
                  {" "}
                  Join Us
                </a>{" "}
                or
                <a
                  className='guest-cart-link'
                  onClick={() => this.props.history.push("/login")}
                >
                  {" "}
                  Log In
                </a>
              </p>
            </div>
            <div className='spacer' />
          </div>
        ));

    return (
      <div className='section-products'>
        <div className='spacer' />
        <div className='cart-container'>
          {memberCart}
          {guestMessage}
          {this.renderList()}
          <hr id='order-hr' />
        </div>

        <div className='order-summary-container'>
          <p>Summary</p>
          <div className='order-summary'>
            <div>
              <p id='order-key'>Subtotal</p>
              {this.props.cart_total}
            </div>
            <div>
              <p id='order-key'>Estimated Shipping & Handling</p>
              {"$0.00"}
            </div>
            <div>
              <p id='order-key'>Estimated Tax</p>-
            </div>
            <hr id='order-hr' />
            <div>
              <p id='order-total'>Total</p>
              {this.props.cart_total ? this.props.cart_total : "$0.00"}
            </div>
            <hr id='order-hr' />
          </div>
          {submitButton}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    cart_total: state.cart.cart_total,
    cart_items: state.cart.cart_items,
    cart_total: state.cart.cart_total,
    products: state.product.select,
    brands: state.brand.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initCart: () => dispatch(actions.initCart()),
    addToCart: (user_id, product_id, size) =>
      dispatch(actions.addProductToCart(user_id, product_id, size)),
    initOrder: () => dispatch(actions.initOrder()),
    fetchUser: () => dispatch(actions.fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
