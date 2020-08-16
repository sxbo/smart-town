import React, {SFC, useState} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import GreenHouseList from '../../components/GreenHouseList';
import MonitorChoiceModel from '../../components/MonitorChoiceModel';
import { MonitorObject } from '../../components/type';
import MonitorRadar from '../../components/MonitorRadar';
import HumidityLine from '../../components/HumidityLine';
import CO2Line from '../../components/CO2Line';
import PageTitle from '../../components/PageTitle';
import TemperatureLine from '../../components/TemperatureLine';
import {GreenHouse as GreenHouseI} from '../../components/GreenHouseList';

const GreenHouse: SFC = () => {

  const [monitorChoiceModelVisable, setmonitorChoiceModel] = useState(false);

  const monitors: MonitorObject[] = [
    {id: '1'},
    {id: '4'},
    {id: '2'},
    {id: '3'},
  ];

  const closeMonitorChoiceModel = () => {
    setmonitorChoiceModel(false);
  };

  const lookUpMonitor = () => {
    setmonitorChoiceModel(true);
  };

  const greehouseData: GreenHouseI[] = [
    {
      key: '1',
      name: '1号大棚',
      manager: '李龙',
      address: '位置1',
      alarmNum: 5,
      monitorNum: 3,
    },
    {
      key: '2',
      name: '2号大棚',
      manager: '陈梅',
      address: '位置2',
      alarmNum: 10,
      monitorNum: 4,
    },
    {
      key: '3',
      name: '3号大棚',
      manager: '李龙',
      address: '位置3',
      alarmNum: 1,
      monitorNum: 5,
    },
  ];

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

  return (
    <div className="small-town-greenhouse">
      <PageTitle title="智能大棚"/>
      <Row>
        <Col span={24}>
          <GreenHouseList lookup={lookUpMonitor} pagination={{pageSize: 5}} data={greehouseData}/>
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
      <MonitorChoiceModel monitors={monitors} visible={monitorChoiceModelVisable} close={closeMonitorChoiceModel}/>
    </div>
  );
};

export default GreenHouse;


