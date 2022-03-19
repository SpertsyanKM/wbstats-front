import {SalesPerInterval} from './types';
import {POST} from '../../utils/api/core/shopApi';

type SalesPerIntervalFetcher = (
  sku: string,
  intervalDays: number,
  startDate: Date,
  endDate: Date,
) => Promise<SalesPerInterval>;

const fetchSalesPerInterval: SalesPerIntervalFetcher = async (
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

  return await POST<SalesPerInterval>(
    'goodTransactions/getSalesPerInterval',
    body
  );
};

export const GoodAnalyticsService = {
  fetchSalesPerInterval,
}