import React, {SFC} from 'react';
import { Row, Col } from 'antd';
import '../../theme/style/dashboard/Layout.scss';
import NumberCard from './NumberCard';
import { UserOutlined, KeyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {DataCardProp} from './NumberCard';
import EpidemicSituationCard from './EpidemicSituationCard';
import GreenHouseChart from './GreenHouseChart';
import GreenHouseList from './GreenHouseList';

const DashBoard: SFC = () => {

  const cardData: DataCardProp[] = [
    {icon: <UserOutlined/>, num: 123556, text: '智能大棚（个）'},
    {icon: <UserOutlined/>, num: 4568, text: '养殖场（个）'},
    {icon: <ArrowRightOutlined/>, num: 885112, text: '精准扶贫（人）'},
    {icon: <KeyOutlined/>, num: 65334, text: '监控点（个）'},
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
        <Col xs={{ span: 24}}>
          <EpidemicSituationCard/>
        </Col>
      </Row>
      <Row className="gree-house">
        <Col xs={{ span: 24}} md={{ span: 16}} xl={{ span: 16}}>
          <GreenHouseList/>
        </Col>
        <Col xs={{ span: 24}} md={{ span: 8}} xl={{ span: 8}}>
          <GreenHouseChart/>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
