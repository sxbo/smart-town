import { Scene, ImageLayer } from '@antv/l7';
import { ISceneConfig } from '@antv/l7/es';
import { GaodeMap } from '@antv/l7-maps';
import React, {SFC, useEffect} from 'react';

const PoorMap: SFC = () => {

  useEffect(() => {

    const config: ISceneConfig = {
      logoVisible: false,
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'light',
        center: [115.5268, 34.3628],
        zoom: 7,
      }),
    };

    const scene = new Scene(config);

    scene.on('loaded', () => {
      const layer = new ImageLayer({});

      layer.source(
        'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*8SUaRr7bxNsAAAAAAAAAAABkARQnAQ',
        {
          parser: {
            type: 'image',
            extent: [113.1277263548, 32.3464238863, 118.1365790452, 36.4786759137]
          },
        },
      );
      scene.addLayer(layer);
    });
  }, []);

  return <div id="map"></div>;
};


export default PoorMap;


