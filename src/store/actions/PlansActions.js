import api from "../apis/api";
import * as actionTypes from "./actionTypes";

export const userPlanStart = () => {
 return { type: actionTypes.USER_PLAN_START}
}

export const userPlanDelete = () => async (dispatch, getState) => {
  let user = getState().auth.userId
  await api.delete(`/users/${user}/plan_membership`)
  .then(dispatch({
    type: actionTypes.USER_PLAN_DELETE,
  })
  )
};

export const initFetchPlans = () => async (dispatch) => {
  dispatch(fetchPlansStart())
  await api.get(`/plans`)
  .then(resp => {
    dispatch(fetchPlansSuccess(resp.data))
  })
  .catch(err => {
    dispatch(fetchPlansFail(err.message))
  })
}

export const fetchPlansSuccess = (plans)=> {
  return{
    type: actionTypes.FETCH_PLANS_SUCCESS, payload: plans
  }
}

export const fetchPlansFail = (error) => {
  return {
    type: actionTypes.FETCH_PLANS_FAIL, payload: error
  }
}

export const fetchPlansStart = () => {
  return { type: actionTypes.FETCH_PLANS_START }
}

export const fetchUserPlan = () => async (dispatch, getState) => {
  let user = getState().auth.userId
  dispatch(userPlanStart())
  await api
  .get(`users/${user}/plan_membership`)
  .then(response => {
    dispatch(userPlanSuccess(response.data))
  })
  .catch(err => {
    dispatch(userPlanFail(err.message))
  })
}

export const initPlanMembership = (plan_id) => async (dispatch, getState) =>{
  let user = getState().auth.userId
  dispatch(userPlanStart());
  const planData = {
    member_id: user,
    plan_id: plan_id
  }
  await api
  .post(`/users/${user}/plan_membership`, planData)
  .then(response => {
    dispatch(userPlanSuccess(response.data))
  })
  .catch(err => {
    dispatch(userPlanFail(err.message))
  })
 }

export const userPlanSuccess = (plan_id) => {
  return {
   type: actionTypes.USER_PLAN_SUCCESS, payload: plan_id
  }
}

export const userPlanFail = (error) => {
  return {
    type: actionTypes.USER_PLAN_FAIL, payload: error
  }
}

