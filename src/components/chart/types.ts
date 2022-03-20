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
  yAxisName?: string;
  lines: ChartLine[];
};
