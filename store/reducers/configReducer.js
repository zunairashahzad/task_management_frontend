import {
  DISABLE_ACTION_BTN,
  ENABLE_ACTION_BTN,
  INIT_LOADER,
  DISMISS_LOADER,
} from "../types/configTypes";

const initialState = {
  disabledButtons: [],
  loader: [],
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_ACTION_BTN:
      return {
        ...state,
        disabledButtons: [...state.disabledButtons, action.btnName],
      };
    case ENABLE_ACTION_BTN:
      return {
        ...state,
        disabledButtons: state.disabledButtons.filter(
          (btn) => btn !== action.btnName
        ),
      };
    case INIT_LOADER:
      return {
        ...state,
        loader: [...state.loader, action.loaderName],
      };
    case DISMISS_LOADER:
      return {
        ...state,
        loader: state.loader.filter((loader) => loader !== action.loaderName),
      };
    default:
      return {
        ...state,
      };
  }
};

export default configReducer;
