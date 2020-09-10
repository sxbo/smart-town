import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import MonitorRadar from '../../components/MonitorRadar';
import '../../theme/style/datascreen/layout.scss';
import '../../theme/style/common.scss';

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

export default class DataScreen extends Component {
  constructor(props: any){
    super(props);
    this.state = {
      a: '',
    };
  }

  render(){
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
              <div className="screen-monitor-wapper screen-padding">
                <BackShadow>
                  <ScreenTitle title="aaaa">
                  </ScreenTitle>
                  <MonitorRadar title="12" data={monitorRadarData}/>
                </BackShadow>
              </div>
              <div className="screen-green-wapper screen-padding"></div>
              <div className="screen-breed-wapper screen-padding"></div>
            </div>
            <div className="screen-midd-body">
              <div className="screen-map-wapper screen-padding"></div>
              <div className="screen-epidemic-wapper screen-padding"></div>
            </div>
            <div className="screen-right-body">
              <div className="screen-poor-wapper screen-padding"></div>
              <div className="screen-landslid-wapper screen-padding"></div>
              <div className="screen-scenic-wapper screen-padding"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
