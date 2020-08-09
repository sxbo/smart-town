import React, { SFC } from 'react';
import { Donut } from '@ant-design/charts';
import { DonutConfig } from '@ant-design/charts/es/donut';
const OutPoorRateDonut: SFC = () => {
  const data = [
    {
      type: '分类一',
      value: 15,
    },
    {
      type: '分类二',
      value: 14,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
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
    color: ['#5a93fc', '#90b6fd', '#c8dbfe', '#ffffff'],
    angleField: 'value',
    colorField: 'type',
    statistic: {
      visible: true,
      content: {
        value: '32%',
        name: 'Texi & delivery',
      },
    },
    label: { visible: false },
    legend: {
      visible: true,
      position: 'bottom-center',
    },
    pieStyle: (v: any) => {
      console.log(v);
      if (v === '分类四') {
        return {
          shadowColor: '#4d4d4d',
          shadowBlur: 5,
          shadowOffsetX: 1,
        };
      }
      return {};
    },
  };

  return <Donut {...config} />;
};

export default OutPoorRateDonut;
