import {AppState} from './rootReducer';
import {PreloadedState} from 'redux';

type AppInitialStateGetter = () => PreloadedState<AppState>;
export const getAppInitialState: AppInitialStateGetter = () => {
  return {};
};
