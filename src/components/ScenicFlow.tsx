/* eslint-disable quotes */
import React, { CSSProperties, SFC } from 'react';
import { Scatter } from '@ant-design/charts';
import {ScatterConfig} from '@ant-design/charts/es/scatter';

interface ScenicFlowProp {
  styleObj?: CSSProperties;
  legendTextStyle?: Object;
  title?: string;
}

const ScenicFlow: SFC<ScenicFlowProp> = (props) => {

  const data = [
    {
      "H/A": "A",
      "Team": "Torino",
      "车流量": 0.62,
      "客流量": 10,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "Atalanta",
      "车流量": 2.35,
      "客流量": 23,
      "Result": '营田度假村',
    },
    {
      "H/A": "A",
      "Team": "Milan",
      "车流量": 1.89,
      "客流量": 26,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Chievo",
      "车流量": 1.4,
      "客流量": 13,
      "Result": '营田度假村',
    },
    {
      "H/A": "A",
      "Team": "Bologna",
      "车流量": 1.02,
      "客流量": 11,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Frosinone",
      "车流量": 0.56,
      "客流量": 11,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "Lazio",
      "车流量": 1.01,
      "客流量": 16,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Empoli",
      "车流量": 1.56,
      "客流量": 20,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "Spal",
      "车流量": 1.8,
      "客流量": 6,
      "Result": '太白山',
    },
    {
      "H/A": "A",
      "Team": "Napoli",
      "车流量": 2.49,
      "客流量": 26,
      "Result": '营田度假村',
    },
    {
      "H/A": "A",
      "Team": "Fiorentina",
      "车流量": 1.3,
      "客流量": 14,
      "Result": '营田度假村',
    },
    {
      "H/A": "H",
      "Team": "Sampdoria",
      "车流量": 1.2,
      "客流量": 8,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Udinese",
      "车流量": 1.22,
      "客流量": 9,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Inter",
      "车流量": 2.68,
      "客流量": 17,
      "Result": '营田度假村',
    },
    {
      "H/A": "A",
      "Team": "Cagliari",
      "车流量": 2.1,
      "客流量": 16,
      "Result": '营田度假村',
    },
    {
      "H/A": "H",
      "Team": "Genoa",
      "车流量": 1.84,
      "客流量": 15,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Juventus",
      "车流量": 2.12,
      "客流量": 20,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Sassuolo",
      "车流量": 0.72,
      "客流量": 10,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Parma",
      "车流量": 0.58,
      "客流量": 6,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "Torino",
      "车流量": 1.87,
      "客流量": 10,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Atalanta",
      "车流量": 2.68,
      "客流量": 23,
      "Result": '营田度假村',
    },
    {
      "H/A": "H",
      "Team": "Milan",
      "车流量": 0.85,
      "客流量": 8,
      "Result": '营田度假村',
    },
    {
      "H/A": "A",
      "Team": "Chievo",
      "车流量": 0.84,
      "客流量": 16,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "Bologna",
      "车流量": 2.69,
      "客流量": 20,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Frosinone",
      "车流量": 1.51,
      "客流量": 11,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Lazio",
      "车流量": 1.77,
      "客流量": 13,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Empoli",
      "车流量": 0.14,
      "客流量": 5,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "Real Madrid",
      "车流量": 3.58,
      "客流量": 30,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Viktoria Plzen",
      "车流量": 0.33,
      "客流量": 7,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "CSKA Moscow",
      "车流量": 0.73,
      "客流量": 13,
      "Result": '华山景区',
    },
    {
      "H/A": "A",
      "Team": "CSKA Moscow",
      "车流量": 1.1,
      "客流量": 14,
      "Result": '华山景区',
    },
    {
      "H/A": "H",
      "Team": "Real Madrid",
      "车流量": 1.87,
      "客流量": 12,
      "Result": '太白山',
    },
    {
      "H/A": "A",
      "Team": "Viktoria Plzen",
      "车流量": 1.85,
      "客流量": 13,
      "Result": '太白山',
    },
    {
      "H/A": "A",
      "Team": "Porto",
      "车流量": 3.71,
      "客流量": 31,
      "Result": '太白山',
    },
    {
      "H/A": "H",
      "Team": "Porto",
      "车流量": 0.56,
      "客流量": 7,
      "Result": '华山景区',
    },
  ];

  const config: ScatterConfig = {
    title: props.title ? {
      visible: true,
      text: props.title,
    // eslint-disable-next-line no-undefined
    } : undefined,
    data,
    xField: '车流量',
    yField: '客流量',
    colorField: 'Result',
    color: ['#c71e1d', '#ffca76', '#09bb9f'],
    pointSize: 5,
    pointStyle: { fillOpacity: 1 },
    yAxis: {
      visible: true,
      min: 0,
    },
    legend: {
      text: props.legendTextStyle,
    },
  };

  return <Scatter style={props.styleObj} {...config} />;
};

export default ScenicFlow;
