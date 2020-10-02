import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: localStorage.getItem("token"),
  userId: JSON.parse(localStorage.getItem("user")),
  error: null,
  loading: null,
  current_user: null,
 
};

const authStart = (state, action) => {
  return updateObject(state, { error: null });
};

const authSuccess = (state, action) => {
  console.log(action)
  localStorage.setItem("token", action.idToken);
  localStorage.setItem("user", action.userId);
  console.log(localStorage)
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};


const fetchUserStart = (state, action) => {
  return updateObject(state, {error: null, loading: true})
}

const fetchUserFail = (state, action) => {
  return updateObject(state, { error: true, loading: false,})
}

const fetchUserSuccess = (state, action) => {
  console.log('in ftchUser', action.payload)
  return updateObject(state, {error: null, current_user: action.user, loading: false})
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    current_user: null,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, current_user: null, cart: [], });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_START:
      return fetchUserStart(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return fetchUserFail(state, action);

    default:
      return state;
  }
};

export default reducer;
