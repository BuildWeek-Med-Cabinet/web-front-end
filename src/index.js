import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import App from "./App";
import './index.css'
import rootReducer from "./components/store/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// optional cofiguration
const options = {
  position: 'middle',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
  

// Sign up, info backend needs

// Username:
// Password:
// Email:

//  Login, info backend needs

// Email:
// Password:
