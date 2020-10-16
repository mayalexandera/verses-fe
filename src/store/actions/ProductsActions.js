import api from "../apis/api";
import * as actionTypes from "./actionTypes";
import * as actions from "../actions/index";

export const fetchProdByBrand = (brand_id) => async (dispatch) => {
  await api
    .get(`/products/`, {
      params: {
        brand_id: brand_id,
      },
    })
    .then((resp) => {
      dispatch(setProducts(resp.data));
    })
    .catch((err) => {
      dispatch(fetchProductsFailed(err));
    });
};

export const fetchProdByCategory = (category) => async (dispatch) => {
  await api
    .get(`/products/`, {
      params: {
        category: category,
      },
    })
    .then((resp) => {
      dispatch(setProducts(resp.data));
    })
    .catch((err) => {
      dispatch(fetchProductsFailed(err));
    });
};

export const fetchProdBySize = (size) => async (dispatch) => {
  await api
    .get(`/products/`, {
      params: {
        size: size,
      },
    })
    .then((resp) => {
      dispatch(setProducts(resp.data));
    })
    .catch((err) => {
      dispatch(fetchProductsFailed(err));
    });
};

export const fetchProductsFailed = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILED,
    payload: error,
  };
};

export const setProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const setShowProduct = (product) => async (dispatch) => {
  await dispatch(actions.setShowBrand(product.brand_id)).then(
    dispatch({ type: actionTypes.SET_SHOW_PRODUCT, payload: product })
    );
    console.log(product)
};

export const initProducts = () => async (dispatch) => {
  await api
    .get(`/products/`)
    .then((resp) => {
      dispatch(setProducts(resp.data));
    })
    .catch((error) => {
      dispatch(fetchProductsFailed(error));
    });
};

export const fetchShowProduct = (prod_id) => async (dispatch) => {
  await api
    .get(`products/${prod_id}`)
    .then((resp) => {
      dispatch(setShowProduct(resp.data));
    })
    .catch((error) => {
      dispatch(fetchProductsFailed(error));
    });
};
