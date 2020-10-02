import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  error: null,
  loading: false,
};

const startOrder = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const orderSuccess = (state, action) => {
  if (action.payload.length < 1 || action.payload === state.orders) {
    return state;
  } else {
    const updated = [];
    state.orders.map((order) => {
      updated.push({ ...order });
    });
    action.payload.map((order) => {
      updated.push({ order });
    });
    return updateObject(state, {
      orders: [...updated],
      error: null,
      loading: false,
    });
  }
};

const fetchOrderSuccess = (state, action) => {
  if (action.payload.length < 1 || action.payload === state.orders) {
    return updateObject(state, { orders: [] });
  } else if (action.payload.length === 1) {
    return updateObject(state, {
      orders: action.payload,
      loading: false,
      error: null,
    });
  } else {
    return updateObject(state, {
      orders: [...action.payload],
      loading: false,
      error: null,
    });
  }
};

const orderFailed = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false,
  });
};

const deleteOrder = (state, action) => {
  const updated = [];
  state.orders.map((order) => {
    if (order.id !== action.payload) {
      updated.push({ ...order });
    }
  });
  return updateObject(state, {
    orders: [...updated],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_ORDER:
      return startOrder(state, action);
    case actionTypes.DELETE_ORDER:
      return deleteOrder(state, action);
    case actionTypes.ORDER_FAILED:
      return orderFailed(state, action);
    case actionTypes.ORDER_SUCCESS:
      return orderSuccess(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
