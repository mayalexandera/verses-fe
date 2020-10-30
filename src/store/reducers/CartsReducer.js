// import { updateCartProductSize } from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  cart_id: null,
  member_id: null,
  cart_items: [],
  error: null,
  cart_total: null,
  loading: false,
  message: null,
};

const setCart = (state, action) => {
  return updateObject(state, {
    cart_id: action.payload.cart.id,
    member_id: action.payload.cart.member_id,
    cart_items: action.payload.cart_items,
    cart_total: action.payload.cart.total_cost_string,
    loading: false,
    error: null,
    message: null,
  });
};

const startFetchCart = (state) => {
  return updateObject(state, {
    loading: true,
    error: false,
    message: null,
  });
};

const cartLogout = (state) => {
  return updateObject(state, {
    cart_id: null,
    member_id: null,
    cart_items: [],
    error: null,
    cart_total: null,
    loading: false,
    message: null,
  });
}

const addProductToCart = (state, action) => {
  let updatedCart;
  if (state.cart_items !== [] || state.cart_items !== undefined) {
    updatedCart = [...state.cart_items, { ...action.payload.cart_item }];
  } else {
    updatedCart = [action.payload.cart_item];
  }

  return updateObject(state, {
    cart_items: [...updatedCart],
    error: null,
    loading: false,
    message: null,
  });
};

const updateCartProductSize = (state, action) => {
  let cart_item = state.cart_items.filter(
    (item) => item.id === action.payload.cart_item.id
  )[0];
  let updatedCart = [];

  state.cart_items.map((cartItem) => {
    return (cartItem.id !== cart_item.id) ? updatedCart = [...updatedCart,{ ...cartItem }] : updatedCart
  });

  updatedCart.push({ ...action.payload.cart_item });
  return updateObject(state, {
    cart_items: [...updatedCart],
    error: null,
    message: null,
    cart_total: action.payload.cart.total_cost_string,
    loading: false,
  });
};

const updateCartProductQty = (state, action) => {
  let cart_item = state.cart_items.filter(
    (item) => item.id === action.payload.cart_item.id
  )[0];
  let updatedCart = [action.payload.cart_item];

  state.cart_items.map((cartItem) => {
    return cartItem.id !== cart_item.id ? updatedCart = [...updatedCart, { ...cartItem }] : updatedCart
    })

  return updateObject(state, {
    cart_items: [...updatedCart],
    error: null,
    message: null,
    cart_total: action.payload.cart.total_cost_string,
    loading: false,
  });
};

const removeProductFromCart = (state, action) => {
  const updatedCart = [];

  action.payload.cart_items.map((item) => updatedCart.push({ ...item }));

  return updateObject(state, {
    cart_items: [...updatedCart],
    error: false,
    message: null,
    cart_total: action.payload.cart_total,
  });
};

const fetchCartFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false,
    message: action.payload.message,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGOUT:
      return cartLogout(state, action)
    case actionTypes.SET_CART:
      return setCart(state, action);
    case actionTypes.ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(state, action);
    case actionTypes.UPDATE_CART_PRODUCT_SIZE:
      return updateCartProductSize(state, action);
    case actionTypes.UPDATE_CART_PRODUCT_QTY:
      return updateCartProductQty(state, action);
    case actionTypes.FETCH_CART_FAILED:
      return fetchCartFailed(state, action);
    case actionTypes.START_FETCH_CART:
      return startFetchCart(state, action);
    default:
      return state;
  }
};

export default reducer;
