import React, {Component} from 'react';
import {ColumnsType} from 'antd/es/table/interface';
import { Table, Button, Input, Space } from 'antd';
const {Search} = Input;
const columns: ColumnsType<any> = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '修改时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '所属角色',
    key: 'roles',
    dataIndex: 'roles',
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => (
      <Space>
        <Button type="default" onClick={() => {console.log(text, record);}} size="small">编辑</Button>
        <Button type="ghost" size="small">删除</Button>
      </Space>
    ),
  },
];

export default class UserList extends Component {

  render(){
    return <>
      <div className="single-search-box">
        <Search style={{width: '3rem'}} placeholder="请输入关键字" onSearch={value => console.log(value)} enterButton />
      </div>
      <Table
        columns={columns}
        dataSource={[]}
        rowKey="id"
      />
    </>;
  }


}
