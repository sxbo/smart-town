import React, {SFC} from 'react';
import { Layout, Menu} from 'antd';

import '../theme/style/LeftMenu.scss';

const { Sider } = Layout;

const LeftMenu:SFC = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1">Dashboard</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" style={{paddingLeft: '24px'}}>农业</li>
        <Menu.Item key="3">智能大棚</Menu.Item>
        <Menu.Item key="4">智能养殖</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" style={{paddingLeft: '24px'}}>民生</li>
        <Menu.Item key="6">精准扶贫</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" style={{paddingLeft: '24px'}}>监控</li>
        <Menu.Item key="8">疫情监控</Menu.Item>
        <Menu.Item key="9">景点监控</Menu.Item>
        <Menu.Item key="10">山体滑坡</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" style={{paddingLeft: '24px'}}>党建</li>
        <Menu.Item key="12">智慧党建</Menu.Item>
      </Menu>
    </Sider>
  );
};


export default LeftMenu;
