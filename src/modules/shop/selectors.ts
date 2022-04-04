import {AppState} from 'Types';

export const selectShop = (state: AppState) => state.shop.current;
