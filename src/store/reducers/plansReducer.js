import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  select: [],
  loading: false,
  error: false,
  message: null,
  current_plan: null,
  current_plan_membership: null
};

const userPlanStart = (state) => {
  return updateObject(state, { 
    error: false,
    loading: true,
    message: null,
    current_plan: null,
    current_plan_membership: null
   });
};

const userPlanDelete = (state) => {
  return updateObject(state, {
    loading: false,
    error: false,
    message: null,
    current_plan: null,
    current_plan_membership: null,
  });
};

const fetchPlansFail = (state, action) => {
  return updateObject(state, {
    select: action.payload,
    loading: false,
    error: true,
    message: action.payload,
  });
};

const userPlanSuccess = (state, action) => {
  if (action.status === 204) {
    return updateObject(state, {
      loading: false,
      error: action.status,
      message: action.message,
      current_plan: {...action.plan},
      current_plan_membership: {...action.plan_membership}
    });
  } else if (action.status === 404) {
    return updateObject(state, {
      loading: false,
      error: action.status,
      message: action.message,
      current_plan: null,
      current_plan_membership: null,
    });
  }

  return updateObject(state, {
    error: false,
    loading: false,
    message: null,
    current_plan: { ...action.plan } ,
    current_plan_membership: { ...action.plan_membership },
  });
};

const userPlanFail = (state, action) => {
  return updateObject(state, {
    error: true,
    loading: false,
    message: action.error,
    current_plan: null,
    current_plan_membership: null
  });
};

const userPlanLogout = (state) => {
  return updateObject(state, {
    error: null,
    loading: false,
    message: null,
    current_plan: null,
    current_plan_membership: null
  })
}

const fetchPlansSuccess = (state, action) => {
  return updateObject(state, {
    select: action.payload,
    error: false,
    loading: false,
    message: null,
  });
};

const fetchPlansStart = (state) => {
  return updateObject(state, { error: false, loading: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  
    case actionTypes.AUTH_LOGOUT:
      return userPlanLogout(state,action)
    case actionTypes.USER_PLAN_SUCCESS:
      return userPlanSuccess(state, action);
    case actionTypes.USER_PLAN_START:
      return userPlanStart(state, action);
    case actionTypes.USER_PLAN_FAIL:
      return userPlanFail(state, action);
    case actionTypes.USER_PLAN_DELETE:
      return userPlanDelete(state, action);
    case actionTypes.FETCH_PLANS_START:
      return fetchPlansStart(state, action);
    case actionTypes.FETCH_PLANS_FAIL:
      return fetchPlansFail(state, action);
    case actionTypes.FETCH_PLANS_SUCCESS:
      return fetchPlansSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
