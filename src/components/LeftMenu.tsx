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
  LinkOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  DesktopOutlined,
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
          <Link to="/">主页<span style={{visibility: 'hidden'}}>数据</span></Link>
        </Menu.Item>
        <Menu.Item key="14" icon={<FundProjectionScreenOutlined />}>
          <Link to="/datascreen">数据大屏</Link>
        </Menu.Item>
        <Menu.Item key="15" icon={<SettingOutlined />}>
          <Link to="/setting">系统设置</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DeploymentUnitOutlined />}>
          <Link to="/greenhouse">智能大棚</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<GoldOutlined />}>
          <Link to="/breed">智能养殖</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<AimOutlined />}>
          <Link to="/helppoor">精准扶贫</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<DotChartOutlined />}>
          <Link to="/epidemic">疫情监控</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<AreaChartOutlined />}>
          <Link to="/scenicmonitor">景点监控</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<FallOutlined />}>
          <Link to="/landslide">山体滑坡</Link>
        </Menu.Item>
        <Menu.Item key="12" icon={<StarOutlined />}>
          <Link to="/partybuild">智慧党建</Link>
        </Menu.Item>
        <Menu.Item key="16" icon={<DesktopOutlined />}>
          <Link to="/partybuild">视频监控</Link>
        </Menu.Item>
        <Menu.Item key="13" icon={<LinkOutlined />}>
          <a href="http://www.erp.900nong.com" target="_blank" rel="noopener noreferrer">农资监管</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};


export default LeftMenu;
