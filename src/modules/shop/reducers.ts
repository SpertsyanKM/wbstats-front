import {combineReducers} from 'redux';
import {Shop} from './types';
import {ACTION_SET_SHOP, ActionSetShop} from './actions';

const current = (
  state: Shop | null = null,
  action: ActionSetShop,
): Shop | null => {
  if (action.type === ACTION_SET_SHOP) {
    return action.shop;
  }

  return state;
};

export const shop = combineReducers({current});
export type ShopReducers = ReturnType<typeof shop>;
