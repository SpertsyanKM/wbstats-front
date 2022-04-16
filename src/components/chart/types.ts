export type ChartValue = string | number;

export type ChartDot = {
  xAxis: ChartValue;
  yAxis: ChartValue;
};

export type ChartLine = {
  name: string;
  color?: string;
  dots: ChartDot[];
};

export type ChartData = {
  xAxisName?: string;
  xAxisFrom?: ChartValue;
  yAxisName?: string;
  yAxisFrom?: ChartValue;
  lines: ChartLine[];
};
