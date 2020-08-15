import '../theme/style/common.scss';
import React, { SFC } from 'react';
import './EpidemicSituationBar.scss';
import { Bar } from '@ant-design/charts';
import { BarConfig } from '@ant-design/charts/es/bar';


const EpidemicSituationBar: SFC = () => {

  const data = [
    {
      year: '隔离中（人）',
      sales: 38,
      category: 'A',
    },
    {
      year: '无症状（人）',
      sales: 52,
      category: 'A',
    },
    {
      year: '确诊（人）',
      sales: 61,
      category: 'A',
    },
    {
      year: '治愈（人）',
      sales: 145,
      category: 'A',
    },
  ];
  const config: BarConfig = {
    forceFit: true,
    title: {
      visible: true,
      text: '疫情数据统计',
    },
    data,
    xField: 'sales',
    yField: 'year',
    colorField: 'year',
    color: ['#00c292', '#ab8ce4', '#fb9678', '#03a9f3'],
    label: {
      visible: true,
      position: 'middle',
      adjustColor: true,
    },
  };

  return <Bar {...config} />;
};

export default EpidemicSituationBar;
