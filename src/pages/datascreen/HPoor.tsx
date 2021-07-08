/* eslint-disable callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import axios from 'axios';
import '../../theme/style/datascreen/Hpoor.scss';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
const echarts = require('echarts/lib/echarts');

export default class HPoor extends Component<any>{

    state = {
        total: 0,
        outPoorCount: 0,
        poorCount: 0,
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main-hpoor'));
      // 绘制图表
        window.onresize = function () {
            myChart.resize();
        };
        this.getRecords((data: any) => {
            myChart.setOption({
                color: ['#00c292', '#c23531'],
                legend: {
                    bottom: 1,
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                    },
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 0,
                    borderColor: '#fff',
                    textStyle: {
                        color: '#000',
                    },
                },
                dataset: {
                    source: data,
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                        },
                        interval:0,
                    },
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                        },
                    },
                },
                series: [
                    {type: 'bar'},
                    {type: 'bar'},
                ],
                grid: {
                    top:'10px',
                    left:'50px',
                    right:'30px',
                    bottom:'50px',
                },
            });
        });
    }

    getRecords = (callback: (data: any) => void) => {
        axios({
          method: 'GET',
          url: 'api/getPoorCountInfo',
        }).then((res) => {
          if (res.data.status === 200){
            const data = res.data?.data || [];
            let dataSource = [['product', '已脱贫', '未脱贫']];
            data.map((item: any) => {
                dataSource.push([
                    item.year,
                    item.outPoorNumber || 0,
                    item.poorNumber || 0,
                ]);
            });
            callback(dataSource);
          }
        }).catch(() => {
            callback([
                ['product', '已脱贫', '未脱贫'],
                ['2012年-2014年', 100, 600],
                ['2015年-2017年', 300, 400],
                ['2018年-2020年', 500, 100],
                ['2020年-2022年', 600, 5],
            ]);
        });
    };

    render() {
        return <div style={this.props.styleObj} id="main-hpoor"></div>;
    }
}
