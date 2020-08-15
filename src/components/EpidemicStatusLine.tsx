import React, { SFC } from 'react';
import { Line } from '@ant-design/charts';
import {LineConfig } from '@ant-design/charts/es/line';

const EpidemicStatusLine: SFC = () => {

  const data = [
    {
      'date': '2020-07-01',
      'value': 2,
      category: '治愈',
    },
    {
      'date': '2020-07-01',
      'value': 10,
      category: '已确诊',
    },
    {
      'date': '2020-07-01',
      'value': 0,
      category: '隔离中',
    },
    {
      'date': '2020-07-01',
      'value': 0,
      category: '无状态',
    },
    {
      'date': '2020-07-02',
      'value': 20,
      category: '治愈',
    },
    {
      'date': '2020-07-02',
      'value': 54,
      category: '已确诊',
    },
    {
      'date': '2020-07-02',
      'value': 10,
      category: '隔离中',
    },
    {
      'date': '2020-07-02',
      'value': 2,
      category: '无状态',
    },
    {
      'date': '2020-07-03',
      'value': 32,
      category: '治愈',
    },
    {
      'date': '2020-07-03',
      'value': 60,
      category: '已确诊',
    },
    {
      'date': '2020-07-03',
      'value': 23,
      category: '隔离中',
    },
    {
      'date': '2020-07-03',
      'value': 8,
      category: '无状态',
    },
    {
      'date': '2020-07-04',
      'value': 38,
      category: '治愈',
    },
    {
      'date': '2020-07-04',
      'value': 30,
      category: '已确诊',
    },
    {
      'date': '2020-07-04',
      'value': 32,
      category: '隔离中',
    },
    {
      'date': '2020-07-04',
      'value': 15,
      category: '无状态',
    },
    {
      'date': '2020-07-05',
      'value': 45,
      category: '治愈',
    },
    {
      'date': '2020-07-05',
      'value': 20,
      category: '已确诊',
    },
    {
      'date': '2020-07-05',
      'value': 25,
      category: '隔离中',
    },
    {
      'date': '2020-07-05',
      'value': 16,
      category: '无状态',
    },
    {
      'date': '2020-07-06',
      'value': 55,
      category: '治愈',
    },
    {
      'date': '2020-07-06',
      'value': 8,
      category: '已确诊',
    },
    {
      'date': '2020-07-06',
      'value': 20,
      category: '隔离中',
    },
    {
      'date': '2020-07-06',
      'value': 14,
      category: '无状态',
    },
    {
      'date': '2020-07-07',
      'value': 60,
      category: '治愈',
    },
    {
      'date': '2020-07-07',
      'value': 2,
      category: '已确诊',
    },
    {
      'date': '2020-07-07',
      'value': 20,
      category: '隔离中',
    },
    {
      'date': '2020-07-07',
      'value': 15,
      category: '无状态',
    },
  ];


  const config: LineConfig = {
    title: {
      visible: true,
      text: '疫情状态趋势',
    },
    padding: 'auto',
    forceFit: true,
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    // xAxis: { type: 'time' },
    yAxis: { label: { formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) } },
    color: ['#60d7a7', '#e23333', '#03a9f3', '#ab8ce4'],
    // smooth: true,
    responsive: true,
  };

  return <Line {...config} />;
};

export default EpidemicStatusLine;
