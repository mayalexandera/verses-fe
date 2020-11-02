import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const CartItem = (props) => {
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8];

  let quantity = props.cart_item.quantity;
  let size = props.cart_item.size_string;

  const clickHandler = (e) => {
    e.preventDefault();
    e.target.value === "delete"
      ? props.removeProductFromCart(props.cart_item.id)
      : props.addCartToFavorite(
          props.product.id,
          props.cart_item.size_id,
          props.product.size_string,
          props.cart_item.id
        );
  };

  const sizeChangeHandler = (e) => {
    e.preventDefault();
    size = e.target.value;
    props.updateCartProductSize(props.cart_item, size);
  };

  const quantityChangeHandler = (e) => {
    e.preventDefault();
    quantity = e.target.value;
    props.updateCartProductQty(props.cart_item, quantity, size);
  };

  return (
    <div>
      {props.product && props.product ? (
        <div className='cart-item-card'>
          <div className='cart-item-card-photo-wrapper'>
            <img
              alt={props.product.name}
              src={props.product.images.split(",")[0]}
            />
          </div>
          <div className='cart-item-details-container'>
            <div className='cart-item-price'>{props.product.price_string}</div>
            <p>{props.brand.name}</p> {props.product.name}
            <div className='cart-item-details'>
              <p>Size: </p>
              <select
                className='sizes-dropdown'
                onChange={(e) => sizeChangeHandler(e)}
              >
                {props.product && props.product
                  ? props.product.size_range.split(",").map((size, index) => {
                      return (
                        <option
                          selected={size === props.cart_item.size_string}
                          value={size}
                          key={index}
                        >
                          {size}
                        </option>
                      );
                    })
                  : console.log(props)}
              </select>
              <p>Quantity:</p>
              <select
                className='sizes-dropdown'
                onChange={(e) => quantityChangeHandler(e)}
              >
                {props.product && props.product
                  ? quantities.map((quantity, index) => {
                      return (
                        <option
                          selected={quantity === props.cart_item.quantity}
                          value={quantity}
                          key={index}
                        >
                          {quantity}
                        </option>
                      );
                    })
                  : console.log(props)}
              </select>
            </div>
            <div className='cart-item-buttons'>
              <button
                onClick={(e) => clickHandler(e)}
                id='remove-from-cart-button'
                value='favorite'
              >
                Move To Favorites
              </button>
              <button
                onClick={(e) => clickHandler(e)}
                id='remove-from-cart-button'
                value='delete'
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        console.log(props)
      )}
      <hr id='order-hr' />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart_items: state.cart.cart_items,
    brands: state.brand.select,
    products: state.product.select,
    loading: state.cart.loading,
    error: state.cart.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartToFavorite: (product_id, size_id, size, cart_item_id) =>
      dispatch(
        actions.addCartToFavorite(product_id, size_id, size, cart_item_id)
      ),
    removeProductFromCart: (cart_item_id) =>
      dispatch(actions.removeProductFromCart(cart_item_id)),
    updateCartProductSize: (cart_item, size) => {
      dispatch(actions.updateCartProductSize(cart_item, size));
    },
    updateCartProductQty: (cart_item, quantity, size) => {
      dispatch(actions.updateCartProductQty(cart_item, quantity, size));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
