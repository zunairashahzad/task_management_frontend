import { combineReducers } from "redux";

import userReducer from "./userReducer";
import configReducer from "./configReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  user: userReducer,
  config: configReducer,
  task: taskReducer,
});
