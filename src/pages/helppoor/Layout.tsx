import React, {SFC} from 'react';
import { Tabs } from 'antd';
import { EnvironmentOutlined, TeamOutlined, CopyOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import VillagePoorBar from '../../components/VillagePoorBar';

import '../../theme/style/helppoor/layout.scss';
import '../../theme/style/common.scss';

const { TabPane } = Tabs;

const HelpPoor: SFC = () => {

  return (
    <Row>
      <Col span={24}>
        <div className="card-box help-poor">
          <Tabs defaultActiveKey="2">
            <TabPane
              tab={
                <span>
                  <EnvironmentOutlined />
                  脱贫地图
                </span>
              }
              key="1">
              <Row>
                <Col span={24}>
                  <VillagePoorBar/>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CopyOutlined />
                  扶贫记录
                </span>
              }
              key="2">
              Tab 2
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  贫困户统计
                </span>
              }
              key="3">
              Tab 2
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default HelpPoor;
