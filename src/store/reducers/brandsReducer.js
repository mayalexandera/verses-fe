import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  select: [],
  show: [],
  error: false,
};

const setShowBrand = (state, action) => {
  return updateObject(state, {
    show: { ...action.brand },
  });
};

const setBrands = (state, action) => {
  return updateObject(state, { select: [...action.brands] });
};

const fetchBrandsFailed = (state) => {
  return updateObject(state, { error: true });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BRANDS:
      return setBrands(state, action);
    case actionTypes.SET_SHOW_BRAND:
      return setShowBrand(state, action);
    case actionTypes.FETCH_BRANDS_FAILED:
      return fetchBrandsFailed(state, action);
    default:
      return state;
  }
};


export default reducer;
