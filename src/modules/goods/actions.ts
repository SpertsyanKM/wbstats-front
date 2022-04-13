import { Action } from 'redux';
import {Good, WBStock} from './types';

export const ACTION_SET_GOODS = 'ACTION_SET_GOODS';
export type ActionSetGoods = Action<typeof ACTION_SET_GOODS> & {
  goods: Good[],
};
export const setGoods = (
  goods: Good[],
): ActionSetGoods => ({
  type: ACTION_SET_GOODS,
  goods,
});

export const ACTION_SET_WB_STOCKS = 'ACTION_SET_WB_STOCKS';
export type ActionSetWbStocks = Action<typeof ACTION_SET_WB_STOCKS> & {
  wbStocks: WBStock[],
};
export const setWbStocks = (
  wbStocks: WBStock[],
): ActionSetWbStocks => ({
  type: ACTION_SET_WB_STOCKS,
  wbStocks,
});
