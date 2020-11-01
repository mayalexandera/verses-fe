import api from "../apis/api";
import * as actionTypes from "../actions/actionTypes";

export const addProductToCart = (product_id, size_id, size) => async (
  dispatch,
  getState
) => {
  let user = getState().auth.userId;
  await api
    .post(`/users/${user}/cart/cart_items`, {
      product_id: JSON.stringify(product_id),
      size_id: size_id,
      size: size
    })
    .then((resp) => {
      dispatch({
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: resp.data,
      });
    })
    .catch((err) => dispatch(addProductToCartFailed(err)));
};

export const updateCartProductQty = (cart_item, quantity, size) => async (
  dispatch,
  getState
) => {
  let user = getState().auth.userId;
  await api
    .patch(`/users/${user}/cart/cart_items/${cart_item.id}`, {
      cart_item_id: JSON.stringify(cart_item.id),
      cart_id: JSON.stringify(cart_item.cart_id),
      product_id: JSON.stringify(cart_item.product_id),
      value: quantity,
      type: "quantity",
    })
    .then((resp) => {
      dispatch({
        type: actionTypes.UPDATE_CART_PRODUCT_QTY,
        payload: resp.data,
      });
    })
    .catch((err) => dispatch(addProductToCartFailed(err)));
};

export const updateCartProductSize = (cart_item, size) => async (
  dispatch,
  getState
) => {
  let user = getState().auth.userId;
  await api
    .patch(`users/${user}/cart/cart_items/${cart_item.id}`, {
      cart_item_id: JSON.stringify(cart_item.id),
      cart_id: JSON.stringify(cart_item.cart_id),
      product_id: JSON.stringify(cart_item.product_id),
      value: size,
      type: "size",
    })
    .then((resp) => {
      dispatch({
        type: actionTypes.UPDATE_CART_PRODUCT_SIZE,
        payload: resp.data,
      });
    })
    .catch((err) => dispatch(addProductToCartFailed(err)));
};

export const addCartToFavorite = (product_id, size, cart_item_id) => async (
  dispatch,
  getState
) => {
  let user = getState().auth.userId;
  await api.post(`/users/${user}/favorites`, {
    member_id: user,
    product_id: JSON.stringify(product_id),
    size: size,
    cart_item_id: JSON.stringify(cart_item_id),
  });
  dispatch(removeProductFromCart(cart_item_id));
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

export const addProductToCartFailed = (error) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART_FAILED,
    payload: error,
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
    .delete(`/users/${user}/cart/cart_items/${cart_item_id}`, {
      params: {
        cart_item_id: JSON.stringify(cart_item_id)
      }
    })
    .then((response) => {
      dispatch({
        type: actionTypes.REMOVE_PRODUCT_FROM_CART,
        payload: response.data,
      });
    });
};
