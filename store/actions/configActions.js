import {
  DISABLE_ACTION_BTN,
  ENABLE_ACTION_BTN,
  INIT_LOADER,
  DISMISS_LOADER,
} from "../types/configTypes";

export const disableActionBtn = (btnName) => (dispatch) => {
  dispatch({ type: DISABLE_ACTION_BTN, btnName });
};

export const enableActionBtn = (btnName) => (dispatch) => {
  dispatch({ type: ENABLE_ACTION_BTN, btnName });
};

export const initLoader = (loaderName) => (dispatch) => {
  dispatch({ type: INIT_LOADER, loaderName });
};

export const dismissLoader = (loaderName) => (dispatch) => {
  dispatch({ type: DISMISS_LOADER, loaderName });
};
