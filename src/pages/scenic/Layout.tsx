import React, {SFC} from 'react';
import { Row, Col } from 'antd';

import PageTitle from '../../components/PageTitle';
import ScenicFlow from '../../components/ScenicFlow';
import ScenicList from '../../components/ScenicList';
import MonitorRadar from '../../components/MonitorRadar';
import PeopleFlowLine from '../../components/PeopleFlowLine';
import CarFlowLine from '../../components/CarFlowLine';

import '../../theme/style/scenic/layout.scss';
import '../../theme/style/common.scss';

const ScenicMonitor: SFC = () => {

  const monitorRadarData = [
    {
      item: '大棚',
      user: '全部告警',
      score: 70,
    },
    {
      item: '景区1',
      user: '景点监控',
      score: 50,
    },
    {
      item: '养殖',
      user: '全部告警',
      score: 60,
    },
    {
      item: '景区5',
      user: '景点监控',
      score: 70,
    },
    {
      item: '疫情',
      user: '全部告警',
      score: 60,
    },
    {
      item: '景区2',
      user: '景点监控',
      score: 50,
    },
    {
      item: '景区',
      user: '全部告警',
      score: 40,
    },
    {
      item: '景区4',
      user: '景点监控',
      score: 70,
    },
    {
      item: '滑坡',
      user: '全部告警',
      score: 60,
    },
    {
      item: '景区3',
      user: '景点监控',
      score: 70,
    },
  ];

  return (
    <div className="scenic">
      <PageTitle title="景点监控"/>
      <Row>
        <Col span={24}>
          <div className="card-box">
            <ScenicList pagination={{pageSize: 5}}/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <MonitorRadar title="景区告警分布" data={monitorRadarData}/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <PeopleFlowLine/>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-box">
            <CarFlowLine/>
          </div>
        </Col>
        <Col span={24}>
          <div className="card-box">
            <ScenicFlow title="近四个月景区流量监控"/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ScenicMonitor;
