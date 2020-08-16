import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';

const PeopleFlowLine: SFC = () => {
  const data = [
    {
      date: '08:00',
      value: 3.5,
    },
    {
      date: '09:00',
      value: 5,
    },
    {
      date: '10:00',
      value: 4.9,
    },
    {
      date: '11:00',
      value: 6,
    },
    {
      date: '12:00',
      value: 16,
    },
    {
      date: '13:00',
      value: 9,
    },
    {
      date: '14:00',
      value: 3,
    },
    {
      date: '15:00',
      value: 15,
    },
    {
      date: '16:00',
      value: 6,
    },
    {
      date: '17:00',
      value: 8,
    },
  ];
  //   const maxValue = Math.max.apply(
  //     [],
  //     data.map((d) => d.value),
  //   );

  const config = {
    title: {
      visible: true,
      text: '人流监测',
    },
    description: {
      visible: true,
      text: '最近一段时间旅客流量监测',
    },
    forceFit: true,
    padding: 'auto',
    data,
    xField: 'date',
    yField: 'value',
    yAxis: { nice: true },
    label: { visible: false },
    markerPoints: [
      {
        visible: true,
        data: [{ value: 16 }, {value: 15}],
        label: {
          visible: true,
          formatter: () => '告警',
        },
        style: { normal: { fill: 'rgba(255, 0, 0, 0.65)' } },
        animation: {
          endState: {
            size: 30,
            opacity: 0.3,
          },
          animateCfg: {
            duration: 1500,
            easing: 'easeLinear',
            repeat: true,
            delay: 1200,
          },
        },
      },
    ],
  };

  return <Line {...config} />;
};

export default PeopleFlowLine;
