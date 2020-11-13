import React, {SFC} from 'react';
import { Tabs } from 'antd';
import { TeamOutlined, CopyOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import PageTitle from '../../components/PageTitle';
import HelpHistoryList from './HelpHistoryList';
import PoorList from './PoorList';

import '../../theme/style/helppoor/layout.scss';
import '../../theme/style/common.scss';

const { TabPane } = Tabs;

const HelpPoor: SFC = () => {


  return (
    <div className="help-poor">
      <PageTitle title="精准扶贫"/>
      <Row>
        <Col span={24}>
          <div className="card-box help-poor-tab">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <CopyOutlined />
                    扶贫记录
                  </span>
                }
                key="1">
                <HelpHistoryList pagination={{pageSize: 10}}/>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <TeamOutlined />
                    贫困户统计
                  </span>
                }
                key="2">
                <PoorList pagination={{pageSize: 10}}/>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HelpPoor;
