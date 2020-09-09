import React, {Component} from 'react';

import '../../theme/style/datascreen/layout.scss';
import '../../theme/style/common.scss';

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
              <div className="screen-monitor-wapper"></div>
              <div className="screen-green-wapper"></div>
              <div className="screen-breed-wapper"></div>
            </div>
            <div className="screen-midd-body">
              <div className="screen-map-wapper"></div>
              <div className="screen-epidemic-wapper"></div>
            </div>
            <div className="screen-right-body">
              <div className="screen-poor-wapper"></div>
              <div className="screen-landslid-wapper"></div>
              <div className="screen-scenic-wapper"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
