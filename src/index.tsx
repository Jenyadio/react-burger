import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "../src/services/reducers/index";
import thunk from "redux-thunk";
import { GetItemsActions } from "../src/services/actions/burger-ingredients";
import { AuthActions } from "./services/actions/auth";
import { GetNumberAndOrderActions } from "./services/actions/order-details";
import { ConstructorIngredientsActions } from "./services/actions/constructor-ingredients";
import { UserActions } from "./services/actions/user";
import { ThunkDispatch } from "redux-thunk";
import { WsActions } from "./services/actions/websocket";
import { socketMiddleware } from "./services/actions/websocket";
import { wsActions } from "./services/actions/websocket";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

const store = createStore(rootReducer, enhancer);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type RootState = ReturnType<typeof store.getState>;

export type ApplicationActions =
  | GetItemsActions
  | AuthActions
  | GetNumberAndOrderActions
  | ConstructorIngredientsActions
  | UserActions
  | WsActions;

export type AppDispatch = ThunkDispatch<RootState, never, ApplicationActions>;
