import React, {SFC, CSSProperties} from 'react';
import '../theme/style/common.scss';
import { Radar } from '@ant-design/charts';
import { RadarConfig } from '@ant-design/charts/es/radar';

export interface ChartProp{
  title?: string;
  data?: any;
  styleObj?: CSSProperties
  rediusAxisLabel?: Object;
  angleAxixLabel?: Object;
  legendTextStyle?: Object
}

const MonitorRadarChart: SFC<ChartProp> = (props) => {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  const {title, data, styleObj, rediusAxisLabel, angleAxixLabel, legendTextStyle} = props;

  const config: RadarConfig = {
    forceFit: true,
    padding: 'auto',
    title: title ? {
      visible: true,
      text: title,
    // eslint-disable-next-line no-undefined
    } : undefined,
    data,
    angleField: 'item',
    radiusField: 'score',
    seriesField: 'user',
    radiusAxis: {
      grid: {
        line: {
          type: 'line',
        },
      },
      label: rediusAxisLabel,
    },
    line: { visible: true },
    point: {
      visible: true,
      shape: 'circle',
    },
    legend: {
      visible: true,
      position: 'bottom-center',
      text: legendTextStyle,
    },
    angleAxis: {
      label: angleAxixLabel,
    },
  };

  return <Radar style={styleObj} {...config}/>;
};


export default MonitorRadarChart;
