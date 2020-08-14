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

  return (
    <div className="small-town-greenhouse">
      <PageTitle title="智能大棚"/>
      <Row>
        <Col span={24}>
          <GreenHouseList lookup={lookUpMonitor} pagination={{pageSize: 5}}/>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box">
            <MonitorRadar title="1号大棚告警指标"/>
          </div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box">
            <HumidityLine/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box"><CO2Line/></div>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <div className="card-box"><TemperatureLine/></div>
        </Col>
      </Row>
      <MonitorChoiceModel monitors={monitors} visible={monitorChoiceModelVisable} close={closeMonitorChoiceModel}/>
    </div>
  );
};

export default GreenHouse;


