import {Good} from './types';
import {ACTION_SET_GOODS, ActionSetGoods} from './actions';
import {combineReducers} from 'redux';

const goodsById = (
  state: Record<string, Good> = {},
  action: ActionSetGoods,
): Record<string, Good> => {
  if (action.type === ACTION_SET_GOODS) {
    state = {...state};
    action.goods.forEach(good => state[good.id] = good);
  }

  return state;
}

const goodIdList = (
  state: string[] = [],
  action: ActionSetGoods,
): string[] => {
  if (action.type === ACTION_SET_GOODS) {
    const ids = action.goods.map(good => good.id);
    state = [...state, ...ids];
  }

  return state;
}

export const goods = combineReducers({goodsById, goodIdList});
export type Goods = ReturnType<typeof goods>;
