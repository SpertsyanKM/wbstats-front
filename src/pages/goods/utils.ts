import {
  FinancialDataInterval,
  GoodAnalyticsService,
  FinancialDataPerGoodFetcher
} from '../../modules/goodAnalytics';

type FinancialDataPerGoodFetcherByIntervalGetter = (interval: FinancialDataInterval) => FinancialDataPerGoodFetcher;
export const getFinancialDataPerGoodFetcherByInterval: FinancialDataPerGoodFetcherByIntervalGetter = interval => {
  switch (interval) {
    case FinancialDataInterval.PER_DAY:
      return GoodAnalyticsService.fetchFinancialDataPerGoodPerDay;
    case FinancialDataInterval.PER_WEEK:
      return GoodAnalyticsService.fetchFinancialDataPerGoodPerWeek;
    case FinancialDataInterval.PER_MONTH:
      return GoodAnalyticsService.fetchFinancialDataPerGoodPerMonth;
  }
};
