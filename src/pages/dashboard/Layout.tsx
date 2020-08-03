import React, {SFC} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/dashboard/Layout.scss';
import NumberCard from './NumberCard';
import { DeploymentUnitOutlined, GoldOutlined, VideoCameraOutlined, TrophyOutlined } from '@ant-design/icons';
import {DataCardProp} from './NumberCard';
import EpidemicSituationLine from './EpidemicSituationLine';
import GreenHouseChart from './GreenHouseChart';
import GreenHouseList from './GreenHouseList';
import EpidemicSituationBar from './EpidemicSituationBar';
import '../../theme/style/common.scss';

const DashBoard: SFC = () => {

  const cardData: DataCardProp[] = [
    {icon: <DeploymentUnitOutlined style={{fontSize: '50px', color: '#00c292'}}/>, num: 123556, text: '智能大棚（个）'},
    {icon: <GoldOutlined style={{fontSize: '50px', color: '#ab8ce4'}}/>, num: 4568, text: '养殖场（个）'},
    {icon: <TrophyOutlined style={{fontSize: '50px', color: '#03a9f3'}}/>, num: 885112, text: '精准扶贫（人）'},
    {icon: <VideoCameraOutlined style={{fontSize: '50px', color: '#fb9678'}}/>, num: 65334, text: '监控点（个）'},
  ];

  return (
    <div className="small-town-dashboard">
      <Row className="data-board">
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}}>
          <NumberCard {...cardData[0]}/>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}}>
          <NumberCard {...cardData[1]}/>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}}>
          <NumberCard {...cardData[2]}/>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}}>
          <NumberCard {...cardData[3]}/>
        </Col>
      </Row>
      <Row className="epidemic-situation">
        <div className="card-box">
          <Row>
            <Col xs={{ span: 24}} md={{ span: 16}} xl={{ span: 16}}>
              <EpidemicSituationLine/>
            </Col>
            <Col xs={{ span: 24}} md={{ span: 8}} xl={{ span: 8}}>
              <EpidemicSituationBar/>
            </Col>
          </Row>
        </div>
      </Row>
      <Row className="gree-house">
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <GreenHouseList/>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 12}} xl={{ span: 12}}>
          <GreenHouseChart/>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
