import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from '@ant-design/charts/es/line';

interface HumidityLineProp{
  title: string;
  data: any;
}

const HumidityLine: SFC<HumidityLineProp> = (props) => {

  const {data, title} = props;

  const config: LineConfig = {
    title: {
      visible: true,
      text: title,
    },
    description: {
      visible: true,
      text: '最近一段时间湿度指标趋势',
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

export default HumidityLine;
