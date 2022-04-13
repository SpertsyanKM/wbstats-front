import {Selector} from '../../utils/types/redux';
import {Good, WBStock} from './types';
import {AppState} from 'Types';
import {Goods} from './reducers';

export const selectGoods: Selector<Goods> = state => state.goods;

export const selectGoodsIdList: Selector<string[] | null> = state => selectGoods(state).goodIdList;

export const selectGoodsById: Selector<Record<string, Good>> = state => selectGoods(state).goodsById;

export const selectSortedGoods: Selector<Good[] | null> = state => {
  const idList = selectGoodsIdList(state);
  const byId = selectGoodsById(state);
  return idList?.map(id => byId[id]).filter(Boolean) ?? null;
}

export const selectGoodById = (state: AppState, id?: string) => id ? selectGoodsById(state)[id] : undefined;

export const selectWbStocksById: Selector<Record<string, WBStock>> = state => selectGoods(state).wbStocksByNmId;
