import {GET, POST} from '../../utils/api/core/api';
import {DataPerInterval, FinancialDataPerGoodWrapper, FinancialDataWrapper} from './types';

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

export type FinancialDataFetcher = () => Promise<FinancialDataWrapper>;

const fetchFinancialDataPerDay: FinancialDataFetcher = async () => {
  return await GET<FinancialDataWrapper>('goodTransactions/getFinancialDataPerDay');
};

const fetchFinancialDataPerWeek: FinancialDataFetcher = async () => {
  return await GET<FinancialDataWrapper>('goodTransactions/getFinancialDataPerWeek');
};

const fetchFinancialDataPerMonth: FinancialDataFetcher = async () => {
  return await GET<FinancialDataWrapper>('goodTransactions/getFinancialDataPerMonth');
};

export type FinancialDataPerGoodFetcher = () => Promise<FinancialDataPerGoodWrapper>;

const fetchFinancialDataPerGoodPerDay: FinancialDataPerGoodFetcher = async () => {
  return await GET<FinancialDataPerGoodWrapper>('goodTransactions/getFinancialDataPerGoodPerDay');
};

const fetchFinancialDataPerGoodPerWeek: FinancialDataPerGoodFetcher = async () => {
  return await GET<FinancialDataPerGoodWrapper>('goodTransactions/getFinancialDataPerGoodPerWeek');
};

const fetchFinancialDataPerGoodPerMonth: FinancialDataPerGoodFetcher = async () => {
  return await GET<FinancialDataPerGoodWrapper>('goodTransactions/getFinancialDataPerGoodPerMonth');
};

export const GoodAnalyticsService = {
  fetchDataPerInterval,
  fetchFinancialDataPerDay,
  fetchFinancialDataPerWeek,
  fetchFinancialDataPerMonth,
  fetchFinancialDataPerGoodPerDay,
  fetchFinancialDataPerGoodPerWeek,
  fetchFinancialDataPerGoodPerMonth,
};
