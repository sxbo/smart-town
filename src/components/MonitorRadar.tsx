import React, {SFC} from 'react';
import '../theme/style/common.scss';
import { Radar } from '@ant-design/charts';
import { RadarConfig } from '@ant-design/charts/es/radar';

interface MonitorRadarProp{
  title: string;
  data?: any;
}

const MonitorRadarChart: SFC<MonitorRadarProp> = (props) => {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  const {title, data} = props;

  const config: RadarConfig = {
    title: {
      visible: true,
      text: title,
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
