import '../theme/style/common.scss';
import React, { SFC } from 'react';
import { StackedArea } from '@ant-design/charts';

import {StackedAreaConfig} from '@ant-design/charts/es/stackedArea';

import './EpidemicSituationLine.scss';

interface EpidemicLineProp{
  title: string;
  data: any;
}

const EpidemicSituationLine: SFC<EpidemicLineProp> = (props) => {

  const {title, data} = props;
  const config: StackedAreaConfig = {
    title: {
      visible: true,
      text: title,
    },
    data,
    xField: 'date',
    yField: 'value',
    stackField: 'country',
    color: ['#ab8ce4', '#fb9678', '#60d7a7'],
    xAxis: {
      type: 'time',
      tickCount: 5,
    },
    legend: {
      visible: true,
      position: 'top-center',
    },
    smooth: true,
    responsive: true,
  };

  return <div className="epidemic-box">
    <StackedArea {...config} />
  </div>;
};

export default EpidemicSituationLine;
