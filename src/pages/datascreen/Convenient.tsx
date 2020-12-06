/* eslint-disable no-invalid-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import '../../theme/style/datascreen/Convenient.scss';
import {ClockCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import axios from 'axios';
import {List} from 'antd';

export default class Convenient extends Component{
    state = {
		convenients: [],
		downNum: 0,
		doingNum: 0,
	}

	componentDidMount() {
		this.getAllConvenients();
	}

	getAllConvenients = () => {
		axios({
			method: 'GET',
			url: 'api/getConvenientService',
		}).then((res) => {
			if (res.data.status === 200){
				const convenients = res.data?.data || [];
				const down = [];
				const doing = [];
				convenients.map((item: any) => {
					if (item.state == 2){
						down.push(item);
					} else {
						doing.push(item);
					}
                });
                convenients.splice(0, 0, {name: '姓名', phone: '联系电话', state: '状态'});
				this.setState({
					convenients: convenients,
					downNum: down.length,
					doingNum: doing.length,
				});
			} else {
				this.setState({
					convenients: [],
					downNum: 0,
					doingNum: 0,
				});
			}
		}).catch(() => {
			this.setState({
				convenients: [],
				downNum: 0,
				doingNum: 0,
			});
		});
	}
    render() {
        const {convenients, doingNum, downNum} = this.state;
        return <BackShadow className="screen-convenient">
            <ScreenTitle title="便民服务"></ScreenTitle>
			<div className="s-convenient-hy">
				<div className="s-convenient-hyc">
					<span><ClockCircleOutlined style={{color: '#02EDEB', width: '.2rem', height: '.2rem'}}/></span>
					<span>未处理事件： {doingNum} 件</span>
				</div>
				<div className="s-convenient-hyc">
					<span><CheckCircleOutlined style={{color: '#02EDEB', width: '.2rem', height: '.2rem'}}/></span>
					<span>已处理事件： {downNum} 件</span>
				</div>
			</div>
			<div className="s-convenient-list">
				<List
					size="small"
					bordered={false}
					dataSource={convenients}
					renderItem={(item: any) =>
						<List.Item>
							<div>{item.name}</div>
							<div>{item.phone}</div>
							<div>{item.state == 1 ? '正在处理' : item.state == 2 ? '已解决' : '状态'}</div>
						</List.Item>
					}/>
			</div>
        </BackShadow>;
    }
}
