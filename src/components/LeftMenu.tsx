import React, {SFC} from 'react';
import {useSelector} from 'react-redux';
import { Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {RootState} from '../store';
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

import '../theme/style/components/LeftMenu.scss';

const { Sider } = Layout;

const LeftMenu:SFC = () => {

  const dashboardState = useSelector((state: RootState) => ({menuCollapsed: state.dashboard.menuCollapsed}));

  return (
    <Sider collapsed={dashboardState.menuCollapsed} width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/home/dashboard">主页</Link>
        </Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >农业</li>
        <Menu.Item key="3" icon={<DeploymentUnitOutlined />}>
          <Link to="/home/greenhouse">智能大棚</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<GoldOutlined />}>
          <Link to="/home/breed">智能养殖</Link>
        </Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >民生</li>
        <Menu.Item key="6" icon={<AimOutlined />}>
          <Link to="/home/helppoor">精准扶贫</Link>
        </Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >监控</li>
        <Menu.Item key="8" icon={<DotChartOutlined />}>
          <Link to="/home/epidemic">疫情监控</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<AreaChartOutlined />}>
          <Link to="/home/scenicmonitor">景点监控</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<FallOutlined />}>
          <Link to="/home/landslide">山体滑坡</Link>
        </Menu.Item>
        <li className="ant-menu-item ant-menu-item-only-child psn-menu" >党建</li>
        <Menu.Item key="12" icon={<StarOutlined />}>
          <Link to="/home/partybuild">智慧党建</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};


export default LeftMenu;
