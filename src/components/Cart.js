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
    console.log(this.props)
    this.props.current_user === null
      ? this.props.history.push("/plans")
      : this.authorized();
  };

  authorized = () => {
    console.log(this.props.current_plan)
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
    return this.props.cart_items === undefined
      ? null
      : this.props.cart_items.map((item) => {
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
        });
  };

  render() {
    let submitButton, message, cart;
    this.props.cart_items === undefined
      ? (message = "0 Items | $0.00")
      : (message = null);
    this.props.cart_items === undefined ? cart = "Cart" : cart = null
      
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

    return (
      <div className='section-products'>
        <div className='guest-message'>
          {cart}
          {message}
        </div>
        <div className='span-3-of-5 cart-container'>
          Cart
          {this.renderList()}
        </div>

        <div className='span-2-of-5 order-summary-container'>
          <p>Summary</p>
          <div className='order-summary'>
            <div>
              <p id='order-key'>Subtotal</p>
              {this.props.cart_total}
            </div>
            <p id='order-key'>Estimated Shipping & Handling</p>
            <p id='order-key'>Estimated Tax</p>
            <hr />
            <p id='order-key'>Total</p>
            <hr />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
