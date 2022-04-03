import {combineReducers} from 'redux';
import {goods} from '../goods/reducers';
import {auth} from '../auth';

const rootReducer = combineReducers({
  auth,
  goods,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
