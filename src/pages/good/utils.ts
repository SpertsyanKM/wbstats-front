import {ChartData, ChartDot, ChartLine} from '../../components/chart';
import {PropertyPerInterval} from '../../modules/goodAnalytics/types';

type SalesPerIntervalToChartConverter = (
  sku: string,
  salesPerInterval: PropertyPerInterval,
) => ChartData;
export const convertSalesPerIntervalToChart: SalesPerIntervalToChartConverter = (
  sku,
  salesPerInterval,
) => {
  const keys = Object.keys(salesPerInterval);
  const dots: ChartDot[] = keys.map(xValue => ({
    xAxis: xValue,
    yAxis: salesPerInterval[xValue],
  }));

  const line: ChartLine = {
    name: sku,
    dots,
  };

  const chartData: ChartData = {
    xAxisName: "Дата",
    yAxisName: "Продажи",
    lines: [line],
  };

  return chartData;
};
