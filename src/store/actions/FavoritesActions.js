import api from "../apis/api";
import * as actionTypes from "./actionTypes";

import _ from "lodash";

export const initFavorites = () => async (dispatch, getState) => {
  console.log("in init");
  let user = getState().auth.userId;
  dispatch(startFetchFavorites());
  await api
    .get(`/users/${user}/favorites`)
    .then((resp) => {
      dispatch(setFavorites(resp.data));
    })
    .catch((error) => {
      dispatch(fetchFavoritesFailed(error));
    });
};

export const addFavoriteToCart = (
  user_id,
  product_id,
  size,
  favorite_id
) => async (dispatch) => {
  await api
    .post(`/users/${user_id}/cart/cart_items`, {
      user_id: user_id,
      product_id: JSON.stringify(product_id),
      size: size,
      favorite_id: JSON.stringify(favorite_id),
    })
    .then(dispatch(deleteFavorite(favorite_id)));
};

export const startFetchFavorites = () => {
  return {
    type: actionTypes.START_FETCH_FAVORITES,
  };
};

export const fetchFavoritesFailed = (error) => {
  return {
    type: actionTypes.FETCH_FAVORITES_FAILED,
    payload: error,
  };
};

export const setFavorites = (favorites) => {
  return {
    type: actionTypes.SET_FAVORITES,
    payload: favorites,
  };
};

export const deleteFavorite = (favorite_id) => async (dispatch, getState) => {
  let user_id = getState().auth.userId;
  let id = JSON.stringify(favorite_id);
  console.log(user_id, favorite_id);
  await api
    .delete(`/users/${user_id}/favorites/${id}`, {
      params: {
        user_id: user_id.value,
        favorite_id: JSON.stringify(favorite_id),
      },
    })
    .then(
      dispatch({ type: actionTypes.DELETE_FAVORITE, payload: favorite_id })
    );
};

export const createFavorite = (user_id, product_id, size) => async (
  dispatch
) => {
  console.log(size);
  await api
    .post(`/users/${user_id}/favorites`, {
      member_id: user_id,
      product_id: product_id,
      size: size,
    })
    .then((response) =>
      dispatch({ type: actionTypes.CREATE_FAVORITE, payload: response.data })
    );
};
