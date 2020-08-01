import '../../theme/style/dashboard/common.scss';
import React, { SFC } from 'react';
import { StackedArea } from '@ant-design/charts';
import {StackedAreaConfig} from '@ant-design/charts/es/stackedArea';
import './EpidemicSituationLine.scss';


const EpidemicSituationLine: SFC = () => {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  const data = [
    { country: '全国', date: '07-26', value: 1000 },
    { country: '全国', date: '07-27', value: 5000 },
    { country: '全国', date: '07-28', value: 8000 },
    { country: '全国', date: '07-29', value: 2000 },
    { country: '全国', date: '07-30', value: 600 },
    { country: '全市', date: '07-26', value: 500 },
    { country: '全市', date: '07-27', value: 1000 },
    { country: '全市', date: '07-28', value: 6000 },
    { country: '全市', date: '07-29', value: 600 },
    { country: '全市', date: '07-30', value: 10 },
    { country: '全镇', date: '07-26', value: 100 },
    { country: '全镇', date: '07-27', value: 500 },
    { country: '全镇', date: '07-28', value: 1000 },
    { country: '全镇', date: '07-29', value: 200 },
    { country: '全镇', date: '07-30', value: 20 },
  ];

  const config: StackedAreaConfig = {
    title: {
      visible: true,
      text: '疫情新增趋势',
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
