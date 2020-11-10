/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import axios from 'axios';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import '../../theme/style/datascreen/Farming.scss';
const echarts = require('echarts/lib/echarts');

const defaultDatas = [{
        type: '水稻',
        count: '300亩',
    },
    {
        type: '葡萄',
        count: '1000亩',
    },
    {
        type: '苹果',
        count: '3000亩',
    },
    {
        type: '李子',
        count: '30亩',
    },
    {
        type: '冬枣',
        count: '5000亩',
    },
];

export default class Farming extends Component<any, any>{

    componentDidMount(){
        var myChart = echarts.init(document.getElementById('farm_pie'));
        // 绘制图表
        window.onresize = function () {
            myChart.resize();
        };

        this.getAllFarms((farms: any) => {
            const legends: any[] = farms.map((item: any) => item.type);
            const seriesData: any[] = farms.map((item: any) => {return {name: item.type, value: item.count};});
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 0,
                    borderColor: '#fff',
                    textStyle: {
                        color: '#000',
                    },
                    formatter: '{b} : {c} 亩',
                },
                legend: {
                    bottom: 1,
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                    },
                    data: legends,
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        bottom: 30,
                        top: 5,
                        data: seriesData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
                grid: {
                    top:'5px',
                    left:'5px',
                    right:'5px',
                    bottom:'5px',
                },
            });
        });
    }

    getAllFarms = (callBack: (data: any) => void) => {
		axios({
			method: 'GET',
			url: 'api/getFarmCount',
		}).then((res) => {
			if (res.data.status === 200){
                const farms = res.data?.data || defaultDatas;
                callBack(farms);
			}
		}).catch(() => {
			callBack(defaultDatas);
		});
    }

    render() {
        return <BackShadow className="farming">
            <ScreenTitle title="农业分布图"></ScreenTitle>
            <div style={this.props.styleObj} id="farm_pie"> </div>
        </BackShadow>;
    }
}
