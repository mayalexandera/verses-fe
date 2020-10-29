import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  select: [],
  accessories: [],
  show: [],
  images: [],
  sizes: [],
  error: null,
  loading: false,
};

const setProducts = (state, action) => {
  return updateObject(state, {
    select: [...action.payload.products],
    error: null,
    loading: false,
  });
};

const setAccessories = (state, action) => {
  return updateObject(state, {
    accessories: [...action.payload.products],
    error: null,
    loading: false,
  });
};

const setShowProduct = (state, action) => {
  const array = action.payload.images.split(",");
  return updateObject(state, {
    show: { ...action.payload },
    images: array,
    sizes: [...action.payload.size_range.split(",")],
  });
};

const fetchProductsFailed = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_BY_BRAND:
      return setProducts(state, action);
    case actionTypes.FETCH_PRODUCTS_BY_CATEGORY:
      return setProducts(state, action);
    case actionTypes.FETCH_PRODUCTS_BY_SIZE:
      return setProducts(state, action);
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.SET_ACCESSORIES:
      return setAccessories(state, action);
    case actionTypes.SET_SHOW_PRODUCT:
      return setShowProduct(state, action);
    case actionTypes.FETCH_PRODUCTS_FAILED:
      return fetchProductsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
