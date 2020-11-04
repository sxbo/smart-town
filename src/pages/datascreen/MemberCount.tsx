/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-magic-numbers */
import React, { CSSProperties } from 'react';
import { Area } from '@ant-design/charts';
import axios from 'axios';


const sourceSata = [
  {
    label: '西寺子村',
    value: 10,
  },
  {
    label: '金裕村',
    value: 10,
  },
  {
    label: '乌牛村',
    value: 10,
  },
  {
    label: '井庄村',
    value: 10,
  },
  {
    label: '雷北村',
    value: 10,
  },
  {
    label: '范家村',
    value: 10,
  },
  {
    label: '雷南村',
    value: 10,
  },
  {
    label: '华原村',
    value: 10,
  },
  {
    label: '西岐村',
    value: 10,
  },
  {
    label: '北干村',
    value: 10,
  },
  {
    label: '加里村',
    value: 10,
  },
  {
    label: '营田村',
    value: 10,
  },
  {
    label: '上辛村',
    value: 10,
  },
  {
    label: '下辛村',
    value: 10,
  },
  {
    label: '南干村',
    value: 10,
  },
];

interface MemberCountPro{
  styleObj?: CSSProperties;
}

interface MemberCountState{
  data: any
}

export default class MemberCount extends React.Component<MemberCountPro, MemberCountState> {

  constructor(props: any){
    super(props);
    this.state = {
      data: sourceSata,
    };
  }

  componentDidMount(){
    this.getMemberCounts();
  }

  getMemberCounts = (url: string = 'api/getPartyMemberCount') => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const members = res.data?.data || [];
        this.setState({
          data: members,
        });
      }
    }).catch(() => {
      this.setState({
        data: sourceSata,
      });
    });
  }

  render(){
    const {data} = this.state;
    const config = {
      data,
      xField: 'village',
      yField: 'count',
      xAxis: {
        tickCount: 15,
        label: {
          style: {
            fill: '#ffffff',
          },
        },
      },
      yAxis: {
        label: {
          style: {
            fill: '#ffffff',
          },
        },
      },
      smooth: true,
      tooltip: {
        formatter: function(a:any, b:any){
          return {name: '党员人数', value: b};
        },
      },
    };

    return <Area style={this.props.styleObj} {...config} />;
  }
}
