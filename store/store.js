import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middleware = [thunk];
const initialState = {};
const devTools = composeEnhancers(applyMiddleware(...middleware));

export default createStore(rootReducer, initialState, devTools);
