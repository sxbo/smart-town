import React, {SFC} from 'react';
import { Row, Col } from 'antd';

import PageTitle from '../../components/PageTitle';
import ScenicList from './ScenicList';
import VideoBox from '../landslide/VideoBox';

import '../../theme/style/scenic/layout.scss';
import '../../theme/style/common.scss';

const ScenicMonitor: SFC = () => {

  return (
    <div className="scenic">
      <PageTitle title="景点监控"/>
      <Row>
        <Col span={24}>
          <div className="card-box">
            <ScenicList pagination={{pageSize: 10}}/>
          </div>
        </Col>
      </Row>
      <VideoBox monitorType={1}/>
    </div>
  );
};

export default ScenicMonitor;
