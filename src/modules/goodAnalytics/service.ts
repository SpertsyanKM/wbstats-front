import {POST} from '../../utils/api/core/api';
import {DataPerInterval} from './types';

type DataPerIntervalFetcher = (
  sku: string,
  intervalDays: number,
  startDate: Date,
  endDate: Date,
) => Promise<DataPerInterval>;

const fetchDataPerInterval: DataPerIntervalFetcher = async (
  sku,
  intervalDays,
  startDate,
  endDate
) => {
  const body = {
    sku,
    intervalDays,
    startDate: startDate.toISOString().slice(0,10),
    endDate: endDate.toISOString().slice(0,10),
  };

  return await POST<DataPerInterval>(
    'goodTransactions/getDataPerInterval',
    body
  );
};

export const GoodAnalyticsService = {
  fetchDataPerInterval,
}