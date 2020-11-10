/* eslint-disable callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-magic-numbers */
import React, { CSSProperties } from 'react';
import axios from 'axios';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
const echarts = require('echarts/lib/echarts');

const sourceSata = [
  {
    village: '西寺子村',
    count: 10,
  },
  {
    village: '金裕村',
    count: 10,
  },
  {
    village: '乌牛村',
    count: 10,
  },
  {
    village: '井庄村',
    count: 10,
  },
  {
    village: '雷北村',
    count: 10,
  },
  {
    village: '范家村',
    count: 10,
  },
  {
    village: '雷南村',
    count: 10,
  },
  {
    village: '华原村',
    count: 10,
  },
  {
    village: '西岐村',
    count: 10,
  },
  {
    village: '北干村',
    count: 10,
  },
  {
    village: '加里村',
    count: 10,
  },
  {
    village: '营田村',
    count: 10,
  },
  {
    village: '上辛村',
    count: 10,
  },
  {
    village: '下辛村',
    count: 10,
  },
  {
    village: '南干村',
    count: 10,
  },
];

interface MemberCountPro{
  styleObj?: CSSProperties;
}

export default class MemberCount extends React.Component<MemberCountPro, any> {

  componentDidMount(){
    var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
    window.onresize = function () {
      myChart.resize();
    };
    this.getMemberCounts((data: any) => {
      const xAxisData = data.map((item: any) => item.village);
      const seriesData = data.map((item: any) => item.count);
      myChart.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
              interval:0,
              rotate:270,
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
            },
        },
        series: [{
            data: seriesData,
            type: 'line',
            smooth: true,
            areaStyle: {},
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              snap: true,
          },
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 0,
          borderColor: '#fff',
          padding: 10,
          textStyle: {
              color: '#000',
          },
          extraCssText: 'width: 70px',
        },
        grid: {
          top:'10px',
          left:'50px',
          right:'10px',
          bottom:'50px',
        },
      });
    });
  }

  getMemberCounts = (callback: (data: any) => void) => {
    axios({
      method: 'GET',
      url: 'api/getPartyMemberCount',
    }).then((res) => {
      if (res.data.status === 200){
        const members: any = res.data?.data || sourceSata;
        callback(members);
      }
    }).catch(() => {
      callback(sourceSata);
    });
  }

  render(){

    return <div style={this.props.styleObj} id="main"> </div>;
  }
}
