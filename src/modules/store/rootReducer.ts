import {combineReducers} from 'redux';
import {goods} from '../goods/reducers';

const rootReducer = combineReducers({
  goods,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
