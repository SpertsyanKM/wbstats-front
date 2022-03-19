import {Selector} from '../../utils/types/redux';
import {Good} from './types';
import {AppState} from 'Types';

export const selectGoods = (state: AppState) => state.goods;

export const selectGoodsIdList: Selector<string[]> = state => selectGoods(state).goodIdList;

export const selectGoodsById: Selector<Record<string, Good>> = state => selectGoods(state).goodsById;

export const selectSortedGoods: Selector<Good[]> = state => {
  const idList = selectGoodsIdList(state);
  const byId = selectGoodsById(state);
  return idList.map(id => byId[id]).filter(Boolean);
}

export const selectGoodById = (state: AppState, id?: string) => id ? selectGoodsById(state)[id] : undefined;
