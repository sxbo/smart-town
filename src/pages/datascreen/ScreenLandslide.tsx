import React, { useState, useEffect, CSSProperties } from 'react';
import { Area } from '@ant-design/charts';

interface ScreenLandslidePro{
  styleObj?: CSSProperties;
}

const ScreenLandslide: React.FC<ScreenLandslidePro> = (props) => {

  const [data, setData] = useState<any>([]);
  const sourceSata = [
    {
      Date: '06:00',
      scales: 0.8,
    },
    {
      Date: '07:00',
      scales: 0.5,
    },
    {
      Date: '08:00',
      scales: 0.6,
    },
    {
      Date: '09:00',
      scales: 0.7,
    },
    {
      Date: '10:00',
      scales: 0.9,
    },
    {
      Date: '11:00',
      scales: 0.9,
    },
    {
      Date: '12:00',
      scales: 0.9,
    },
    {
      Date: '13:00',
      scales: 0.7,
    },
    {
      Date: '14:00',
      scales: 0.6,
    },
    {
      Date: '15:00',
      scales: 0.8,
    },
    {
      Date: '16:00',
      scales: 0.5,
    },
    {
      Date: '17:00',
      scales: 0.4,
    },
    {
      Date: '18:00',
      scales: 0.2,
    },
    {
      Date: '19:00',
      scales: 0.2,
    },
    {
      Date: '20:00',
      scales: 0.1,
    },
    {
      Date: '21:00',
      scales: 0.1,
    },
    {
      Date: '22:00',
      scales: 0.1,
    },
    {
      Date: '23:00',
      scales: 0.1,
    },
    {
      Date: '00:00',
      scales: 0.1,
    },
    {
      Date: '01:00',
      scales: 0.2,
    },
    {
      Date: '02:00',
      scales: 0.4,
    },
    {
      Date: '03:00',
      scales: 0.2,
    },
    {
      Date: '04:00',
      scales: 0.4,
    },
    {
      Date: '05:00',
      scales: 0.6,
    },
  ];

  useEffect(() => {
    setData(sourceSata);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
    tooltip: {
      formatter: function(a:any, b:any){
        return {name: '系数', value: b};
      },
    },
  };

  return <Area style={props.styleObj} {...config} />;
};

export default ScreenLandslide;
