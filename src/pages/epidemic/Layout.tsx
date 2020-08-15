import React, {SFC} from 'react';
import PageTitle from '../../components/PageTitle';
import EpidemicList from '../../components/EpidemicList';
import EpidemicMap from '../../components/EpidemicMap';
import MonitorRadar from '../../components/MonitorRadar';
import EpidemicStatusLine from '../../components/EpidemicStatusLine';
import EpidemicSituationBar from '../../components/EpidemicSituationBar';

import { Row, Col } from 'antd';
import '../../theme/style/epidemic/layout.scss';


const EpidemicSituation: SFC = () => {

  return (
    <div className="epidemic">
      <PageTitle title="疫情监控"/>
      <Row>
        <Col span={24}>
          <EpidemicList pagination={{pageSize: 5}}/>
        </Col>
        <Col span={24}>
          <div className="card-box poor-map-box">
            <EpidemicMap/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <MonitorRadar title="疫情告警分布"/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <EpidemicStatusLine/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <EpidemicSituationBar/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EpidemicSituation;
