import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';
import NewMember from './newMember';

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '部门',
    key: 'idNum',
    dataIndex: 'idNum',
  },
  {
    title: '创建时间',
    dataIndex: 'belongVillage',
    key: 'belongVillage',
  },
  {
    title: '联系方式',
    key: 'contact',
    dataIndex: 'contact',
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


interface OrginizationState{
  newMemberVisible: boolean;
}

export default class Orginization extends Component<any, OrginizationState> {

  constructor(props: any){
    super(props);
    this.state = {
      newMemberVisible: false,
    };
  }

  openNewMember = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newMemberVisible: true,
    });
  };

  closeNewMember = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newMemberVisible: false,
    });
  };

  render(){
    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openNewMember}>新建党员</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={[]}/>
        </div>
        <NewMember newMemberVisble={this.state.newMemberVisible} close={this.closeNewMember}/>
      </div>
    );
  }
}
