import * as Redux from 'redux';
import {AnyAction} from 'redux';
import {setCookie} from '../../utils/cookie';
import {ACTION_SET_AUTH_TOKEN} from './actions';
import {COOKIE_KEY_TOKEN} from './constants';
import {AppState} from 'Types';

const tokenCookieActions = [
  ACTION_SET_AUTH_TOKEN,
];

export const tokenMiddleware: Redux.Middleware<{}, AppState> = store => next => (action: AnyAction) => {
  const result = next(action);
  if (tokenCookieActions.includes(action.type)) {
    const state = store.getState();
    setCookie({key: COOKIE_KEY_TOKEN, value: state.auth.token});
  }

  return result;
};
