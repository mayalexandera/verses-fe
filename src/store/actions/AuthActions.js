import api from "../apis/api";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, name, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      name: name,
      returnSecureToken: true,
    };
    let path = !isSignup ? `/session` : `/users/`;

    api
      .post(path, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.session_token);
        localStorage.setItem("userId", response.data.id);
        dispatch(
          authSuccess(
            response.data.session_token,
            response.data.id,
            response.data
          )
        );
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const fetchUserStart = () => {
  return { type: actionTypes.FETCH_USER_START };
};

export const fetchUser = () => async (dispatch) => {
  let user = localStorage.getItem("userId");
  JSON.stringify(user);
  await api
    .get(`/users/${user}`)
    .then((response) => {
      dispatch(fetchUserSuccess(response.data));
    })
    .catch((err) => {
      dispatch(fetchUserFail(err));
    });
};

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user: user,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};
