import React, {SFC, useState} from 'react';
import { Layout, Menu} from 'antd';
import {
  HomeOutlined,
  StarOutlined,
  FallOutlined,
  DotChartOutlined,
  AreaChartOutlined,
  AimOutlined,
  DeploymentUnitOutlined,
  GoldOutlined,
} from '@ant-design/icons';

import '../theme/style/LeftMenu.scss';

const { Sider } = Layout;

const LeftMenu:SFC = () => {

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsed={collapsed} width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>主页</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >农业</li>
        <Menu.Item key="3" icon={<DeploymentUnitOutlined />}>智能大棚</Menu.Item>
        <Menu.Item key="4" icon={<GoldOutlined />}>智能养殖</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >民生</li>
        <Menu.Item key="6" icon={<AimOutlined />}>精准扶贫</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >监控</li>
        <Menu.Item key="8" icon={<DotChartOutlined />}>疫情监控</Menu.Item>
        <Menu.Item key="9" icon={<AreaChartOutlined />}>景点监控</Menu.Item>
        <Menu.Item key="10" icon={<FallOutlined />}>山体滑坡</Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >党建</li>
        <Menu.Item key="12" icon={<StarOutlined />}>智慧党建</Menu.Item>
      </Menu>
    </Sider>
  );
};


export default LeftMenu;
