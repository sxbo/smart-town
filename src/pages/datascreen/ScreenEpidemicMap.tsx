/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable import/first */
/* eslint-disable newline-after-var */

import * as React from 'react';
import axios from 'axios';
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
  zoom: number;
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
      zoom: 13,
    };
  }

  componentDidMount(){
    this.getVillageRate();
  }

  getVillageRate = () => {
    axios({
      method: 'GET',
      url: '/api/spb/getDynamicInformation?type=8',
    }).then((res) => {
        if (res.status === 200){
          const rates = res.data?.data || [];
          const data = epidemicData.map(item => {
            const finded = rates.find((rate: any) => item.name == rate.title);
            return {
              ...item,
              content: finded?.content || '占地面积1000亩',
            };
          });
          this.setState({
            data: data,
          });
        } else {
          this.setState({
            data: epidemicData,
          });
        }
    }).catch(() => {
      this.setState({
        data: epidemicData,
      });
    });
  }

  showPopup = (args: any) => {
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
              <div dangerouslySetInnerHTML={{__html: popupInfo.feature?.content}}></div>
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
              <LayerEvent type="mousemove" handler={this.showPopup} />
            </PointLayer>,
            <PointLayer
              key={'5'}
              source={{
                data,
                parser: {
                  type: 'json',
                  coordinates: 'centroid',
                },
              }}
              color={{
                values: '#fff',
              }}
              shape={{
                field: 'name',
                values: 'text',
              }}
              filter={{
                field: 'currentConfirmedCount',
                values: (v: any) => {
                  return v > 500;
                },
              }}
              size={{
                values: 12,
              }}
              style={{
                opacity: 1,
                strokeOpacity: 1,
                strokeWidth: 0,
              }}
            >
            <LayerEvent type="mousemove" handler={this.showPopup} />
          </PointLayer>,
          ]}
        </AMapScene>
      </>
    );
  }
}
