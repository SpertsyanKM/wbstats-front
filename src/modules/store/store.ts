import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import {getAppInitialState} from './utils';
import {tokenMiddleware} from '../auth';

const middlewares = [
  thunkMiddleware,
  tokenMiddleware,
  logger,
];

const store = createStore(
  rootReducer,
  getAppInitialState(),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
