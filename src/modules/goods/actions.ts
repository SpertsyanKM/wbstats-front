import { Action } from 'redux';
import {Good} from './types';

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
