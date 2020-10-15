import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const CartItem = (props) => {
  let cart_item;
  if (props.cart_items && props.cart_items !== undefined) {
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
              <p>Size: </p> {props.cart_item.size_string}

              <ion-icon
                id='arrow-button'
                size='small'
                name='chevron-down-outline'
              ></ion-icon>

              <p>Quantity:</p>
              {props.cart_item.quantity}

              <ion-icon
                id='arrow-button'
                size='small'
                name='chevron-down-outline'
                onClick={() => console.log(props.product.size_range)}
              ></ion-icon>

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
