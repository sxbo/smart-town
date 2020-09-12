import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
import { LineConfig } from '@ant-design/charts/es/line';

const ScreenDataLines: SFC = () => {
  const data = [
    {
      date: '08:00',
      type: 'CO2',
      value: 12.8,
    },
    {
      date: '08:00',
      type: '温度',
      value: 3.5,
    },
    {
      date: '08:00',
      type: '湿度',
      value: 1,
    },
    {
      date: '09:00',
      type: 'CO2',
      value: 10,
    },
    {
      date: '09:00',
      type: '温度',
      value: 4,
    },
    {
      date: '09:00',
      type: '湿度',
      value: 3.2,
    },
    {
      date: '10:00',
      type: 'CO2',
      value: 9,
    },
    {
      date: '10:00',
      type: '温度',
      value: 6,
    },
    {
      date: '10:00',
      type: '湿度',
      value: 3.0,
    },
    {
      date: '11:00',
      type: 'CO2',
      value: 9,
    },
    {
      date: '11:00',
      type: '温度',
      value: 8,
    },
    {
      date: '11:00',
      type: '湿度',
      value: 2.6,
    },
    {
      date: '12:00',
      type: 'CO2',
      value: 8,
    },
    {
      date: '12:00',
      type: '温度',
      value: 8.5,
    },
    {
      date: '12:00',
      type: '湿度',
      value: 2.5,
    },
    {
      date: '13:00',
      type: 'CO2',
      value: 6,
    },
    {
      date: '13:00',
      type: '温度',
      value: 10,
    },
    {
      date: '13:00',
      type: '湿度',
      value: 2.4,
    },
    {
      date: '14:00',
      type: 'CO2',
      value: 5.5,
    },
    {
      date: '14:00',
      type: '温度',
      value: 14,
    },
    {
      date: '14:00',
      type: '湿度',
      value: 2,
    },
    {
      date: '15:00',
      type: 'CO2',
      value: 5,
    },
    {
      date: '15:00',
      type: '温度',
      value: 13.5,
    },
    {
      date: '15:00',
      type: '湿度',
      value: 2.5,
    },
    {
      date: '16:00',
      type: 'CO2',
      value: 5.5,
    },
    {
      date: '16:00',
      type: '温度',
      value: 14,
    },
    {
      date: '16:00',
      type: '湿度',
      value: 2.5,
    },
    {
      date: '17:00',
      type: 'CO2',
      value: 6.5,
    },
    {
      date: '17:00',
      type: '温度',
      value: 13.5,
    },
    {
      date: '17:00',
      type: '湿度',
      value: 2.8,
    },
    {
      date: '18:00',
      type: 'CO2',
      value: 6.8,
    },
    {
      date: '18:00',
      type: '温度',
      value: 10,
    },
    {
      date: '18:00',
      type: '湿度',
      value: 3.0,
    },
    {
      date: '19:00',
      type: 'CO2',
      value: 7.0,
    },
    {
      date: '19:00',
      type: '温度',
      value: 9,
    },
    {
      date: '19:00',
      type: '湿度',
      value: 3.1,
    },
    {
      date: '20:00',
      type: 'CO2',
      value: 7.3,
    },
    {
      date: '20:00',
      type: '温度',
      value: 8,
    },
    {
      date: '20:00',
      type: '湿度',
      value: 3.5,
    },
    {
      date: '21:00',
      type: 'CO2',
      value: 8.5,
    },
    {
      date: '21:00',
      type: '温度',
      value: 3.5,
    },
    {
      date: '21:00',
      type: '湿度',
      value: 4.5,
    },
  ];


  const config: LineConfig = {
    forceFit: true,
    padding: 'auto',
    data,
    xField: 'date',
    yField: 'value',
    yAxis: { nice: true },
    xAxis: {
      tickCount: 5,
    },
    label: { visible: false },
    seriesField: 'type',
    markerPoints: [
      {
        visible: true,
        data: [{ value: 16 }, {value: 15}, {value: 13}],
        label: {
          visible: true,
          formatter: () => '告警',
        },
        style: { normal: { fill: 'rgba(255, 0, 0, 0.65)' } },
        animation: {
          endState: {
            size: 30,
          },
          animateCfg: {
            duration: 1500,
            easing: 'easeLinear',
            delay: 1200,
          },
        },
      },
    ],
    legend: {
      position: 'bottom-center',
      text: {
        style: {
          fill: '#ffffff',
        },
      },
      marker: {
        symbol: 'line',
        style: {},
      },
    },
    smooth: true,
  };

  return <Line style={{height: 'calc(100% - 0.4rem)'}} {...config} />;
};

export default ScreenDataLines;
