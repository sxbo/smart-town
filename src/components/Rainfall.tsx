import React, { SFC } from 'react';
import { ColumnLine } from '@ant-design/charts';

const Rainfall: SFC = () => {
  const uvData = [
    {
      time: '06:00',
      value: 350,
    },
    {
      time: '07:00',
      value: 900,
    },
    {
      time: '08:00',
      value: 300,
    },
    {
      time: '09:00',
      value: 450,
    },
    {
      time: '10:00',
      value: 470,
    },
    {
      time: '11:00',
      value: 350,
    },
    {
      time: '12:00',
      value: 900,
    },
    {
      time: '13:00',
      value: 300,
    },
    {
      time: '14:00',
      value: 450,
    },
    {
      time: '15:00',
      value: 470,
    },
    {
      time: '16:00',
      value: 350,
    },
    {
      time: '17:00',
      value: 900,
    },
  ];
  const transformData = [
    {
      time: '06:00',
      count: 0.35,
    },
    {
      time: '07:00',
      count: 0.8,
    },
    {
      time: '08:00',
      count: 0.2,
    },
    {
      time: '09:00',
      count: 0.45,
    },
    {
      time: '10:00',
      count: 0.4,
    },
    {
      time: '11:00',
      count: 0.3,
    },
    {
      time: '12:00',
      count: 0.9,
    },
    {
      time: '13:00',
      count: 0.2,
    },
    {
      time: '14:00',
      count: 0.4,
    },
    {
      time: '15:00',
      count: 0.4,
    },
    {
      time: '16:00',
      count: 0.3,
    },
    {
      time: '17:00',
      count: 0.7,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '降水监测',
    },
    description: {
      visible: true,
      text: '未来12小时降雨量与降雨系数',
    },
    data: [uvData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    // columnConfig: { color: '#586bce' },
    lineConfig: {
      color: '#29cae4',
      point: { visible: true },
      label: { visible: true },
    },
  };

  return <ColumnLine {...config} />;
};

export default Rainfall;
