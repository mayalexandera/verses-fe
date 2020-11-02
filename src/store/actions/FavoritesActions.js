import api from "../apis/api";
import * as actionTypes from "./actionTypes";

export const initFavorites = () => async (dispatch, getState) => {
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
  product_id,
  size_id,
  size,
  favorite_id
) => async (dispatch, getState) => {
  let user = getState().auth.userId
  await api
    .post(`/users/${user}/cart/cart_items`, {
      product_id: JSON.stringify(product_id),
      size_id: JSON.stringify(size_id),
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
  await api
    .delete(`/users/${user_id}/favorites/${id}`, {
      params: {
        favorite_id: JSON.stringify(favorite_id),
      },
    })
    .then(
      dispatch({ type: actionTypes.DELETE_FAVORITE, payload: favorite_id })
    );
};

export const createFavorite = (product_id, size_id) => async (
  dispatch, getState
) => {
  let user = getState().auth.userId
  await api
    .post(`/users/${user}/favorites`, {
      product_id: product_id,
      size_id: size_id
    })
    .then((response) =>
      dispatch({ type: actionTypes.CREATE_FAVORITE, payload: response.data })
    );
};
