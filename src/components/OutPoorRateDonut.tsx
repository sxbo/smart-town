import React, { SFC } from 'react';
import { Donut } from '@ant-design/charts';
import { DonutConfig } from '@ant-design/charts/es/donut';
const OutPoorRateDonut: SFC = () => {
  const data = [
    {
      type: '未脱贫',
      value: 15,
    },
    {
      type: '已脱贫',
      value: 27,
    },
  ];
  const config: DonutConfig = {
    title: {
      visible: true,
      text: '脱贫率',
    },
    forceFit: true,
    radius: 0.8,
    padding: 'auto',
    data,
    color: ['#5a93fc', '#ffffff'],
    angleField: 'value',
    colorField: 'type',
    statistic: {
      visible: false,
      content: {
        value: '32%',
        name: '脱贫率',
      },
    },
    label: {
      visible: true,
      formatter: (text) => text + '%',
    },
    legend: {
      visible: true,
      position: 'bottom-center',
    },
    pieStyle: (v: any) => {
      if (v) {
        return {
          shadowColor: '#4d4d4d',
          shadowBlur: 5,
          shadowOffsetX: 1,
        };
      }
    },
  };

  return <Donut {...config} />;
};

export default OutPoorRateDonut;
