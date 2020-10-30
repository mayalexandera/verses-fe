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
  if (action.payload.status === 204) {
    return updateObject(state, {
      loading: false,
      error: false,
      message: action.payload.message,
      current_plan: null,
      current_plan_membership: null
    });
  } else if (action.payload.status === 404) {
    return updateObject(state, {
      loading: false,
      error: false,
      message: null,
      current_plan: null,
      current_plan_membership: null,
    });
  }

  return updateObject(state, {
    error: false,
    loading: false,
    message: null,
    current_plan: { ...action.payload.plan_membership } ,
    current_plan_membership: { ...action.payload.plan },
  });
};

const userPlanFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
    current_plan: null,
    current_plan_membership: null
  });
};

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
