import { combineReducers } from "redux";
import { reducer as user } from "./userReducer";

export default combineReducers({
  user,
});
