import {Thunk} from '../../utils/types/redux';
import {setGoods} from './actions';
import {GoodsService} from './service';

type RequestFeaturedGoodsThunkAction = () => Thunk;
export const requestGoods: RequestFeaturedGoodsThunkAction = () => dispatch => {
  GoodsService.fetchGoods().then(goods => dispatch(setGoods(goods)));
};
