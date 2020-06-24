import axios from "axios";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";

export const SET_PREFS_START = "SET_PREFS_START";
export const SET_PREFS_SUCCESS = "SET_PREFS_SUCCESS";
export const SET_PREFS_FAILURE = "SET_PREFS_FAILURE";

export const setPrefs = (req) => (dispatch) => {
  const { id, prefs } = req;

  return axios

    .post(``, prefs)

    .then((res) => {
      const name = res.data.map((item) => item.name);
      const req = { recommendations: name.join(", ") };

      axiosWithAuth()
        .put(`/api/user/${id}`, req)
        .then((res) => {
          console.log(res);
          dispatch({ type: SET_PREFS_SUCCESS, payload: req.recommendations });
        })
        .catch((err) => {
          console.log("Error popsting recs");
          dispatch({ type: SET_PREFS_FAILURE, payload: err });
        });
    })
    .catch((err) => {
      console.log("Error getting data");
    });
};

export const TOGGLE_FLAVOR = "TOGGLE_FLAVOR";
export const toggleFlavor = (e) => (dispatch) => {
  const { name } = e.target;
  dispatch({ type: TOGGLE_FLAVOR, payload: name });
};

export const TOGGLE_EFFECT = "TOGGLE_EFFECT";
export const toggleEffect = (e) => (dispatch) => {
  const { name } = e.target;
  dispatch({ type: TOGGLE_EFFECT, payload: name });
};
