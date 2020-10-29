import React from 'react';
import {enableMapSet} from 'immer'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import App from './App';
import reducers from './store/reducers'
import "./resources/css/style.css";
import "./resources/css/normalize.css";
import "./resources/css/queries.css";
import "./resources/css/grid.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

enableMapSet()

const middleware =
  process.env.NODE_ENV !== "production"
    ? [require("redux-immutable-state-invariant").default(), thunk]
    : [thunk];
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

const app = (
  <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(app,
  document.getElementById('root')
);
