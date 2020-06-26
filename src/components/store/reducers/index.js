import { combineReducers } from "redux";
import { reducer as user } from "./userReducer";
import { reducer as settings } from "./settingsReducers";

export default combineReducers({
  user,
  settings,
});
