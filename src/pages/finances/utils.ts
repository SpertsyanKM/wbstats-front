import {FinancialData} from '../../modules/goodAnalytics/types';
import {ChartData, ChartDot, ChartLine} from '../../components/chart';
import {Color} from '../../components/common/styling';

type FinancialDataToChartConverter = (
  financialDataPerInterval: Record<string, FinancialData>,
) => ChartData;
export const convertFinancialDataToChart: FinancialDataToChartConverter = (
  financialDataPerInterval,
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
    name: 'Возвраты',
    dots: returnsDots,
    color: Color.ChartRed,
  };
  const deliveryLine: ChartLine = {
    name: 'Доставка',
    dots: deliveryDots,
  };

  const chartData: ChartData = {
    xAxisName: "Дата",
    xAxisFrom: keys[0],
    yAxisName: "Продажи",
    lines: [earningsLine, returnsLine, deliveryLine],
  };

  return chartData;
};
