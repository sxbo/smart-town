/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable indent */
import React, {Component} from 'react';
import '../../theme/style/convenient/Convenient.scss';
import PageTitle from '../../components/PageTitle';
import {Form, Select, Button, DatePicker, Table, Space, message, Modal} from 'antd';
import {ClockCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import {appeals, colors} from '../../const/const';
import ReplyModal from './ReplyModal';


export default class Convenient extends Component {
	formRef = React.createRef<FormInstance>();
	state = {
		convenients: [],
		replyModalVisible: false,
		convenient: {},
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

	replyConvenient = (convenient: any) => {
		this.setState({replyModalVisible: true, convenient: convenient});
	}

	downConvenient = (convenient: any) => {
		Modal.confirm({
			title: '完成诉求',
			content: '确认完成该诉求?',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				convenient.state = 2;
				this.updateConvenient(convenient);
			},
		});
	}

	updateConvenient = (convenient: any) => {
		axios({
			method: 'PUT',
			url: 'api/updateConvenientService',
			data: convenient,
		}).then((res) => {
			if (res.data.status === 200){
				this.getAllConvenients();
			}
		}).catch(() => {
			message.error('操作失败');
		});
	}


	closeReply = () => {
		this.setState({replyModalVisible: false});
	}

	replySuccess = () => {
		this.getAllConvenients();
		this.closeReply();
	}

	delConvenient = (id: any) => {
		axios({
			method: 'DELETE',
			url: `api/spb/delConvenientService/${id}`,
		}).then((res) => {
			if (res.data.status === 200){
				this.getAllConvenients();
			}
		}).catch(() => {
			message.error('删除失败');
		});
	}

	delConvenientClcik = (convenient: any) => {
		Modal.confirm({
			title: '删除诉求',
			content: '确认删除？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				this.delConvenient(convenient.bmId);
			},
		});
	}

	searchClick = () => {
		const value: any = this.formRef.current?.getFieldsValue(['type', 'appealTime', 'state']);
		const appealTime = value.appealTime;
		const time = appealTime?.format('YYYY-MM-DD') || '';
		const state = value.state || '';
		let type = value.type;
		if (type >= 0){
			this.filterConvenients(type, time, state);
		} else {
			this.filterConvenients('', time, state);
		}
	}

	filterConvenients = (type: any, date: any, state: any) => {
		axios({
			method: 'GET',
			url: `api/getConvenientsByTypeAndStateAndTime?type=${type}&date=${date}&state=${state}`,
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
	render(){
		const {convenients, replyModalVisible, convenient, downNum, doingNum} = this.state;
		const columns: ColumnsType<any> | undefined = [
			{
				title: '诉求人姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '联系电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '诉求类型',
				key: 'type',
				dataIndex: 'type',
				render: (type: any) => {
					const appeal = appeals.find(item => item.type == type);
					return appeal?.label;
				},
			},
			{
				title: '诉求内容',
				dataIndex: 'content',
				key: 'content',
			},
			{
				title: '状态',
				key: 'state',
				dataIndex: 'state',
				render: (state) => {
					return state == 1 ? '正在处理' : '已解决';
				},
			},
			{
				title: '诉求时间',
				dataIndex: 'createTime',
				key: 'createTime',
			},
			{
				title: '回复内容',
				dataIndex: 'returnContent',
				key: 'returnContent',
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<Space>
						<Button size="middle" disabled={record?.state == 2} onClick={e => this.replyConvenient(record)}>回复</Button>
						<Button size="middle" disabled={record?.state == 2} onClick={e => this.downConvenient(record)}>完成</Button>
						<Button size="middle" onClick={e => this.delConvenientClcik(record)} style={{color: colors.danger}}>删除</Button>
					</Space>
				),
			},
		];
		return <div className="convenient-box">
			<PageTitle title="便民服务" >
				<span style={{marginRight: '20px'}}><ClockCircleOutlined style={{color: colors.primary, marginRight:'5px'}}/>正在处理事件： {doingNum}</span>
				<span><CheckCircleOutlined style={{color: colors.success, marginRight:'5px'}}/>已处理事件： {downNum}</span>
			</PageTitle>
			<div className="convenient-search-box">
				<div className="card-box search-list">
					<div className="search-box">
						<Form
							layout="inline"
							ref={this.formRef}>
							<Form.Item name="type" label="诉求类型">
								<Select allowClear placeholder="诉求类型" style={{width: '200px'}}>
									{
										appeals.map(item => {
											return <Select.Option key={item.type} value={item.type}>{item.label}</Select.Option>;
										})
									}
								</Select>
							</Form.Item>
							<Form.Item name="state" label="诉求状态">
								<Select allowClear placeholder="诉求状态" style={{width: '200px'}}>
									<Select.Option value={1}>正在处理中</Select.Option>
									<Select.Option value={2}>已解决</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item name="appealTime" label="诉求时间">
								<DatePicker placeholder="诉求时间" allowClear/>
							</Form.Item>
							<Form.Item>
								<Button value="horizontal" onClick={this.searchClick}>查询</Button>
							</Form.Item>
						</Form>
						<Button size="middle">导出</Button>
					</div>
					<div className="list-box">
						<Table
							columns={columns}
							dataSource={convenients}
							pagination={{pageSize: 10}}
							rowKey="bmId"
						/>
					</div>
				</div>
			</div>
			<ReplyModal visible={replyModalVisible} replySuccess={this.replySuccess} convenient={convenient} close={this.closeReply}/>
		</div>;
	}
}
