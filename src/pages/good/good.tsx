import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {selectGoodById} from '../../modules/goods/selectors';
import {GoodAnalyticsService} from '../../modules/goodAnalytics/service';
import {getSku} from '../../modules/goods/utils';
import {SalesPerInterval} from '../../modules/goodAnalytics/types';

type Props = {};

const Good: React.FC<Props> = () => {
  const {id} = useParams();
  const good = useSelector(state => selectGoodById(state, id));
  const [salesPerInterval, setSalesPerInterval] = useState<SalesPerInterval | null>(null);

  useEffect(() => {
    if (!good) return;

    const today = new Date();
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30);
    GoodAnalyticsService.fetchSalesPerInterval(
      getSku(good),
      1,
      startDate,
      today
    ).then(result => setSalesPerInterval(result));
  }, [good]);

  console.log(salesPerInterval);
  return <div>{good?.name}</div>;
};

export default Good;
