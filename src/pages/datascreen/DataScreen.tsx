import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import MonitorRadar from '../../components/MonitorRadar';
import '../../theme/style/datascreen/layout.scss';
import '../../theme/style/common.scss';
import EpidemicRate from './EpidemicRate';
import LiquidChart from './LiquidChart';
import World from './ScreenEpidemicMap';
import ScreenDataLines from './ScreenDataLines';
import ScenicFlow from '../../components/ScenicFlow';
import ScreenEpidemicChart from './ScreenEpidemicChart';
import VillagePoorBar from '../../components/VillagePoorBar';
import ScreenLandslide from './ScreenLandslide';

const monitorRadarData = [
  {
    item: '大棚',
    user: '全部告警',
    score: 70,
  },
  {
    item: '养殖',
    user: '全部告警',
    score: 60,
  },
  {
    item: '疫情',
    user: '全部告警',
    score: 60,
  },
  {
    item: '景区',
    user: '全部告警',
    score: 40,
  },
  {
    item: '滑坡',
    user: '全部告警',
    score: 60,
  },
];

const epidemicLineData = [
  { type: '确诊', date: '07-26', value: 1000 },
  { type: '确诊', date: '07-27', value: 5000 },
  { type: '确诊', date: '07-28', value: 8000 },
  { type: '确诊', date: '07-29', value: 2000 },
  { type: '确诊', date: '07-30', value: 600 },
  { type: '确诊', date: '07-31', value: 1000 },
  { type: '确诊', date: '08-01', value: 5000 },
  { type: '确诊', date: '08-02', value: 8000 },
  { type: '确诊', date: '08-03', value: 2000 },
  { type: '确诊', date: '08-04', value: 600 },
  { type: '确诊', date: '08-05', value: 1000 },
  { type: '确诊', date: '08-06', value: 5000 },
  { type: '确诊', date: '08-07', value: 8000 },
  { type: '确诊', date: '08-08', value: 2000 },
  { type: '确诊', date: '08-09', value: 600 },
  { type: '确诊', date: '08-10', value: 1000 },
  { type: '确诊', date: '08-11', value: 5000 },
  { type: '确诊', date: '08-12', value: 8000 },
  { type: '确诊', date: '08-13', value: 2000 },
  { type: '确诊', date: '08-14', value: 600 },
  { type: '确诊', date: '08-15', value: 1000 },
  { type: '确诊', date: '08-16', value: 5000 },
  { type: '确诊', date: '08-17', value: 8000 },
  { type: '确诊', date: '08-18', value: 2000 },
  { type: '确诊', date: '08-19', value: 600 },
  { type: '确诊', date: '08-20', value: 1000 },
  { type: '确诊', date: '08-21', value: 5000 },
  { type: '确诊', date: '08-22', value: 8000 },
  { type: '确诊', date: '08-23', value: 2000 },
  { type: '确诊', date: '08-24', value: 600 },
  { type: '确诊', date: '08-25', value: 1000 },
  { type: '确诊', date: '08-26', value: 5000 },
  { type: '确诊', date: '08-27', value: 8000 },
  { type: '确诊', date: '08-28', value: 2000 },
  { type: '确诊', date: '08-29', value: 600 },
  { type: '治愈', date: '07-26', value: 500 },
  { type: '治愈', date: '07-27', value: 1000 },
  { type: '治愈', date: '07-28', value: 6000 },
  { type: '治愈', date: '07-29', value: 600 },
  { type: '治愈', date: '07-30', value: 10 },
  { type: '治愈', date: '07-31', value: 500 },
  { type: '治愈', date: '08-01', value: 1000 },
  { type: '治愈', date: '08-02', value: 6000 },
  { type: '治愈', date: '08-03', value: 600 },
  { type: '治愈', date: '08-04', value: 10 },
  { type: '治愈', date: '08-05', value: 500 },
  { type: '治愈', date: '08-06', value: 1000 },
  { type: '治愈', date: '08-07', value: 6000 },
  { type: '治愈', date: '08-08', value: 600 },
  { type: '治愈', date: '08-09', value: 10 },
  { type: '治愈', date: '08-10', value: 500 },
  { type: '治愈', date: '08-11', value: 1000 },
  { type: '治愈', date: '08-12', value: 6000 },
  { type: '治愈', date: '08-13', value: 600 },
  { type: '治愈', date: '08-14', value: 10 },
  { type: '治愈', date: '08-15', value: 500 },
  { type: '治愈', date: '08-16', value: 1000 },
  { type: '治愈', date: '08-17', value: 6000 },
  { type: '治愈', date: '08-18', value: 600 },
  { type: '治愈', date: '08-19', value: 10 },
  { type: '治愈', date: '08-20', value: 500 },
  { type: '治愈', date: '08-21', value: 1000 },
  { type: '治愈', date: '08-22', value: 6000 },
  { type: '治愈', date: '08-23', value: 600 },
  { type: '治愈', date: '08-24', value: 10 },
  { type: '治愈', date: '08-25', value: 500 },
  { type: '治愈', date: '08-26', value: 1000 },
  { type: '治愈', date: '08-27', value: 6000 },
  { type: '治愈', date: '08-28', value: 600 },
  { type: '治愈', date: '08-29', value: 10 },
  { type: '死亡', date: '07-26', value: 100 },
  { type: '死亡', date: '07-27', value: 500 },
  { type: '死亡', date: '07-28', value: 1000 },
  { type: '死亡', date: '07-29', value: 200 },
  { type: '死亡', date: '07-30', value: 20 },
  { type: '死亡', date: '07-31', value: 100 },
  { type: '死亡', date: '08-01', value: 500 },
  { type: '死亡', date: '08-02', value: 1000 },
  { type: '死亡', date: '08-03', value: 200 },
  { type: '死亡', date: '08-04', value: 20 },
  { type: '死亡', date: '08-05', value: 100 },
  { type: '死亡', date: '08-06', value: 500 },
  { type: '死亡', date: '08-07', value: 1000 },
  { type: '死亡', date: '08-08', value: 200 },
  { type: '死亡', date: '08-09', value: 20 },
  { type: '死亡', date: '08-10', value: 100 },
  { type: '死亡', date: '08-11', value: 500 },
  { type: '死亡', date: '08-12', value: 1000 },
  { type: '死亡', date: '08-13', value: 200 },
  { type: '死亡', date: '08-14', value: 20 },
  { type: '死亡', date: '08-15', value: 100 },
  { type: '死亡', date: '08-16', value: 500 },
  { type: '死亡', date: '08-17', value: 1000 },
  { type: '死亡', date: '08-18', value: 200 },
  { type: '死亡', date: '08-19', value: 20 },
  { type: '死亡', date: '08-20', value: 100 },
  { type: '死亡', date: '08-21', value: 500 },
  { type: '死亡', date: '08-22', value: 1000 },
  { type: '死亡', date: '08-23', value: 200 },
  { type: '死亡', date: '08-24', value: 20 },
  { type: '死亡', date: '08-25', value: 100 },
  { type: '死亡', date: '08-26', value: 500 },
  { type: '死亡', date: '08-27', value: 1000 },
  { type: '死亡', date: '08-28', value: 200 },
  { type: '死亡', date: '08-29', value: 20 },
];

export default class DataScreen extends Component {
  constructor(props: any){
    super(props);
    this.state = {
      a: '',
    };
  }

  render(){

    const textStyle = {
      style: {
        fill: '#ffffff',
      },
    };

    const chartStyle = {
      height: 'calc(100% - 0.4rem)',
    };

    return (
      <div className="data-screen">
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
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="告警分布"></ScreenTitle>
                    <MonitorRadar
                      legendTextStyle={textStyle}
                      styleObj={chartStyle}
                      data={monitorRadarData}
                      rediusAxisLabel={textStyle}
                      angleAxixLabel={textStyle}/>
                  </div>
                  <div className="s-chart-wapper">
                    <ScreenTitle title="疫情数据"></ScreenTitle>
                    <EpidemicRate
                      styleObj={chartStyle}
                      legendTextStyle={textStyle}/>
                  </div>
                  <div className="s-chart-wapper">
                    <ScreenTitle title="脱贫率"></ScreenTitle>
                    <LiquidChart></LiquidChart>
                  </div>
                </BackShadow>
              </div>
              <div className="screen-green-wapper screen-padding">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="大棚数据监控-(雷北村1号)"></ScreenTitle>
                    <ScreenDataLines/>
                  </div>
                </BackShadow>
              </div>
              <div className="screen-breed-wapper screen-padding">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="养殖场数据监控-(范家村东)"></ScreenTitle>
                    <ScreenDataLines/>
                  </div>
                </BackShadow>
              </div>
            </div>
            <div className="screen-midd-body">
              <div className="screen-map-wapper screen-padding" id="screen_map">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="疫情防控地图"></ScreenTitle>
                    <div style={{height: 'calc(100% - 0.4rem)'}}>
                      <World/>
                    </div>
                  </div>
                </BackShadow>
              </div>
              <div className="screen-scenic-wapper screen-padding">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="景区流量数据监控"></ScreenTitle>
                    <ScenicFlow legendTextStyle={textStyle} styleObj={chartStyle}/>
                  </div>
                </BackShadow>
              </div>
            </div>
            <div className="screen-right-body">
              <div className="screen-poor-wapper screen-padding">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="疫情走势"></ScreenTitle>
                    <ScreenEpidemicChart data={epidemicLineData} styleObj={chartStyle}/>
                  </div>
                </BackShadow>
              </div>
              <div className="screen-landslid-wapper screen-padding">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="贫困户分布趋势"></ScreenTitle>
                    <VillagePoorBar styleObj={chartStyle} yAxisTitleStyle={textStyle}/>
                  </div>
                </BackShadow>
              </div>
              <div className="screen-epidemic-wapper screen-padding">
                <BackShadow className="screen-monitor-shadow">
                  <div className="s-chart-wapper">
                    <ScreenTitle title="滑坡数据监控"></ScreenTitle>
                    <ScreenLandslide styleObj={chartStyle}/>
                  </div>
                </BackShadow>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
