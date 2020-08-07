import React, { SFC } from 'react';
import { Column } from '@ant-design/charts';
import { ColumnConfig } from '@ant-design/charts/es/column';

const VillagePoorBar: SFC = () => {

  const data = [
    {
      type: '西寺子村',
      sales: 38,
    },
    {
      type: '金裕村',
      sales: 52,
    },
    {
      type: '乌牛村',
      sales: 61,
    },
    {
      type: '井庄村',
      sales: 145,
    },
    {
      type: '雷北村',
      sales: 48,
    },
    {
      type: '范家村',
      sales: 38,
    },
    {
      type: '雷南村',
      sales: 38,
    },
    {
      type: '华原村',
      sales: 38,
    },
    {
      type: '西岐村',
      sales: 38,
    },
    {
      type: '北干村',
      sales: 38,
    },
    {
      type: '加里村',
      sales: 38,
    },
    {
      type: '营田村',
      sales: 38,
    },
    {
      type: '上辛村',
      sales: 38,
    },
    {
      type: '下辛村',
      sales: 38,
    },
    {
      type: '南干村',
      sales: 38,
    },
  ];
  const config: ColumnConfig = {
    title: {
      visible: true,
      text: '范家镇贫困户统计',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'type',
    yField: 'sales',
    meta: {
      sales: { alias: '贫困户(户)' },
    },
  };

  return <Column {...config} />;
};

export default VillagePoorBar;
