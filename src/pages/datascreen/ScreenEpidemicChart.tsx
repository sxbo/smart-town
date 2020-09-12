import React, { CSSProperties, SFC } from 'react';
import { StackedArea } from '@ant-design/charts';

import {StackedAreaConfig} from '@ant-design/charts/es/stackedArea';

interface ScreenEpidemicChartProp{
  title?: string | undefined;
  data: any;
  styleObj?: CSSProperties;
}

const ScreenEpidemicChart: SFC<ScreenEpidemicChartProp> = (props) => {


  const {data} = props;
  const config: StackedAreaConfig = {
    title: props.title ? {
      visible: true,
      text: props.title,
    // eslint-disable-next-line no-undefined
    } : undefined,
    data,
    xField: 'date',
    yField: 'value',
    stackField: 'type',
    color: ['#ab8ce4', '#60d7a7', '#fb9678'],
    xAxis: {
      type: 'time',
      tickCount: 5,
    },
    legend: {
      visible: true,
      position: 'bottom-center',
      text: {
        style: {
          fill: '#ffffff',
        },
      },
    },
    responsive: true,
  };

  return <>
    <StackedArea style={props.styleObj} {...config} />
  </>;
};

export default ScreenEpidemicChart;
