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
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
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

interface PriceSellPro{
  styleObj?: CSSProperties;
}

export default class PriceSell extends React.Component<PriceSellPro, any> {

  componentDidMount(){
    var myChart = echarts.init(document.getElementById('price_sell_main'));
    window.onresize = function () {
        myChart.resize();
    };
    axios.all([this.getPriceSells(), this.getAllTypes(), this.getAllVillage()]).then(
        axios.spread((data1, data2, data3) => {
            const xAxisData: any[] = data3?.data?.data || sourceSata;
            const lengedData: any[] = data2.data?.data || [];
            const siriusData: any[] = data1.data?.data || [];
            this.renderChart(myChart, siriusData, lengedData, xAxisData);
    // eslint-disable-next-line handle-callback-err
    })).catch(err => {
        this.renderChart(myChart, [], [], sourceSata);
    });
  }

  renderChart = (myChart: any, siriusData: any[], lengedData: any[], xAxisData: any[]) => {
    const xAxis = xAxisData.map((item: any) => item.village);
    const lenged = lengedData.map((item: any) => item.type);
    const barSirius: any[] = [];
    const lineSirius: any[] = [];
    lenged.map((item: any) => {
        const barSiriusItem: any = {
            name: item,
            type: 'bar',
            stack: lenged[0],
            data: [],
        };
        const lineSiriusItem: any = {
            name: item,
            type: 'line',
            smooth: true,
            data: [],
        };
        xAxis.map((xItem: any) => {
            const barFind = siriusData.find((s: any) => s.type?.type === item && s.village?.village === xItem);
            if (barFind) {
                barSiriusItem.data.push(barFind.daySell);
                lineSiriusItem.data.push(barFind.price);
            } else {
                barSiriusItem.data.push(0);
                lineSiriusItem.data.push(0);
            }
        });
        barSirius.push(barSiriusItem);
        lineSirius.push(lineSiriusItem);
    });
    myChart?.setOption({
        legend: {
            data: lenged,
            textStyle: {
              color: '#fff',
            },
        },
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        xAxis: [{
            type: 'category',
            data: xAxis,
            axisLabel: {
                textStyle: {
                  color: '#fff',
                },
                interval:0,
                rotate:270,
            },
            boundaryGap: true,
            axisTick:{
              alignWithLabel: true,
            },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                textStyle: {
                color: '#fff',
                },
            },
        }],
        series:  [...barSirius, ...lineSirius],
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
            extraCssText: 'width: 100px',
            formatter: (params: any[], tackits: any, callBack: Function) => {
              const vallige = params[0]?.axisValueLabel || '';
              let str = `${vallige}<br/> <span>类型  </span><span>销量/吨</span><span>价格/元</span><br/>`;
              // 截取位置为数组的一半
              const spliceIndex = params.length / 2;
              let arr1 = params.splice(0, spliceIndex);
              const arr2 = params;
              // eslint-disable-next-line guard-for-in
              for (let index = 0; index < arr1.length; index++) {
                const sellvalue = arr1[index].data || '无';
                const priceValue = arr2[index].data || '无';
                const type = arr1[index].seriesName || '  ';
                str = `${str}<span>${type}</span><span>${sellvalue}</span><span>${priceValue}</span><br/>`;
              }
              return str;
            },
        },
        grid: {
            top:'30px',
            left:'50px',
            right:'10px',
            bottom:'50px',
        },
    });
  }

  getPriceSells = () => {
    return axios({
      method: 'GET',
      url: 'api/priceSells',
    });
  }

  getAllVillage = () => {
    return axios({
      method: 'GET',
      url: 'api/getAllVillage',
    });
  }

  getAllTypes = () => {
    return axios({
      method: 'GET',
      url: 'api/getAllFarmCount',
    });
  }

  render(){
    return <div style={this.props.styleObj} id="price_sell_main"> </div>;
  }
}
