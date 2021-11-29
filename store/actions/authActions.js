import axios from "axios";
import { isEmpty } from "lodash";
import jwt_decode from "jwt-decode";
import Router from "next/router";

import FlashHelper from "../../helpers/FlashHelper";
import AuthHelper from "../../helpers/AuthHelper";
import { SET_CURRENT_USER } from "../types/authTypes";
import { disableActionBtn, enableActionBtn } from "./configActions";
import { LOGIN, SIGNUP } from "../../constants/buttons";

export const loginUser = (authData) => async (dispatch) => {
  dispatch(
    authentication("/auth/login", authData, "Logged in successfully", LOGIN)
  );
};

export const signupUser = (authData) => async (dispatch) => {
  dispatch(
    authentication("/auth/register", authData, "Signed up successfully", SIGNUP)
  );
};

const authentication =
  (endpoint, authData, successMsg, btn) => async (dispatch) => {
    try {
      dispatch(disableActionBtn(btn));

      const response = await axios.post(endpoint, authData);

      const { token, user } = response.data;

      dispatch(bindToken(token, user));

      FlashHelper.success(successMsg);

      dispatch(enableActionBtn(btn));

      Router.push("/dashboard");
    } catch (error) {
      FlashHelper.error(error?.response?.data?.message);

      dispatch(enableActionBtn(btn));
    }
  };

const bindToken = (token, user) => (dispatch) => {
  AuthHelper.setToken(token);

  dispatch(storeUser(user));
  dispatch(setCurrentUser(user));
};

export const setCurrentUser = (user) => (dispatch) => {
  dispatch({ type: SET_CURRENT_USER, user });
};

export const storeUser = (user) => (dispatch) => {
  AuthHelper.setUser(user);
};

export const logout = () => async (dispatch) => {
  AuthHelper.removeToken();
  AuthHelper.removeUser();

  dispatch(setCurrentUser({}));

  Router.push("/");
};

export const verifyLogin = (store) => (dispatch) => {
  const user = AuthHelper.getUser();
  const token = AuthHelper.getToken();

  if (isEmpty(token) && isEmpty(user)) {
    console.log("Logging out user, token & user not found");
    return;
  }

  if (isEmpty(token) || isEmpty(user)) {
    console.log("Logging out user, token or user not found");
    return dispatch(logout());
  }

  const decodedToken = jwt_decode(token);

  if (!decodedToken) {
    console.log("Logging out user, not able to decode token");
    return dispatch(logout());
  }

  const expiry = new Date(
    new Date().getTime() + decodedToken.exp * 1000
  ).getTime();

  const currentTime = new Date().getTime();

  if (expiry < currentTime) {
    console.log("Logging out user, token expired");
    return dispatch(logout());
  }

  return dispatch(setCurrentUser(user));
};
