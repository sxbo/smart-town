import React, {SFC} from 'react';
import '../../theme/style/dashboard/common.scss';
import { StackedArea } from '@ant-design/charts';
import { StackedAreaConfig } from '@ant-design/charts/es/stackedArea';

const GreenHouseChart: SFC = () => {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  const data = [
    { type: '温度', date: '6', value: -2 },
    { type: '温度', date: '7', value: -1 },
    { type: '温度', date: '8', value: 3 },
    { type: '温度', date: '9', value: 8 },
    { type: '温度', date: '10', value: 12 },
    { type: '温度', date: '11', value: 18 },
    { type: '温度', date: '12', value: 22 },
    { type: 'CO2浓度', date: '6', value: 18 },
    { type: 'CO2浓度', date: '7', value: 16 },
    { type: 'CO2浓度', date: '8', value: 12 },
    { type: 'CO2浓度', date: '9', value: 11 },
    { type: 'CO2浓度', date: '10', value: 6 },
    { type: 'CO2浓度', date: '11', value: 3 },
    { type: 'CO2浓度', date: '12', value: 1 },
  ];
  const config: StackedAreaConfig = {
    title: {
      visible: true,
      text: '一号大棚项目（温度，CO2）指标',
    },
    data,
    xField: 'date',
    yField: 'value',
    stackField: 'type',
    color: ['#03a9f3', '#8bc0d6'],
    xAxis: {
      title: {
        text: '时',
        visible: true,
        offset: -3,
      },
      type: 'cat',
    },
    legend: {
      visible: true,
      position: 'top-center',
    },
    smooth: true,
    responsive: true,
  };

  return (
    <div className="card-box">
      <StackedArea {...config} />
    </div>
  );
};


export default GreenHouseChart;
