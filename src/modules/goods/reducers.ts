import {Good, WBStock} from './types';
import {ACTION_SET_GOODS, ACTION_SET_WB_STOCKS, ActionSetGoods, ActionSetWbStocks} from './actions';
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
  state: string[] | null = null,
  action: ActionSetGoods,
): string[] | null => {
  if (action.type === ACTION_SET_GOODS) {
    const ids = action.goods.map(good => good.id).filter(id => !state?.includes(id));
    state = [...(state ?? []), ...ids];
  }

  return state;
}

const wbStocksByNmId = (
  state: Record<string, WBStock> = {},
  action: ActionSetWbStocks,
): Record<string, WBStock> => {
  if (action.type === ACTION_SET_WB_STOCKS) {
    state = {...state};
    action.wbStocks.forEach(stock => state[stock.nmId] = stock);
  }

  return state;
}

const wbStockNmIdList = (
  state: string[] | null = null,
  action: ActionSetWbStocks,
): string[] | null => {
  if (action.type === ACTION_SET_WB_STOCKS) {
    const ids = action.wbStocks.map(stock => stock.nmId).filter(id => !state?.includes(id));
    state = [...(state ?? []), ...ids];
  }

  return state;
}

export const goods = combineReducers({
  goodsById,
  goodIdList,
  wbStockNmIdList,
  wbStocksByNmId
});
export type Goods = ReturnType<typeof goods>;
