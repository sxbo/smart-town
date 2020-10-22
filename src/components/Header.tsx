/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable newline-after-var */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {SFC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout, Button, Popover, Badge, Popconfirm, message} from 'antd';
import {BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined} from '@ant-design/icons';
import '../theme/style/components/Header.scss';
// import logo from '../theme/img/logo.png';
import { DashBoardActions } from '../features/dashboard';
import {RootState} from '../store';
import {cityId, getWeatherImg} from '../const/const';
import { useHistory } from 'react-router-dom';
const { Header } = Layout;


const HerderBar:SFC<any> = () => {

  const [weather, setWeather] = useState<any>({});
  const [second, setSecond] = useState<any>(0);
  const [minute, setMinute] = useState<any>(0);
  const [hour, setHour] = useState<any>(0);
  const [userName, setUserName] = useState<string>('admin');
  const [doingNum, setDoingNum] = useState(0);
  const history = useHistory();
  const [messageVisible, setMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      getMessageNum();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getMessageNum = () => {
    axios({
      method: 'GET',
      url: 'api/getConvenientService',
    }).then((res) => {
      if (res.data.status === 200){
        const convenients = res.data?.data || [];
        const down = [];
        const doing = [];
        convenients.map((item: any) => {
          if (item.state == 2){
            down.push(item);
          } else {
            doing.push(item);
          }
        });
        setDoingNum(doing.length);
      } else {
        setDoingNum(0);
      }
    }).catch(() => {
      setDoingNum(0);
    });
  };


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

  /**
   * 跳转到表面服务
   */
  const jumpToConvenient = () => {
    history.push('/convenient');
    setMessage(false);
  };

  const bellClick = () => {
    setMessage(true);
  };

  const handleMesageVisibleChange = (state: boolean) => {
    setMessage(state);
  };

  const logout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('退出失败， token无效！');
    }
    axios({
      method: 'POST',
      url: 'api/sys/logout',
      headers: {
        'token': token,
      },
    }).then((res) => {
      if (res.data.status === 200){
        localStorage.setItem('token', '');
        history.push('/login');
      }
    });
  };


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
        <Popover visible={messageVisible} onVisibleChange={handleMesageVisibleChange} content={<div>您有{doingNum}条消息未<a onClick={jumpToConvenient}>处理</a></div>} title="通知" trigger="click">
          <Badge className="bell" count={doingNum} style={{minWidth: '14px', height: '14px', lineHeight: '14px'}}>
            <BellOutlined onClick={bellClick} style={{color: btnColor, fontSize: '18px', cursor: 'pointer'}}/>
          </Badge>
        </Popover>
        <div className="user-name">{userName}</div>
        <Popconfirm title="退出系统？" okText="确认" onConfirm={logout} cancelText="取消" placement="bottomLeft">
          <Button type="text" style={{marginLeft: '10px'}} icon={<LogoutOutlined style={{color: btnColor}}/>}></Button>
        </Popconfirm>
      </div>
    </Header>
  );
};


export default HerderBar;
