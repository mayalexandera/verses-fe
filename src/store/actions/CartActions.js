import api from "../apis/api";
import * as actionTypes from "../actions/actionTypes";

export const addProductToCart = (user_id, product_id, size) => async (
  dispatch
) => {
  await api
    .post(`/users/${user_id}/cart/cart_items`, {
      product_id: JSON.stringify(product_id),
      size: size,
    })
    .then((resp) =>
      dispatch({
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: resp.data,
      })
    )
    .catch((err) => dispatch(addProductToCartFailed(err)));
};

export const addCartToFavorite = (
  member_id,
  product_id,
  size,
  cart_item_id
) => async (dispatch) => {
  await api
    .post(`/users/${member_id}/favorites`, {
      member_id: member_id,
      product_id: JSON.stringify(product_id),
      size: size,
      cart_item_id: JSON.stringify(cart_item_id),
    })
    .then(dispatch(removeProductFromCart(cart_item_id)));
};

export const initCart = () => async (dispatch, getState) => {
  dispatch(startFetchCart());
  let user = getState().auth.userId;
  await api
    .get(`/users/${user}/cart`)
    .then((response) => {
      dispatch(setCart(response.data));
    })
    .catch((error) => {
      dispatch(fetchCartFailed(error));
    });
};

export const startFetchCart = () => {
  return {
    type: actionTypes.START_FETCH_CART,
  };
};

export const refreshCart = () => async (dispatch, getState) => {
  let user = getState().auth.userId;
  await api
    .delete(`/users/${user}/cart/refresh`)
    .then((response) => dispatch(setCart(response)));
};

export const fetchCartFailed = (error) => {
  return {
    type: actionTypes.FETCH_CART_FAILED,
    payload: error,
  };
};

export const addProductToCartFailed = (err) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART_FAILED,
    payload: err,
  };
};

export const setCart = (cart) => {
  return {
    type: actionTypes.SET_CART,
    payload: cart,
  };
};

export const removeProductFromCart = (cart_item_id) => async (
  dispatch,
  getState
) => {
  let user = getState().auth.userId;
  await api
    .delete(`/users/${user}/cart/cart_items/`, {
      params: { item_id: cart_item_id },
    })
    .then(
      dispatch({
        type: actionTypes.REMOVE_PRODUCT_FROM_CART,
        payload: cart_item_id
      })
    );
};