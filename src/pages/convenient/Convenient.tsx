/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable indent */
import React, {Component} from 'react';
import '../../theme/style/convenient/Convenient.scss';
import PageTitle from '../../components/PageTitle';
import {Form, Select, Button, DatePicker, Table, Space} from 'antd';
import {ClockCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';

export default class Convenient extends Component {
	formRef = React.createRef<FormInstance>();
	render(){
		const columns: ColumnsType<any> | undefined = [
			{
				title: '诉求人姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '联系电话',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '诉求类型',
				key: 'monitorNum',
				dataIndex: 'monitorNum',
			},
			{
				title: '诉求内容',
				dataIndex: 'manage',
				key: 'manage',
			},
			{
				title: '状态',
				key: 'monitorNum',
				dataIndex: 'monitorNum',
			},
			{
				title: '诉求时间',
				dataIndex: 'manage',
				key: 'manage',
			},
			{
				title: '回复内容',
				dataIndex: 'manage',
				key: 'manage',
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<Space>
					<Button type="ghost" size="middle">删除</Button>
					</Space>
				),
			},
		];
		const data: any[] | undefined = [];
		return <div className="convenient-box">
			<PageTitle title="便民服务" >
				<span style={{marginRight: '20px'}}><ClockCircleOutlined />正在处理事件： 10</span>
				<span><CheckCircleOutlined />已处理事件： 20</span>
			</PageTitle>
			<div className="convenient-search-box">
				<div className="card-box search-list">
					<div className="search-box">
						<Form
							layout="inline"
							ref={this.formRef}>
							<Form.Item label="诉求类型">
								<Select style={{width: '200px'}}>
									<Select.Option value="1">民事诉讼</Select.Option>
									<Select.Option value="2">刑事诉求</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item label="诉求时间">
								<DatePicker />
							</Form.Item>
							<Form.Item name="layout">
								<Button value="horizontal">查询</Button>
								<Button value="vertical">重置</Button>
							</Form.Item>
						</Form>
						<Button size="middle">导出</Button>
					</div>
					<div className="list-box">
						<Table
							columns={columns}
							dataSource={data}
							pagination={{pageSize: 10}}
						/>
					</div>
				</div>
			</div>
		</div>;
	}
}
