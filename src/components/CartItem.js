import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
  
const CartItem = (props) => {
  let cart_item;
  if(props.cart_items && props.cart_items !== undefined) {
    cart_item = props.cart_items.filter(
      (item) => item.product_id === props.product.id
    )
  };



  const clickHandler = (e) => {
    e.preventDefault();
    e.target.value === "delete"
      ? props.removeProductFromCart(cart_item[0])
      : console.log("hi");
    props.addCartToFavorite(
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
          <img alt={props.product.name} src={props.product.images.split(",")[0]} />
          <ul className='cart-item-details-container'>
            <li className='cart-item-title'>{props.brand.name}</li>
            <li className='cart-item-subtitle'>{props.product.name}</li>
            <li className='cart-item-subtitle'>{props.product.price_string}</li>
            <li className='cart-item-subtitle'>
              <span>SIZE: </span>
              {props.cart_item.size_string}
            </li>
            <li className='cart-item-subtitle'>
              <span>QUANTITY: </span>
              {props.cart_item.quantity}
            </li>
          </ul>
          <button
            onClick={(e) => clickHandler(e)}
            id='remove-from-cart-button'
            value='delete'
          >
            REMOVE
          </button>
          <button
            onClick={(e) => clickHandler(e)}
            id='remove-from-cart-button'
            value='favorite'
          >
            FAVORITE
          </button>
        </div>
      ) : (
        <div>loading</div>
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
      dispatch(actions.addCartToFavorite(user_id, product_id, size, cart_item_id)),
    removeProductFromCart: (cart_item) =>
      dispatch(actions.removeProductFromCart(cart_item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
