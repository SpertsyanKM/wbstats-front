import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import {getAppInitialState} from './utils';
import {tokenMiddleware} from '../auth';
import {newSupplyMiddleware} from '../supply/middlewares';

const middlewares = [
  thunkMiddleware,
  tokenMiddleware,
  newSupplyMiddleware,
  logger,
];

const store = createStore(
  rootReducer,
  getAppInitialState(),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
