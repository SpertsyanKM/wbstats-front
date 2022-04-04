import {combineReducers} from 'redux';
import {goods} from '../goods/reducers';
import {auth} from '../auth';
import {shop} from '../shop';

const rootReducer = combineReducers({
  auth,
  goods,
  shop,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
