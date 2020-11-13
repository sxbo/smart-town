/* eslint-disable no-shadow */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {SFC} from 'react';
import { Row, Col } from 'antd';

import PageTitle from '../../components/PageTitle';
import LandSlideList from './LandSlideList';

import '../../theme/style/scenic/layout.scss';
import '../../theme/style/common.scss';
import VideoBox from './VideoBox';

const LandSlide: SFC = () => {

  return (
    <div className="scenic">
      <PageTitle title="山体滑坡监测"/>
      <Row>
        <Col span={24}>
          <div className="card-box">
            <LandSlideList pagination={{pageSize: 10}}/>
          </div>
        </Col>
      </Row>
      <VideoBox monitorType={2}/>
    </div>
  );
};

export default LandSlide;
