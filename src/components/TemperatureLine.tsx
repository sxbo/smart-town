import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from '@ant-design/charts/es/line';

interface TemperatureLineProp{
  title: string;
  data: any;
}

const TemperatureLine: SFC<TemperatureLineProp> = (props) => {

  const {title, data} = props;

  const config: LineConfig = {
    title: {
      visible: true,
      text: title,
    },
    description: {
      visible: true,
      text: '最近一段时间温度指标趋势',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'scales',
    xAxis: {
      // type: 'time',
      tickCount: 5,
    },
  };

  return <Line {...config} />;
};

export default TemperatureLine;
