import {ChartLine, ChartValue} from './types';
import {xAxisDataKey} from './constants';

type ChartDataConverter = (chartLines: ChartLine[]) => Record<string, unknown>[];
export const convertChartData: ChartDataConverter = chartLines => {
  const dotsMap: Record<ChartValue, Record<string, unknown>> = {};
  chartLines.forEach(chartLine => {
    chartLine.dots.forEach((dot, index) => {
      let vertical = dotsMap[dot.xAxis]
      if (vertical == null) {
        vertical = {
          [xAxisDataKey]: dot.xAxis
        };
        dotsMap[dot.xAxis] = vertical;
      }
      vertical[chartLine.name] = dot.yAxis
    });
  });

  return Object.values(dotsMap);
};
