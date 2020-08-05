import React, {SFC, useState} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/common.scss';
import '../../theme/style/greenhouse/layout.scss';
import GreenHouseList from '../../components/GreenHouseList';
import MonitorChoiceModel from '../../components/MonitorChoiceModel';
import { MonitorObject } from '../../components/type';

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
      <Row>
        <Col span={24}>
          <GreenHouseList lookup={lookUpMonitor} pagination={{pageSize: 5}}/>
        </Col>
      </Row>
      <MonitorChoiceModel monitors={monitors} visible={monitorChoiceModelVisable} close={closeMonitorChoiceModel}/>
    </div>
  );
};

export default GreenHouse;


