import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from '@ant-design/charts/es/line';

const CO2Line: SFC = () => {
  const data = [
    {
      Date: '2010-01',
      scales: 1998,
    },
    {
      date: '2010-02',
      scales: 1850,
    },
    {
      date: '2010-03',
      scales: 1720,
    },
    {
      date: '2010-04',
      scales: 1818,
    },
    {
      date: '2010-05',
      scales: 1920,
    },
    {
      date: '2010-06',
      scales: 1802,
    },
    {
      date: '2010-07',
      scales: 1945,
    },
    {
      date: '2010-08',
      scales: 1856,
    },
    {
      date: '2010-09',
      scales: 2107,
    },
    {
      date: '2010-10',
      scales: 2140,
    },
    {
      date: '2010-11',
      scales: 2311,
    },
    {
      date: '2010-12',
      scales: 1972,
    },
    {
      date: '2011-01',
      scales: 1760,
    },
    {
      date: '2011-02',
      scales: 1824,
    },
    {
      date: '2011-03',
      scales: 1801,
    },
    {
      date: '2011-04',
      scales: 2001,
    },
  ];

  const config: LineConfig = {
    title: {
      visible: true,
      text: '1号大棚CO2指标',
    },
    description: {
      visible: true,
      text: '近12小时CO2指标趋势',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'scales',
    xAxis: {
      type: 'time',
      tickCount: 5,
    },
  };

  return <Line {...config} />;
};

export default CO2Line;
