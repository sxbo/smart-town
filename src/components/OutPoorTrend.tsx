import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
const OutPoorTrend: SFC = () => {
  const data = [
    {
      year: '2012',
      value: 3,
    },
    {
      year: '2013',
      value: 4,
    },
    {
      year: '2014',
      value: 3.5,
    },
    {
      year: '2015',
      value: 5,
    },
    {
      year: '2016',
      value: 4.9,
    },
    {
      year: '2017',
      value: 6,
    },
    {
      year: '2018',
      value: 7,
    },
    {
      year: '2019',
      value: 9,
    },
    {
      year: '2020',
      value: 13,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '脱贫趋势',
    },
    description: {
      visible: true,
      text: '从2012~至今脱贫率',
    },
    padding: 'auto',
    forceFit: true,
    data,
    xField: 'year',
    yField: 'value',
    label: {
      visible: true,
      type: 'point',
    },
    point: {
      visible: true,
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };

  return <Line {...config} />;
};

export default OutPoorTrend;
