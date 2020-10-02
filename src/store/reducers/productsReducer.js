import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  select: [],
  show: [],
  images: [],
  sizes: [],
  error: null,
  loading: false,
};

const setProducts = (state, action) => {
  console.log("in set products",action.payload);
  return updateObject(state, {
    select: [...action.payload.products],
    error: false,
    loading: null,
  });
};

const setShowProduct = (state, action) => {
  const array = action.payload.images.split(",");
  console.log(state, array);
  return updateObject(state, {
    show: { ...action.payload },
    images: array,
    sizes: [...action.payload.size_range.split(",")],
  });
};

const fetchProductsFailed = (state, action) => {
  console.log(state, action.payload);
  return updateObject(state, { error: true });
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
    case actionTypes.SET_SHOW_PRODUCT:
      return setShowProduct(state, action);
    case actionTypes.FETCH_PRODUCTS_FAILED:
      return fetchProductsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
