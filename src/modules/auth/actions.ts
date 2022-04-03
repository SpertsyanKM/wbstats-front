import {Action} from 'redux';
import {Token} from './types';

export const ACTION_SET_AUTH_TOKEN = 'ACTION_SET_AUTH_TOKEN';
export type ActionSetAuthToken = Action<typeof ACTION_SET_AUTH_TOKEN> & {
  token: Token;
};
export const setAuthToken = (
  token: Token,
): ActionSetAuthToken => ({
  type: ACTION_SET_AUTH_TOKEN,
  token,
});
