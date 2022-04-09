/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import {message} from 'antd';
// import {FullscreenOutlined} from '@ant-design/icons';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import '../../theme/style/datascreen/layout.scss';
import '../../theme/style/common.scss';
import ScreenEpidemicMap from './ScreenEpidemicMap';
import MemberCount from './MemberCount';
import Farming from './Farming';
import PriceSell from './PriceSell';
import MonitorCount from './MonitorCount';
import Video from './Video';
import Convenient from './Convenient';
import Epidemic from './Epidemic';
import axios from 'axios';

export default class Screen extends Component{

  state = {
    totalMonitors: 0,
    villageMonitors: 0,
    scenicMonitors: 0,
    landMonitors: 0,
    accessToken: '',
    video1: '',
    video2: '',
    video3: '',
  }

  componentDidMount() {
    this.getMonitorCounts();
    this.getAccessToken();
    this.getDeviceSerial();
  }

  getMonitorCounts = (url: string = 'api/getMonitorCount') => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data?.data || [];
        const totalMonitor = data.find((item: any) => item.label == 'total') || {value: 0};
        const villageMonitor = data.find((item: any) => item.label == 'village') || {value: 0};
        const scenicMonitor = data.find((item: any) => item.label == 'scenic') || {value: 0};
        const landMonitor = data.find((item: any) => item.label == 'land') || {value: 0};

        this.setState({
          totalMonitors: totalMonitor.value,
          villageMonitors: villageMonitor.value,
          scenicMonitors: scenicMonitor.value,
          landMonitors: landMonitor.value,
        });
      }
    }).catch(() => {
      this.setState({
        totalMonitors: 0,
        villageMonitors: 0,
        scenicMonitors: 0,
        landMonitors: 0,
      });
    });
  };

  getAccessToken = () => {
    axios({
        method: 'GET',
        url: '/api/video/getAccessToken',
    }).then((res) => {
        if (res.status === 200){
            const accessToken: string = res.data.data;
            this.setState({
                accessToken: accessToken,
            });
        }
    }).catch(() => {
        message.error('获取萤石云Token失败');
    });
  }

  getDeviceSerial = () => {
    // 查询山体设备序列号
    axios({
        method: 'GET',
        url: '/api/getScreenMonitor',
    }).then((res) => {
        if (res.status === 200){
            let deviceSerials: any[] = res.data?.data || [];
            deviceSerials = deviceSerials.slice(0, 3);
            const video1 = deviceSerials[0];
            const video2 = deviceSerials[1];
            const video3 = deviceSerials[2];
            this.setState({
              video1,
              video2,
              video3,
            });
        }
    }).catch(() => {
        message.error('获取设备序列失败！');
    });
  }

  render(){

    const chartStyle = {
      height: 'calc(100% - 0.4rem)',
    };

    const {
      totalMonitors,
      villageMonitors,
      scenicMonitors,
      landMonitors,
      video1,
      accessToken,
      video2,
      video3} = this.state;
    return <>
      <div className="card-box data-screen-wapper">
        <div className="screen-head">
          <div className="left-line"></div>
          <div className="circle"></div>
          <div className="screen-title">范家镇实时数据监控平台</div>
          <div className="circle"></div>
          <div className="right-line"></div>
        </div>
        <div className="screen-body">
          <div className="screen-left-body">
            <div className="screen-monitor-wapper screen-padding ">
              <Farming/>
            </div>
            <div className="screen-green-wapper screen-padding">
              <BackShadow className="screen-monitor-shadow">
                <div className="s-chart-wapper">
                  <ScreenTitle title="农业价格销量统计"></ScreenTitle>
                  <PriceSell styleObj={chartStyle}/>
                </div>
              </BackShadow>
            </div>
            <div className="screen-breed-wapper screen-padding">
              <MonitorCount totalMonitors={totalMonitors} villageMonitors={villageMonitors} scenicMonitors={scenicMonitors} landMonitors={landMonitors}/>
            </div>
          </div>
          <div className="screen-midd-body">
            <div className="screen-map-wapper screen-padding" id="screen_map">
              <BackShadow className="screen-monitor-shadow">
                <div className="s-chart-wapper">
                  <ScreenTitle title="范家镇分布图"></ScreenTitle>
                  <div style={{height: 'calc(100% - 0.4rem)'}}>
                    <ScreenEpidemicMap/>
                  </div>
                </div>
              </BackShadow>
            </div>
            <div className="screen-scenic-wapper screen-padding">
              {
                accessToken && video1 && video2 && video3 &&
                <Video video1={video1} accessToken={accessToken} video2={video2} video3={video3}/>
              }
            </div>
          </div>
          <div className="screen-right-body">
            <div className="screen-poor-wapper screen-padding">
              <Convenient/>
            </div>
            <div className="screen-landslid-wapper screen-padding">
              <Epidemic/>
            </div>
            <div className="screen-epidemic-wapper screen-padding">
              <BackShadow className="screen-monitor-shadow">
                <div className="s-chart-wapper">
                  <ScreenTitle title="各村党员人数统计"></ScreenTitle>
                  <MemberCount styleObj={chartStyle}/>
                </div>
              </BackShadow>
            </div>
          </div>
        </div>
      </div>
    </>;
  }

}
