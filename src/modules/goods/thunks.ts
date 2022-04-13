import {Thunk} from '../../utils/types/redux';
import {setGoods, setWbStocks} from './actions';
import {GoodsService} from './service';

type RequestGoodsThunkAction = (onComplete?: () => void) => Thunk;
export const requestGoods: RequestGoodsThunkAction = onComplete => dispatch => {
  GoodsService.fetchGoods().then(goods => {
    dispatch(setGoods(goods));
    onComplete?.();
  });
};

type RequestWbStocksThunkAction = (onComplete?: () => void) => Thunk;
export const requestWbStocks: RequestWbStocksThunkAction = onComplete => dispatch => {
  GoodsService.fetchWbStocks().then(wbStocks => {
    dispatch(setWbStocks(wbStocks));
    onComplete?.();
  });
};
