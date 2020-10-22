import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const CartItem = (props) => {
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let cart_item, quantity=props.cart_item.quantity, size=props.cart_item.size_string;
  if (props.cart_items.count !== 0 && props.cart_items.count !== 0) {
    cart_item = props.cart_items.filter(
      (item) => item.product_id === props.product.id
    );
  }

  const clickHandler = (e) => {
    e.preventDefault();
    e.target.value === "delete"
      ? props.removeProductFromCart(cart_item[0].id)
      : props.addCartToFavorite(
          props.userId,
          props.product.id,
          props.cart_item.size_string,
          props.cart_item.id
        );
  };

  const sizeChangeHandler = (e) => {
    e.preventDefault()
    console.log(size)
    size = e.target.value
    console.log(size, props.cart_item)
  }

    const quantityChangeHandler = (e) => {
      e.preventDefault();
      console.log(quantity);
      quantity = e.target.value;
      console.log(quantity);
    };

  return (
    <div>
      {!props.error && !props.loading ? (
        <div className='cart-item-card'>
          <img
            alt={props.product.name}
            src={props.product.images.split(",")[0]}
          />
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
                  ? props.product.size_range.split(",").map((size) => {
                      return (
                        <option
                          selected={size === props.cart_item.size_string}
                          value={size}
                        >
                          {size}
                        </option>
                      );
                    })
                  : null}
              </select>
              <p>Quantity:</p>
              <select
                className='sizes-dropdown'
                onChange={(e) => quantityChangeHandler(e)}
              >
                {props.product && props.product
                  ? quantities.map((quantity) => {
                      return (
                        <option
                          selected={quantity === props.cart_item.quantity}
                          value={quantity}
                        >
                          {quantity}
                        </option>
                      );
                    })
                  : null}
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
        "loading"
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    cart_items: state.cart.cart_items,
    loading: state.cart.loading,
    error: state.cart.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCartToFavorite: (user_id, product_id, size, cart_item_id) =>
      dispatch(
        actions.addCartToFavorite(user_id, product_id, size, cart_item_id)
      ),
    removeProductFromCart: (cart_item_id) =>
      dispatch(actions.removeProductFromCart(cart_item_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
