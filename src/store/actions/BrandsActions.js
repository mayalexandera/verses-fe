import api from "../apis/api";
import * as actionTypes from "./actionTypes";

export const setShowBrand = (brand_id) => async (dispatch, getState) => {
  let brands = getState().brand.select 
  let brand = brands.filter(brand => brand.id === brand_id)
  console.log(brand_id)
  dispatch({ type: actionTypes.SET_SHOW_BRAND, brand: brand[0]});
}

export const initBrands = () => async (dispatch) => {
  await api
    .get(`/brands/`)
    .then((resp) => {
      dispatch(setBrands(resp.data));
    })
    .catch((error) => {
      dispatch(fetchBrandsFailed(error));
    });
};

export const setBrands = (brands) => {
  return {
    type: actionTypes.SET_BRANDS,
    brands: brands
  }
}

export const fetchBrandsFailed = (error) => {
  return {
    type: actionTypes.FETCH_BRANDS_FAILED,
    payload: error,
  };
};