import React, {Component} from 'react';
import { Liquid } from '@antv/g2plot';

export default class LiquidChart extends Component{

  componentDidMount(){
    const ele: HTMLElement = document.getElementById('poor_rate') as HTMLElement;
    const liquidPlot = new Liquid(ele, {
      forceFit: true,
      min: 0,
      max: 100,
      value: 56.3,
      statistic: {
        formatter: (value) => value + '%',
      },
    });

    liquidPlot.render();
  }

  render(){
    return <>
      <div style={{height: 'calc(100% - 0.4rem)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <div id="poor_rate" style={{width: '80%', height: '90%'}}>
        </div>
      </div>
    </>;
  }
}
