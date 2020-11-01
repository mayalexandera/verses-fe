import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  error: null,
  loading: null, 
  authRedirectPath: "/",
  current_user:null,
};

const authStart = (state) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.session_token,
    userId: action.user.id,
    current_user: {...action.user},
    loading: false,
    error: null
  });
};

const fetchUserFail = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error.message,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
    current_user: null,
    error: null,
    cart: [],
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return fetchUserFail(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default reducer;
