import {Thunk} from '../../utils/types/redux';
import {setGoods} from './actions';
import {GoodsService} from './service';

type RequestFeaturedGoodsThunkAction = (onComplete?: () => void) => Thunk;
export const requestGoods: RequestFeaturedGoodsThunkAction = (onComplete?: () => void) => dispatch => {
  GoodsService.fetchGoods().then(goods => {
    dispatch(setGoods(goods));
    onComplete?.();
  });
};
