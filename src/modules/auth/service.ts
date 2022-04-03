import {AuthResponse, RegisterResponse, Token} from './types';
import {POST} from '../../utils/api/core/api';
import {Store} from '../../utils/types/redux';
import {selectAuthToken} from './selectors';

let store: Store | undefined = undefined;

type Initializer = (s: Store) => void;
const init: Initializer = s => {
  store = s;
};

type TokenGetter = () => Token | null;
const getToken: TokenGetter = () => {
  const state = store?.getState();
  return state ? selectAuthToken(state) : null;
};

type AuthRequester = (email: string, passwordHash: string) => Promise<AuthResponse>;
const requestAuth: AuthRequester = async (email, passwordHash) => {
  return await POST<AuthResponse>('auth/auth', {email, passwordHash});
};

type RegisterRequester = (email: string, passwordHash: string) => Promise<RegisterResponse>;
const requestRegister: RegisterRequester = async (email, passwordHash) => {
  return await POST<RegisterResponse>('auth/register', {email, passwordHash});
};

type IsAuthorizedChecker = () => boolean;
const isAuthorized: IsAuthorizedChecker = () => {
  return !!getToken();
};

export const AuthService = {
  init,
  getToken,
  requestAuth,
  requestRegister,
  isAuthorized,
};
