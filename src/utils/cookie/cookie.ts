import {CookieSetterParams} from './types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type CookieValueByKeyGetter = <T>(cookieKey: string) => T;

export const getCookieValueByKey: CookieValueByKeyGetter = <T>(cookieKey: string) => {
  return cookies.get(cookieKey) as T;
};

type CookieSetter = (params: CookieSetterParams) => void;

export const setCookie: CookieSetter = ({
  key,
  value,
  maxAgeSec = 31536000,
}) => {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + maxAgeSec);
  cookies.set(key, value, {
    expires,
  });
};

type CookieRemover = (key: string) => void;
export const removeCookie: CookieRemover = key => {
  cookies.remove(key);
};