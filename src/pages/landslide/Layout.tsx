import React, {SFC} from 'react';
import { Row, Col } from 'antd';

import PageTitle from '../../components/PageTitle';
import Rainfall from '../../components/Rainfall';
import LandSlideList from '../../components/LandSlideList';

import '../../theme/style/scenic/layout.scss';
import '../../theme/style/common.scss';

const LandSlide: SFC = () => {

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
      </Row>
    </div>
  );
};

export default LandSlide;
