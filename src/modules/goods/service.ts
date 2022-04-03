import {Good} from './types';
import {GET} from '../../utils/api/core/api';

type GoodsFetcher = () => Promise<Good[]>;

const fetchGoods: GoodsFetcher = async () => {
  return await GET<Good[]>('goods/all');
};

export const GoodsService = {
  fetchGoods,
};
