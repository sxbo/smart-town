import {
  LayerEvent,
  AMapScene,
  PointLayer,
  Popup,

} from '@antv/l7-react';
import * as React from 'react';

import {CENTER, epidemicData} from '../../const/const';


const World = React.memo(function Map() {
  const [data, setData] = React.useState<any>([]);
  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();

  React.useEffect(() => {
    setData(epidemicData);
  }, []);
  function showPopup(args: any): void {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature,
    });
  }

  return (
    <>
      <AMapScene
        map={{
          center: [CENTER.x, CENTER.y],
          pitch: 0,
          style: 'dark',
          zoom: 12.5,
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
          <Popup lnglat={popupInfo.lnglat}>
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
            <LayerEvent type="mousemove" handler={showPopup} />
          </PointLayer>,
        ]}
      </AMapScene>
    </>
  );
});

export default World;
