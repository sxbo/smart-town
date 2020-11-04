/* eslint-disable no-magic-numbers */
/* eslint-disable import/first */
/* eslint-disable newline-after-var */

import * as React from 'react';
const {
  LayerEvent,
  AMapScene,
  PointLayer,
  Popup,

} = require('@antv/l7-react');
import {CENTER, epidemicData} from '../../const/const';

interface ScreenEpidemicMapState{
  data: Array<Object>;
  popupInfo: any;
}
export default class ScreenEpidemicMap extends React.Component<any, ScreenEpidemicMapState> {

  constructor(props: any){
    super(props);
    this.state = {
      popupInfo: {
        lnglat: '',
        feature: '',
      },
      data:[],
    };
  }

  componentDidMount(){
    this.setState({
      data: epidemicData,
    });
  }

  showPopup = (args: any) => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      popupInfo:{
        lnglat: args.lngLat,
        feature: args.feature,
      },
    });
  }
  render(){
    const {data, popupInfo} = this.state;

    return (
      <>
        <AMapScene
          map={{
            center: [CENTER.x, CENTER.y],
            pitch: 0,
            style: 'dark',
            zoom: 13,
          }}
          style={{
            position: 'absolute',
            background: '#fff',
            top: '.4rem',
            left: 10,
            right: 10,
            bottom: 10,
          }}
          option={{
            logoVisible: false,
          }}
        >
          {popupInfo && (
            <Popup lnglat={popupInfo.lnglat}
              option={{closeButton: false}}>
              {popupInfo.feature.name}
              <ul
                style={{
                  margin: 0,
                }}
              >
                <li>确诊:{popupInfo.feature.currentConfirmedCount}</li>
                <li>治愈:{popupInfo.feature.curedCount}</li>
                <li>死亡:{popupInfo.feature.deadCount}</li>
              </ul>
            </Popup>
          )}
          {data && [
            <PointLayer
              key={'2'}
              options={{
                autoFit: true,
              }}
              source={{
                data,
                autoFit: true,
                parser: {
                  type: 'json',
                  coordinates: 'centroid',
                },
              }}
              scale={{
                values: {
                  confirmedCount: {
                    type: 'log',
                  },
                },
              }}
              color={{
                values: '#b10026',
              }}
              shape={{
                values: 'circle',
              }}
              active={{
                option: {
                  color: '#0c2c84',
                },
              }}
              size={{
                field: 'confirmedCount',
                values: [5, 60],
              }}
              animate={{
                enable: true,
              }}
              style={{
                opacity: 0.6,
              }}
            >
              <LayerEvent type="mousemove" handler={() => this.showPopup} />
            </PointLayer>,
          ]}
        </AMapScene>
      </>
    );
  }
}
