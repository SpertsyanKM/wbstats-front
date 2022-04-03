import {AppState} from './rootReducer';
import {PreloadedState} from 'redux';
import {getCookieValueByKey} from '../../utils/cookie';
import {Token} from '../auth';
import {COOKIE_KEY_TOKEN} from '../auth/constants';

type AppInitialStateGetter = () => PreloadedState<AppState>;
export const getAppInitialState: AppInitialStateGetter = () => {
  const token = getCookieValueByKey<Token | undefined>(COOKIE_KEY_TOKEN);

  return {
    auth: {
      token,
    }
  };
};
