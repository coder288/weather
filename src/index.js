import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import { rootReducer } from "./redux/reducers/rootReducer";
import {watchFetchWeather} from "./redux/sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchWeather);

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector('.layout')
);