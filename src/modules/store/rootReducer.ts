import {combineReducers} from 'redux';
import {goods} from '../goods';
import {auth} from '../auth';
import {shop} from '../shop';
import {supplies} from '../supply';

const rootReducer = combineReducers({
  auth,
  goods,
  shop,
  supplies,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
