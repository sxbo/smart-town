/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC, useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import GreenHouseList from '../../components/GreenHouseList';
import { MonitorObject } from '../../components/type';
import MonitorRadar from '../../components/MonitorRadar';
import HumidityLine from '../../components/HumidityLine';
import CO2Line from '../../components/CO2Line';
import PageTitle from '../../components/PageTitle';
import TemperatureLine from '../../components/TemperatureLine';
import {GreenHouse as GreenHouseI} from '../../components/GreenHouseList';
import axios from 'axios';

const GreenHouse: SFC = () => {

  const [greehouseData, setgreehouseData] = useState([]);

  const monitors: MonitorObject[] = [
    {id: '1'},
    {id: '4'},
    {id: '2'},
    {id: '3'},
  ];

  /**
   * 删除大棚成功
   */
  const deleteSuccess = () => {
    getGreenhouses();
  };

  const co2LineData = [
    {
      Date: '06:00',
      scales: 10,
    },
    {
      date: '07:00',
      scales: 8,
    },
    {
      date: '08:00',
      scales: 7,
    },
    {
      date: '09:00',
      scales: 6,
    },
    {
      date: '10:00',
      scales: 3,
    },
    {
      date: '11:00',
      scales: 4,
    },
    {
      date: '12:00',
      scales: 2,
    },
    {
      date: '13:00',
      scales: 2,
    },
    {
      date: '14:00',
      scales: 2,
    },
    {
      date: '15:00',
      scales: 1,
    },
    {
      date: '16:00',
      scales: 1,
    },
    {
      date: '17:00',
      scales: 3,
    },
    {
      date: '18:00',
      scales: 4,
    },
    {
      date: '19:00',
      scales: 6,
    },
    {
      date: '20:00',
      scales: 7,
    },
    {
      date: '21:00',
      scales: 9,
    },
  ];

  const humidityLineData = [
    {
      Date: '06:00',
      scales: 1,
    },
    {
      date: '07:00',
      scales: 0.9,
    },
    {
      date: '08:00',
      scales: 0.7,
    },
    {
      date: '09:00',
      scales: 0.6,
    },
    {
      date: '10:00',
      scales: 0.6,
    },
    {
      date: '11:00',
      scales: 0.6,
    },
    {
      date: '12:00',
      scales: 0.5,
    },
    {
      date: '13:00',
      scales: 0.5,
    },
    {
      date: '14:00',
      scales: 0.6,
    },
    {
      date: '15:00',
      scales: 0.8,
    },
    {
      date: '16:00',
      scales: 0.9,
    },
    {
      date: '17:00',
      scales: 0.9,
    },
    {
      date: '18:00',
      scales: 1,
    },
    {
      date: '19:00',
      scales: 1,
    },
    {
      date: '20:00',
      scales: 1,
    },
    {
      date: '21:00',
      scales: 1,
    },
  ];

  const temperatureLineData = [
    {
      Date: '06:00',
      scales: -1,
    },
    {
      date: '07:00',
      scales: 3,
    },
    {
      date: '08:00',
      scales: 5,
    },
    {
      date: '09:00',
      scales: 7,
    },
    {
      date: '10:00',
      scales: 8,
    },
    {
      date: '11:00',
      scales: 13,
    },
    {
      date: '12:00',
      scales: 18,
    },
    {
      date: '13:00',
      scales: 22,
    },
    {
      date: '14:00',
      scales: 25,
    },
    {
      date: '15:00',
      scales: 26,
    },
    {
      date: '16:00',
      scales: 26,
    },
    {
      date: '17:00',
      scales: 23,
    },
    {
      date: '18:00',
      scales: 19,
    },
    {
      date: '19:00',
      scales: 13,
    },
    {
      date: '20:00',
      scales: 10,
    },
    {
      date: '21:00',
      scales: 5,
    },
  ];

  const monitorRadarData = [
    {
      item: '大棚',
      user: '全部告警',
      score: 70,
    },
    {
      item: '湿度',
      user: '智能大棚',
      score: 50,
    },
    {
      item: '养殖',
      user: '全部告警',
      score: 60,
    },
    {
      item: '疫情',
      user: '全部告警',
      score: 60,
    },
    {
      item: '温度',
      user: '智能大棚',
      score: 50,
    },
    {
      item: '景区',
      user: '全部告警',
      score: 40,
    },
    {
      item: '滑坡',
      user: '全部告警',
      score: 60,
    },
    {
      item: 'CO2',
      user: '智能大棚',
      score: 70,
    },
  ];

  const getGreenhouses = () => {
    axios({
      method: 'GET',
      url: 'api/greenhouse',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        setgreehouseData(data);
      } else {
        setgreehouseData([]);
      }
    }).catch(() => {
      setgreehouseData([]);
    });
  };

  useEffect(() => {
    getGreenhouses();
  }, []);

  return (
    <div className="small-town-greenhouse">
      <PageTitle title="智能大棚"/>
      <Row>
        <Col span={24}>
          <GreenHouseList deleteSuccess={deleteSuccess} pagination={{pageSize: 5}} data={greehouseData}/>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box">
            <MonitorRadar title="1号大棚告警指标" data={monitorRadarData}/>
          </div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box">
            <HumidityLine data={humidityLineData} title="1号大棚湿度指标趋势"/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box"><CO2Line title="1号大棚CO2指标趋势" data={co2LineData}/></div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box"><TemperatureLine data={temperatureLineData} title="1号大棚温度指标趋势"/></div>
        </Col>
      </Row>
    </div>
  );
};

export default GreenHouse;


