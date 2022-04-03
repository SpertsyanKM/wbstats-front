import {ACTION_SET_AUTH_TOKEN, ActionSetAuthToken} from './actions';
import {combineReducers} from 'redux';
import {Token} from './types';

const token = (
  state: Token | null = null,
  action: ActionSetAuthToken,
): Token | null => {
  if (action.type === ACTION_SET_AUTH_TOKEN) {
    return action.token;
  }

  return state;
};

export const auth = combineReducers({token});
export type Auth = ReturnType<typeof auth>;
