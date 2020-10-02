import api from "../apis/api";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  console.log(token, userId);
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
    console.log("in auth");
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
        console.log(response.data);
        localStorage.setItem("token", response.data.session_token);
        console.log(localStorage);
        localStorage.setItem("userId", response.data.id);
        console.log(response.data);
        dispatch(
          authSuccess(
            response.data.session_token,
            response.data.id,
            response.data
          )
        );
      })
      .catch((err) => {
        dispatch(authFail());
      });
  };
};

export const fetchUserStart = () => {
  return { type: actionTypes.FETCH_USER_START };
};

export const fetchUser = () => async (dispatch, getState) => {
  let user = localStorage.getItem("userId");
  JSON.stringify(user);
  console.log(user);
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
  console.log(user);
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
