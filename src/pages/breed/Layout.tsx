import React, {SFC, useState} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import BreedList from '../../components/BreedList';
import MonitorChoiceModel from '../../components/MonitorChoiceModel';
import { MonitorObject } from '../../components/type';
import MonitorRadar from '../../components/MonitorRadar';
import HumidityLine from '../../components/HumidityLine';
import CO2Line from '../../components/CO2Line';
import PageTitle from '../../components/PageTitle';
import TemperatureLine from '../../components/TemperatureLine';
import { Breed} from '../../components/BreedList';

const BreedHome: SFC = () => {

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

  const greehouseData: Breed[] = [
    {
      id: '1',
      name: '养殖场1',
      manager: '李龙',
      phone: '位置1',
      type: '土豆',
      volume: 300,
      quota: 5000,
    },
    {
      id: '2',
      name: '养殖场2',
      manager: 'bala',
      phone: '位置1',
      type: '土豆',
      volume: 3000,
      quota: 50000,
    },
    {
      id: '3',
      name: '养殖场3',
      manager: '李mei',
      phone: '位置1',
      type: '土豆',
      volume: 5000,
      quota: 10000,
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
      user: '智能养殖',
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
      user: '智能养殖',
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
      user: '智能养殖',
      score: 70,
    },
  ];

  return (
    <div className="small-town-greenhouse">
      <PageTitle title="智能养殖"/>
      <Row>
        <Col span={24}>
          <BreedList lookup={lookUpMonitor} pagination={{pageSize: 5}} data={greehouseData}/>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box">
            <MonitorRadar title="养殖场1告警指标" data={monitorRadarData}/>
          </div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box">
            <HumidityLine data={humidityLineData} title="养殖场1湿度指标趋势"/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box"><CO2Line data={co2LineData} title="养殖场1（CO2）指标趋势"/></div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box"><TemperatureLine data={temperatureLineData} title="养殖场1温度指标趋势"/></div>
        </Col>
      </Row>
      <MonitorChoiceModel monitors={monitors} visible={monitorChoiceModelVisable} close={closeMonitorChoiceModel}/>
    </div>
  );
};

export default BreedHome;


