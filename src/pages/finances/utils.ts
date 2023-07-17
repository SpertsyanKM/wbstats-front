import {FinancialData, FinancialDataInterval, FinancialDataFetcher, GoodAnalyticsService} from '../../modules/goodAnalytics';
import {ChartData, ChartDot, ChartLine} from '../../components/chart';
import {Color} from '../../components/common/styling';

type FinancialDataToChartConverter = (
  financialDataPerInterval: Record<string, FinancialData>,
  onlySales?: boolean,
) => ChartData;
export const convertFinancialDataToChart: FinancialDataToChartConverter = (
  financialDataPerInterval,
  onlySales = false,
) => {
  const keys = Object.keys(financialDataPerInterval);
  const earningDots: ChartDot[] = keys.map(xValue => ({
    xAxis: xValue,
    yAxis: financialDataPerInterval[xValue].earnings,
  }));
  const returnsDots: ChartDot[] = keys.map(xValue => ({
    xAxis: xValue,
    yAxis: -financialDataPerInterval[xValue].returnOutcomes,
  }));
  const cancellationDots: ChartDot[] = keys.map(xValue => ({
    xAxis: xValue,
    yAxis: -financialDataPerInterval[xValue].cancellationOutcomes,
  }));
  const deliveryDots: ChartDot[] = keys.map(xValue => ({
    xAxis: xValue,
    yAxis: financialDataPerInterval[xValue].deliveryCosts,
  }));

  const earningsLine: ChartLine = {
    name: 'Продажи (после комиссий)',
    dots: earningDots,
    color: Color.ChartGreen,
  };
  const returnsLine: ChartLine = {
    name: 'Возвраты (WB)',
    dots: returnsDots,
    color: Color.ChartRed,
  };
  const cancellationsLine: ChartLine = {
    name: 'Отмены (Ozon)',
    dots: cancellationDots,
    color: Color.ChartRed,
  };
  const deliveryLine: ChartLine = {
    name: 'Доставка (WB)',
    dots: deliveryDots,
  };

  const lines = onlySales ? [earningsLine] : [earningsLine, returnsLine, cancellationsLine, deliveryLine];

  const chartData: ChartData = {
    xAxisName: "Дата",
    xAxisFrom: keys[0],
    yAxisName: "Продажи",
    lines,
  };

  return chartData;
};

type FinancialDataFetcherByIntervalGetter = (interval: FinancialDataInterval) => FinancialDataFetcher;
export const getFinancialDataFetcherByInterval: FinancialDataFetcherByIntervalGetter = interval => {
  switch (interval) {
    case FinancialDataInterval.PER_DAY:
      return GoodAnalyticsService.fetchFinancialDataPerDay;
    case FinancialDataInterval.PER_WEEK:
      return GoodAnalyticsService.fetchFinancialDataPerWeek;
    case FinancialDataInterval.PER_MONTH:
      return GoodAnalyticsService.fetchFinancialDataPerMonth;
  }
};

type FinancialDataTitleByIntervalGetter = (interval: FinancialDataInterval) => string;
export const getFinancialDataTitleByInterval: FinancialDataTitleByIntervalGetter = interval => {
  switch (interval) {
    case FinancialDataInterval.PER_DAY:
      return "Продажи по дням за 30 дней";
    case FinancialDataInterval.PER_WEEK:
      return "Продажи по неделям за год";
    case FinancialDataInterval.PER_MONTH:
      return "Продажи по месяцам за год";
  }
}
