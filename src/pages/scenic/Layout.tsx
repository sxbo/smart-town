import React, {SFC} from 'react';
import { Row, Col } from 'antd';

import PageTitle from '../../components/PageTitle';
import ScenicFlow from '../../components/ScenicFlow';
import ScenicList from '../../components/ScenicList';

import '../../theme/style/scenic/layout.scss';
import '../../theme/style/common.scss';

const ScenicMonitor: SFC = () => {

  return (
    <div className="scenic">
      <PageTitle title="景点监控"/>
      <Row>
        <Col span={24}>
          <div className="card-box">
            <ScenicList pagination={{pageSize: 5}}/>
          </div>
        </Col>
        <Col span={24}>
          <div className="card-box">
            <ScenicFlow/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ScenicMonitor;
