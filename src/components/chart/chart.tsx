import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {ChartData} from './types';
import {convertChartData} from './utils';
import {ChartLineColors, xAxisDataKey} from './constants';

type Props = {
  data: ChartData;
  width?: number;
  height?: number;
  className?: string;
  noLegend?: boolean;
};

const Chart: React.FC<Props> = ({
  width,
  height,
  data,
  className,
  noLegend = false,
}) => {
  const convertedData = convertChartData(data.lines);

  return (
    <LineChart
      width={width ?? 1000}
      height={height ?? 300}
      data={convertedData}
      className={className}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey={xAxisDataKey} name={data.xAxisName} from={data.xAxisFrom} />
      <YAxis name={data.yAxisName} from={data.yAxisFrom} />
      <Tooltip/>
      {!noLegend && <Legend/>}
      {data.lines.map((chartLine, index) => (
        <Line
          key={chartLine.name}
          type="monotone"
          dataKey={chartLine.name}
          stroke={chartLine.color ?? ChartLineColors[index % ChartLineColors.length]}
        />
      ))}
    </LineChart>
  );
};

export default Chart;
