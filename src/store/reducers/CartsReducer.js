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
  console.log(state, action);
  if (action.payload !== null) {
    return updateObject(state, {
      cart_id: action.payload.id,
      member_id: action.payload.member_id,
      cart_items: action.payload.cart_items,
      cart_total: action.payload.total_cost_string,
      loading: false,
      error: null,
      message: null,
    });
  }
};

const startFetchCart = (state, action) => {
  console.log(state, action.payload);
  return updateObject(state, {
    loading: true,
    error: null,
    message: null,
  });
};

const addProductToCart = (state, action) => {
  console.log(state.cart_items);
  let updatedCart;
  if (state.cart_items !== [] || state.cart_items !== "undefined") {
    updatedCart = [...state.cart_items, { ...action.payload }];
  } else {
    updatedCart = [action.payload];
  }

  return updateObject(state, {
    cart_items: [...updatedCart],
    error: null,
    loading: false,
    message: null,
  });
};

const removeProductFromCart = (state, action) => {
  console.log(state, action);
  let cart_item = state.cart_items.filter((item) => item.id === action.payload);
  console.log(cart_item);
  const updatedCart = [];

  console.log(action.payload, updatedCart);
  state.cart_items.map((cartItem) => {
    if (cartItem.id !== action.payload[1]) {
      updatedCart.push({ ...cartItem });
    }
  });
  return updateObject(state, {
    cart_items: [...updatedCart],
    error: false,
    message: null,
    cart_total: action.payload[0]
  });
};

const fetchCartFailed = (state, action) => {
  console.log(state, action.payload.message);
  return updateObject(state, {
    error: true,
    loading: false,
    message: "You must be a subscriber to place orders",
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CART:
      return setCart(state, action);
    case actionTypes.ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(state, action);
    case actionTypes.FETCH_CART_FAILED:
      return fetchCartFailed(state, action);
    case actionTypes.START_FETCH_CART:
      return startFetchCart(state, action);
    default:
      return state;
  }
};

export default reducer;
