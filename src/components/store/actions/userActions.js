import { axiosWithAuth } from "../../../utils";
export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const fetchUser = (id) => (dispatch) => {
  dispatch({ type: FETCH_USER_START });
  axiosWithAuth()
    .get(`/api/user/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_USER_FAILURE, payload: err });
    });
};

export const SET_ID = "SET_ID";
export const setID = (id) => (dispatch) => {
  dispatch({ type: SET_ID, payload: id });
};
