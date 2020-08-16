import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from '@ant-design/charts/es/line';

interface CO2LineProp{
  data: any;
  title: string;
}

const CO2Line: SFC<CO2LineProp> = (props) => {

  const {data, title} = props;

  const config: LineConfig = {
    title: {
      visible: true,
      text: title,
    },
    description: {
      visible: true,
      text: '最近一段时间CO2指标趋势',
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

export default CO2Line;
