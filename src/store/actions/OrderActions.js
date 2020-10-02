import api from "../apis/api";
import * as actionTypes from "./actionTypes";
import * as actions from "../actions/index";


export const initOrder = () => async (dispatch, getState) => {
  let user = getState().auth.userId 
  dispatch(startOrder())
  await api.post(`/users/${user}/orders/`)
  .then(resp => dispatch(orderSuccess(resp.data)))
  .catch(error => {
    dispatch(orderFailed(error))
  })
}

export const fetchOrders = () => async (dispatch, getState) => {
  let user = getState().auth.userId;
  dispatch(startOrder())
  await api.get(`/users/${user}/orders/`)
  .then(resp => {
    console.log(resp) 
    dispatch(fetchOrderSuccess(resp.data))
  })
  .catch(error => {
    dispatch(orderFailed(error))
  });
}

export const startOrder = () => {
  return {
    type: actionTypes.START_ORDER
  }
}

export const orderFailed = (error) => {
  return {
    type: actionTypes.ORDER_FAILED, payload: error.message
  }
}

export const deleteOrder = (order_id) => async (dispatch, getState) => {
  let user = getState().auth.userId 
  console.log(user, order_id)
  await api.delete(`users/${user}/orders/`, {
    params: {
      user_id: user.value
    }
  })
  .then(dispatch({type: actionTypes.DELETE_ORDER, payload: order_id}))
}

export const orderSuccess = (order) => {
  actions.refreshCart()
  return {
    type: actionTypes.ORDER_SUCCESS, payload: order
  }
}

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS, payload: orders
  }
}