import {Action} from 'redux';
import {Shop} from './types';

export const ACTION_SET_SHOP = 'ACTION_SET_SHOP';
export type ActionSetShop = Action<typeof ACTION_SET_SHOP> & {
  shop: Shop,
};
export const setShop = (
  shop: Shop,
): ActionSetShop => ({
  type: ACTION_SET_SHOP,
  shop,
});
