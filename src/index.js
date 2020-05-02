import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//Redux imports starts here......
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import AuthReducer from "./Store/Reducer/Auth";
import AppReducer from "./Store/Reducer/App";
import CatReducer from "./Store/Reducer/cat";
import ProfileReducer from "./Store/Reducer/Profile";
import TrafficReducer from "./Store/Reducer/Traffic";
//Redux imports ends here........

//Reux management starts here.....
const rootReducer = combineReducers({
  auth: AuthReducer,
  app: AppReducer,
  cat: CatReducer,
  profile: ProfileReducer,
  traffic: TrafficReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
//Redux management ends here......

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
