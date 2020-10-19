/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable newline-after-var */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {SFC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout, Button, Menu, Dropdown, Badge } from 'antd';
import {BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined} from '@ant-design/icons';
import '../theme/style/components/Header.scss';
// import logo from '../theme/img/logo.png';
import { DashBoardActions } from '../features/dashboard';
import {RootState} from '../store';
import {cityId, getWeatherImg} from '../const/const';
const { Header } = Layout;


const HerderBar:SFC<any> = () => {

  const [weather, setWeather] = useState<any>({});
  const [second, setSecond] = useState<any>(0);
  const [minute, setMinute] = useState<any>(0);
  const [hour, setHour] = useState<any>(0);
  const [userName, setUserName] = useState<string>('admin');
  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://tianqiapi.com/api?version=v6&appid=93476971&appsecret=tHaqs3kf&cityid=${cityId}`,
    }).then(res => {
      const weatherData = res.data;
      setWeather(weatherData);
    }).catch(() => {
      setWeather({wea: '晴', wea_img: 'qing'});
    });
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.username || 'admin';
    setUserName(userName);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setSecond(date.getSeconds());
      setMinute(date.getMinutes());
      setHour(date.getHours());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

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

  const btnColor = '#68d8fe';
  return (
    <Header className="smart-town-header">
      <div className="smart-town-header-l">
        <div className="logo">
          <img src={getWeatherImg(weather.wea_img)} alt="天气"/>
          <div>{weather.wea}</div>
          <div className="timer">{hour}: {minute}: {second}</div>
        </div>
        <Button type="text" onClick={toggleCollapsed} className="menu-op-btn">
          {dashboardState.menuCollapsed ? <MenuUnfoldOutlined style={{color: btnColor}}/> : <MenuFoldOutlined style={{color: btnColor}}/>}
        </Button>
      </div>
      <div className="smart-town-header-l">
        <Dropdown className="bell" overlay={menu} placement="bottomCenter" trigger={['click']}>
          <Badge count={3}>
            <BellOutlined style={{color: btnColor}}/>
          </Badge>
        </Dropdown>
        <div className="user-name">{userName}</div>
        <Button type="text" icon={<LogoutOutlined style={{color: btnColor}}/>}></Button>
      </div>
    </Header>
  );
};


export default HerderBar;
