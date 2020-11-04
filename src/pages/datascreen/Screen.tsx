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
import HPoor from './HPoor';
import MonitorCount from './MonitorCount';
import Video from './Video';
import Convenient from './Convenient';
import Epidemic from './Epidemic';
import axios from 'axios';

export default class Screen extends Component{

  state = {
    greenHouseMonitors: 0,
    breedMonitors: 0,
    totalMonitors: 0,
    villageMonitors: 0,
    scenicMonitors: 0,
    landMonitors: 0,
    accessToken: '',
    landSerial: '',
    scenicSerial1: '',
    scenicSerial2: '',
  }

  componentDidMount() {
    this.getMonitorCounts();
    this.getAccessToken();
    this.getLandDeviceSerial();
    this.getScenicDeviceSerial();
  }

  getMonitorCounts = (url: string = 'api/getMonitorCount') => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data?.data || [];
        const greenHouseMonitor = data.find((item: any) => item.label == 'greenHouse') || {value: 0};
        const breedMonitor = data.find((item: any) => item.label == 'breed') || {value: 0};
        const totalMonitor = data.find((item: any) => item.label == 'total') || {value: 0};
        const villageMonitor = data.find((item: any) => item.label == 'village') || {value: 0};
        const scenicMonitor = data.find((item: any) => item.label == 'scenic') || {value: 0};
        const landMonitor = data.find((item: any) => item.label == 'land') || {value: 0};

        this.setState({
          greenHouseMonitors: greenHouseMonitor.value,
          breedMonitors: breedMonitor.value,
          totalMonitors: totalMonitor.value,
          villageMonitors: villageMonitor.value,
          scenicMonitors: scenicMonitor.value,
          landMonitors: landMonitor.value,
        });
      }
    }).catch(() => {
      this.setState({
        greenHouseMonitors: 0,
        breedMonitors: 0,
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

  getLandDeviceSerial = () => {
    // 查询山体设备序列号
    axios({
        method: 'GET',
        url: '/api/videos/getMonitorSeriaNumber?monitorType=2',
    }).then((res) => {
        if (res.status === 200){
            let deviceSerials: any[] = res.data?.data || [];
            deviceSerials = deviceSerials.slice(0, 1);
            const landSerial = deviceSerials[0]?.seriaNumber;
            this.setState({
              landSerial: landSerial,
            });
        }
    }).catch(() => {
        message.error('获取设备序列失败！');
    });
  }

  getScenicDeviceSerial = () => {
    // 查询山体设备序列号
    axios({
        method: 'GET',
        url: '/api/videos/getMonitorSeriaNumber?monitorType=1',
    }).then((res) => {
        if (res.status === 200){
            let deviceSerials: any[] = res.data?.data || [];
            deviceSerials = deviceSerials.slice(0, 2);
            const scenicSerial1 = deviceSerials[0]?.seriaNumber;
            const scenicSerial2 = deviceSerials[1]?.seriaNumber;
            this.setState({
              scenicSerial1: scenicSerial1,
              scenicSerial2: scenicSerial2,
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

    const {greenHouseMonitors, breedMonitors,
      totalMonitors,
      villageMonitors,
      scenicMonitors,
      landMonitors,
      landSerial,
      accessToken,
      scenicSerial1,
      scenicSerial2} = this.state;

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
              <Farming greenHouseMonitors={greenHouseMonitors} breedMonitors={breedMonitors}/>
            </div>
            <div className="screen-green-wapper screen-padding">
              <HPoor/>
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
                accessToken && landSerial && scenicSerial1 && scenicSerial2 &&
                <Video landSerial={landSerial} accessToken={accessToken} scenicSerial1={scenicSerial1} scenicSerial2={scenicSerial2}/>
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
