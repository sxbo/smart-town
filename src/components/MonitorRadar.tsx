import React, {SFC} from 'react';
import '../theme/style/common.scss';
import { Radar } from '@ant-design/charts';
import { RadarConfig } from '@ant-design/charts/es/radar';

const MonitorRadarChart: SFC = () => {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  const data = [
    {
      item: 'Design',
      user: 'a',
      score: 70,
    },
    {
      item: 'Development',
      user: 'a',
      score: 60,
    },
    {
      item: 'Marketing',
      user: 'a',
      score: 60,
    },
    {
      item: 'Marketing',
      user: 'b',
      score: 50,
    },
    {
      item: 'Users',
      user: 'a',
      score: 40,
    },
    {
      item: 'Users',
      user: 'b',
      score: 50,
    },
    {
      item: 'Test',
      user: 'a',
      score: 60,
    },
    {
      item: 'Test',
      user: 'b',
      score: 70,
    },
    {
      item: 'Language',
      user: 'a',
      score: 70,
    },
    {
      item: 'Language',
      user: 'b',
      score: 50,
    },
    {
      item: 'Technology',
      user: 'a',
      score: 50,
    },
    {
      item: 'Technology',
      user: 'b',
      score: 40,
    },
    {
      item: 'Support',
      user: 'a',
      score: 30,
    },
    {
      item: 'Support',
      user: 'b',
      score: 40,
    },
    {
      item: 'Sales',
      user: 'a',
      score: 60,
    },
    {
      item: 'Sales',
      user: 'b',
      score: 40,
    },
    {
      item: 'UX',
      user: 'a',
      score: 50,
    },
    {
      item: 'UX',
      user: 'b',
      score: 60,
    },
  ];
  const config: RadarConfig = {
    title: {
      visible: true,
      text: '1号大棚告警指标',
    },
    data,
    angleField: 'item',
    radiusField: 'score',
    seriesField: 'user',
    radiusAxis: { grid: { line: { type: 'line' } } },
    line: { visible: true },
    point: {
      visible: true,
      shape: 'circle',
    },
    legend: {
      visible: true,
      position: 'bottom-center',
    },
  };

  return <Radar {...config}/>;
};


export default MonitorRadarChart;
