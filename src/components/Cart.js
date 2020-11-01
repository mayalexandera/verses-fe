import React from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import CartItem from "./CartItem";

class Cart extends React.Component {
  componentDidMount() {
    this.props.initCart();
    this.props.fetchUserPlan();
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

  findProduct = (item_product_id) => {
    let product;
 product = this.props.products.filter(
   (product) => product.id === item_product_id
 );
 return product !== undefined ? product[0] : null;
  };

  findBrand = (product) => {
    return product !== undefined && product !== null
      ? this.props.brands.filter((brand) => brand.id === product.brand_id)[0]
      : null;
  };

  renderList = () => {
    let product, brand;
    let errorMessage = !this.props.current_user ? null : this.props.message;

    return this.props.cart_items === undefined ||
      this.props.cart_items.length === 0 ? (
      <>
        <p>There are no items in your cart</p>
        <p>{errorMessage}</p>
      </>
    ) : (
      this.props.cart_items.map((item) => {
        product = this.findProduct(item.product_id);
        brand = this.findBrand(product);
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
    let submitButton,
      plan_items,
      cart,
      cart_items_count = 0,
      guestMessage,
      memberCart;

    !this.props.current_user ? (cart = "Cart") : (cart = null);

    if (!this.props.cart_items) {
      submitButton = null;
      cart_items_count = 0;
    } else {
      submitButton = (
        <button
          id='add-to-favorites-button'
          onClick={(e) => this.clickHandler(e)}
        >
          Checkout
        </button>
      );

      this.props.cart_items.map((item) => {
        return (cart_items_count += item.quantity);
      });
    }

    this.props.current_plan
      ? (plan_items = this.props.current_plan.items)
      : (plan_items = null);

    guestMessage = <div>{cart}</div>;
    this.props.current_user && this.props.current_user
      ? (memberCart = "Cart")
      : (memberCart = (
          <div>
            <div className='cart-message'>
              <p>Free Shipping for Members</p>
              <p>
                {"Become a Verses member for fast and free shipping. "}
                <span
                  className='guest-cart-link'
                  onClick={() => this.props.history.push("/login")}
                >
                  Join Us
                </span>{" "}
                or
                <span
                  className='guest-cart-link'
                  onClick={() => this.props.history.push("/login")}
                >
                  Log In
                </span>
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
              {this.props.cart_total ? this.props.cart_total : "$0.00"}
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
          <div className='cart-quantity-message'>
            {cart_items_count <= plan_items ? (
              <p>
                You can add up to {plan_items - cart_items_count} more items.
              </p>
            ) : (
              <p>You must remove {cart_items_count - plan_items} item(s).</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.auth.current_user,
    current_plan: state.plan.current_plan,
    cart_total: state.cart.cart_total,
    cart_items: state.cart.cart_items,
    message: state.cart.message,
    products: state.product.select,
    accessories: state.product.accessories,
    brands: state.brand.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initCart: () => dispatch(actions.initCart()),
    initOrder: () => dispatch(actions.initOrder()),
    fetchUserPlan: () => dispatch(actions.fetchUserPlan()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
