import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  select: [],
  error: null,
  loading: false,
};

const updateFavorites = (state, action) => {
  let updatedFavorites = [{...action.payload}]
  state.select.map(fave => updatedFavorites = [...updatedFavorites, {...fave}])
  return updateObject(state, {
    select: updatedFavorites,
  });
};

const deleteFavorite = (state, action) => {
  let updatedFavorites = [];

  state.select.map((fave) => {
    return fave.id !== action.payload ? updatedFavorites = [...updatedFavorites, {...fave}]: null
  });
  return updateObject(state, {
    select: updatedFavorites,
  });
};

const startFetchFavorites = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  });
};

const setFavorites = (state, action) => {
  let favorites = [];
  action.payload.map((product) => {
    favorites.push({...product});
  });
  return updateObject(state, {
    select: favorites,
    loading: false,
    error: null,
  });
};

const fetchFavoritesFailed = (state) => {
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
