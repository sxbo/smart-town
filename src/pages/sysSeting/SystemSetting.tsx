import React, {Component} from 'react';
import {Row, Tabs, Col} from 'antd';
import PageTitle from '../../components/PageTitle';
import { TeamOutlined, KeyOutlined, IdcardOutlined } from '@ant-design/icons';
import '../../theme/style/syssetting/layout.scss';
import '../../theme/style/common.scss';

const {TabPane} = Tabs;

export default class SystemSetting extends Component {
  constructor(props: any){
    super(props);
    this.state = {
      a: '',
    };
  }

  render(){
    return (
      <div className="sys-setting">
        <PageTitle title="系统设置"/>
        <Row>
          <Col span={24}>
            <div className="card-box setting-tab">
              <Tabs defaultActiveKey="1">
                <TabPane tab={<span><TeamOutlined />用户管理</span>}key="1">
                  用户管理
                </TabPane>
                <TabPane tab={<span><IdcardOutlined />角色管理</span>}key="2">
                  角色管理
                </TabPane>
                <TabPane tab={<span><KeyOutlined />权限管理</span>} key="3">
                  权限管理
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
