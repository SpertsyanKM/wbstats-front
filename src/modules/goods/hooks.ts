import {useDispatch, useSelector} from 'react-redux';
import {selectSortedGoods} from './selectors';
import {useCallback, useEffect, useState} from 'react';
import {requestGoods} from './thunks';
import {Good} from './types';

type UseGoodsHook = () => [Good[] | null, boolean];
export const useGoods: UseGoodsHook = () => {
  const goods = useSelector(selectSortedGoods);
  const dispatch = useDispatch();
  const [isLoadingGoods, setIsLoading] = useState(false);

  const fetchGoods = useCallback(() => {
    setIsLoading(true);
    dispatch(requestGoods(() => setIsLoading(false)));
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    if (!goods) {
      fetchGoods()
    }
  }, [goods, fetchGoods]);

  return [goods, isLoadingGoods];
}