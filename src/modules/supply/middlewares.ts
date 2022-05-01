import * as Redux from 'redux';
import {AppState} from 'Types';
import {AnyAction} from 'redux';
import {ACTION_ADD_BOX, ACTION_REMOVE_BOX, ACTION_SET_GOOD_TO_BOX} from './actions';
import {setCookie} from '../../utils/cookie';
import {COOKIE_KEY_NEW_SUPPLY} from './constants';

const supplyCookieActions = [
  ACTION_ADD_BOX,
  ACTION_REMOVE_BOX,
  ACTION_SET_GOOD_TO_BOX,
];

export const newSupplyMiddleware: Redux.Middleware<{}, AppState> = store => next => (action: AnyAction) => {
  const result = next(action);

  if (supplyCookieActions.includes(action.type)) {
    const state = store.getState();
    setCookie({key: COOKIE_KEY_NEW_SUPPLY, value: state.supplies.newSupplyBoxes});
  }

  return result;
};
