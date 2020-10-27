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
  return updateObject(state, {
    loading: true,
    error: null,
    message: null,
  });
};

const addProductToCart = (state, action) => {
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

const updateCartProductSize = (state, action) => {
  let cart_item = state.cart_items.filter(item => item.id === action.payload.cart_item.id)[0]
  const updatedCart = []

  state.cart_items.map(cartItem => {
    if (cartItem.id !== cart_item.id) {
      updatedCart.push({...cartItem})
    }
  })
  
  updatedCart.push({...action.payload.cart_item})
  return updateObject(state, {
    cart_items: [...updatedCart],
    error: null,
    message: null,
    cart_total: action.payload.cart.total_cost_string,
    loading: false,
  })
}

const updateCartProductQty = (state, action) => {
  let cart_item = state.cart_items.filter(
    (item) => item.id === action.payload.cart_item.id
  )[0];
  const updatedCart = [];

  state.cart_items.map((cartItem) => {
    if (cartItem.id !== cart_item.id) {
      updatedCart.push({ ...cartItem });
    }
  });
  
  updatedCart.push({ ...action.payload.cart_item });
  return updateObject(state, {
    cart_items: [...updatedCart],
    error: null,
    message: null,
    cart_total: action.payload.cart.total_cost_string,
    loading: false,
  });
}

const removeProductFromCart = (state, action) => {
  let cart_item = state.cart_items.filter((item) => item.id === action.payload);
  const updatedCart = [];

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
