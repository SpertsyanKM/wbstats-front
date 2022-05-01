import {AppState} from './rootReducer';
import {PreloadedState} from 'redux';
import {getCookieValueByKey} from '../../utils/cookie';
import {Token} from '../auth';
import {COOKIE_KEY_TOKEN} from '../auth/constants';
import {Box} from '../supply';
import {COOKIE_KEY_NEW_SUPPLY} from '../supply/constants';

type AppInitialStateGetter = () => PreloadedState<AppState>;
export const getAppInitialState: AppInitialStateGetter = () => {
  const token = getCookieValueByKey<Token | undefined>(COOKIE_KEY_TOKEN) ?? null;
  const newSupplyBoxes = getCookieValueByKey<Box[] | undefined>(COOKIE_KEY_NEW_SUPPLY) ?? [];

  const state: Partial<AppState> = {
    auth: {
      token,
    },
    supplies: {
      newSupplyBoxes,
    }
  };
  console.log('Initial state:', state);
  return state;
};
