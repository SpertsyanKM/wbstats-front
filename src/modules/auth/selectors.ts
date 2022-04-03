import {Token} from './types';
import {Auth} from "./reducers";
import {Selector} from '../../utils/types/redux';

export const selectAuth: Selector<Auth> = state => state.auth;

export const selectAuthToken: Selector<Token | null> = state => selectAuth(state).token;
