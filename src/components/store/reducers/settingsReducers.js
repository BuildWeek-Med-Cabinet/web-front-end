import { settings } from "../actions";
const {
  SIGN_OUT,
  UPDATE_INFO_START,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILURE,
  FILL_FIELDS,
  HANDLE_SETTINGS_INPUT,
  SET_UPDATED,
  DELETE_PROFILE_SUCCESS,
} = settings;
const initialState = {
  fieldValues: {
    username: "",
    email: "",
  },
  updated: false,
  isDeleted: false,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return state;
    case UPDATE_INFO_START:
      return state;
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        updated: true,
      };
    case UPDATE_INFO_FAILURE:
      return state;
    case FILL_FIELDS:
      return {
        ...state,
        fieldValues: action.payload,
      };
    case HANDLE_SETTINGS_INPUT:
      return {
        ...state,
        fieldValues: {
          ...state.fieldValues,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_UPDATED:
      return {
        ...state,
        updated: action.payload,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    default:
      return state;
  }
};
