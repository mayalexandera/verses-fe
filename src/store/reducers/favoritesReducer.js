import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  select: [],
  error: null,
  loading: false,
};

const updateFavorites = (state, action) => {
  console.log(state, action.payload);
  const updatedFavorites = [...state.select, action.payload];
  return updateObject(state, {
    select: updatedFavorites,
  });
};

const deleteFavorite = (state, action) => {
  const updatedFavorites = [];
  console.log(state, action.payload, updatedFavorites);

  state.select.map((fave) => {
    if (fave.id !== action.payload) updatedFavorites.push({ ...fave });
  });
  console.log(action.payload, updatedFavorites);

  return updateObject(state, {
    select: updatedFavorites,
  });
};

const startFetchFavorites = (state, action) => {
  console.log(state, action.payload);
  return updateObject(state, {
    loading: true,
  });
};

const setFavorites = (state, action) => {
  console.log("in set favorites", state, action.payload);
  let favorites = [];
  action.payload.forEach((product) => {
    favorites.push(product);
  });
  return updateObject(state, {
    select: favorites,
  });
};

const fetchFavoritesFailed = (state, action) => {
  console.log(state, action.payload);
  return updateObject(state, { error: true, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_FAVORITE:
      return updateFavorites(state, action);
    case actionTypes.DELETE_FAVORITE:
      return deleteFavorite(state, action);
    case actionTypes.SET_FAVORITES:
      return setFavorites(state, action);
    case actionTypes.FETCH_FAVORITES_FAILED:
      return fetchFavoritesFailed(state, action);
    case actionTypes.START_FETCH_FAVORITES:
      return startFetchFavorites(state, action);
    default:
      return state;
  }
};

export default reducer;
