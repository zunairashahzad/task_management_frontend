import { isEmpty } from "lodash";

import { SET_CURRENT_USER } from "../types/authTypes";

const initialState = {
  isAuthenticated: null,
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
        isAuthenticated: !isEmpty(action.user),
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
