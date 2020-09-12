import React, { CSSProperties, SFC } from 'react';
import { Column } from '@ant-design/charts';
import { ColumnConfig } from '@ant-design/charts/es/column';

interface VillagePoorBarProp{
  title?: string | undefined;
  styleObj?: CSSProperties;
  yAxisTitleStyle?: Object;
}

const VillagePoorBar: SFC<VillagePoorBarProp> = (props) => {

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
    title: props.title ? {
      visible: true,
      text: props.title,
    // eslint-disable-next-line no-undefined
    } : undefined,
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'type',
    yField: 'sales',
    meta: {
      sales: { alias: '贫困户(户)'},
    },
    xAxis:{
      title: {
        text: '',
      },
    },
    yAxis: {
      title: props.yAxisTitleStyle,
    },
  };

  return <Column style={props.styleObj} {...config} />;
};

export default VillagePoorBar;
