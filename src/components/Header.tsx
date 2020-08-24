import React, {SFC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout, Button, Menu, Dropdown, Avatar, Badge } from 'antd';
import {BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
// MenuUnfoldOutlined
import '../theme/style/components/Header.scss';
import logo from '../theme/img/logo.svg';
import { DashBoardActions } from '../features/dashboard';
import {RootState} from '../store';
const { Header } = Layout;


const HerderBar:SFC = () => {

  const dashboardState = useSelector((state: RootState) => ({menuCollapsed: state.dashboard.menuCollapsed}));
  const dispatch = useDispatch();

  const toggleCollapsed = () => {
    dispatch({type: DashBoardActions.COLLAPSED_MENU});
  };

  const menu = (
    <Menu>
      <Menu.Item>
        1号大棚CO2浓度报警
      </Menu.Item>
      <Menu.Item>
        2号大棚CO2浓度报警
      </Menu.Item>
      <Menu.Item>
        3号大棚CO2浓度报警
      </Menu.Item>
    </Menu>
  );

  const user: string = 'U';
  const colorlist: Array<string> = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const range: number = 5;
  const index = Math.floor(Math.random() * range);
  const color = colorlist[index];

  return (
    <Header className="smart-town-header">
      <div className="smart-town-header-l">
        <div className="logo">
          <img src={logo} alt="logo"/>
          智慧小镇
        </div>
        <Button type="text" onClick={toggleCollapsed} className="menu-op-btn">
          {React.createElement(dashboardState.menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      </div>
      <div className="smart-town-header-l">
        <Dropdown className="bell" overlay={menu} placement="bottomCenter" trigger={['click']}>
          <Badge count={3}>
            <BellOutlined />
          </Badge>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="small">
            {user}
          </Avatar>
        </Dropdown>
      </div>
    </Header>
  );
};


export default HerderBar;