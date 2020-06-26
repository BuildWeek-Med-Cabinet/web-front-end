import { strains } from "../actions";
const {
  FETCH_STRAINS_START,
  FETCH_STRAINS_SUCCESS,
  FETCH_STRAINS_FAILURE,
} = strains;
const initialState = {
  isFetching: false,
  strains: null,
  error: "",
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STRAINS_START:
      return { ...state, isFetching: true };
    case FETCH_STRAINS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        strains: action.payload,
      };
    case FETCH_STRAINS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
