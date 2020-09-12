import React, {Component, CSSProperties} from 'react';
import { Donut } from '@ant-design/charts';
import { DonutConfig } from '@ant-design/charts/es/donut';
// import { PieConfig } from '@ant-design/charts/es/pie';

const data = [
  {
    type: '确诊',
    value: 27,
  },
  {
    type: '治愈',
    value: 25,
  },
  {
    type: '死亡',
    value: 18,
  },
];

interface EpidemicRateProp{
  styleObj?: CSSProperties;
  legendTextStyle?: Object;

}


interface EpidemicRateState{
  config: DonutConfig
}

export default class EpidemicRate extends Component<EpidemicRateProp, EpidemicRateState>{
  constructor(props: any){
    super(props);
    this.state = {
      config: {
        forceFit: true,
        radius: 0.8,
        padding: 'auto',
        data,
        angleField: 'value',
        colorField: 'type',
        legend: {
          visible: true,
          position: 'bottom-center',
          text: this.props.legendTextStyle,
          title: {
            style: {
              fill: 'red',
            },
          },
        },
        statistic:{
          visible: false,
        },
      },
    };
  }


  render(){
    const {styleObj} = this.props;

    return <>
      <Donut {...this.state.config} style={styleObj}/>
    </>;
  }
}
