import React, {SFC} from 'react';
import { Row, Col } from 'antd';

import PageTitle from '../../components/PageTitle';
import Rainfall from '../../components/Rainfall';
import LandSlideList from '../../components/LandSlideList';
import LandWarnLine from '../../components/LandWarnLine';
import MonitorRadar from '../../components/MonitorRadar';

import '../../theme/style/scenic/layout.scss';
import '../../theme/style/common.scss';

const LandSlide: SFC = () => {

  const monitorRadarData = [
    {
      item: '大棚',
      user: '全部告警',
      score: 70,
    },
    {
      item: '山体点1',
      user: '山体滑坡',
      score: 50,
    },
    {
      item: '养殖',
      user: '全部告警',
      score: 60,
    },
    {
      item: '山体点2',
      user: '山体滑坡',
      score: 60,
    },
    {
      item: '疫情',
      user: '全部告警',
      score: 60,
    },
    {
      item: '山体点3',
      user: '山体滑坡',
      score: 50,
    },
    {
      item: '景区',
      user: '全部告警',
      score: 40,
    },
    {
      item: '山体点4',
      user: '山体滑坡',
      score: 70,
    },
    {
      item: '滑坡',
      user: '全部告警',
      score: 60,
    },
  ];

  return (
    <div className="scenic">
      <PageTitle title="山体滑坡监测"/>
      <Row>
        <Col span={24}>
          <div className="card-box">
            <LandSlideList pagination={{pageSize: 5}}/>
          </div>
        </Col>
        <Col span={24}>
          <div className="card-box">
            <Rainfall/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <MonitorRadar title="山体滑坡告警指标" data={monitorRadarData}/>
          </div>
        </Col>
        <Col span={16}>
          <div className="card-box">
            <LandWarnLine/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandSlide;
