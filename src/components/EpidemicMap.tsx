import { Scene, PointLayer } from '@antv/l7';
import { ISceneConfig } from '@antv/l7/es';
import { GaodeMap } from '@antv/l7-maps';
import React, {SFC, useEffect} from 'react';
import {CENTER, townCoordinates as sourceData} from '../const/const';

import '../theme/style/components/PoorMap.scss';

const EpidemicMap: SFC = () => {

  const layerSize = {
    width: 20,
    height: 20,
  };

  useEffect(() => {

    const config: ISceneConfig = {
      logoVisible: false,
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'macaron',
        center: [CENTER.x, CENTER.y],
        zoom: 12.5,
      }),
    };

    const scene = new Scene(config);

    scene.on('loaded', () => {
      const pointLayer = new PointLayer({})
        .source(sourceData, {
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude',
          },
        })
        .shape('name', [
          'circle',
        ])
        .size('unitPrice', [layerSize.width, layerSize.height])
        .active(true)
        .color('name', ['#5B8FF9', '#5CCEA1', '#5D7092', '#F6BD16', '#E86452'])
        .style({
          opacity: 0.5,
          strokeWidth: 2,
        });

      scene.addLayer(pointLayer);
    });
  }, []);

  return <div className="poormap">
    <div className="title">疫情地图</div>
    <div id="map"></div>
  </div>;
};


export default EpidemicMap;


