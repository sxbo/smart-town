/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';
import NewMember from './newMember';

const columns: any = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text: any) => {
      <a>{text}</a>;
    },
  },
  {
    title: '副标题',
    key: 'secondTitle',
    dataIndex: 'secondTitle',
  },
  {
    title: '背景图片',
    dataIndex: 'cover',
    key: 'cover',
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


interface DynamicState{
  newMemberVisible: boolean;
}

export default class Dynamic extends Component<any, DynamicState> {
  // cover， 标题，副标题，富文本，操作
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
      newMemberVisible: true,
    });
  };

  render(){
    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openNewMember}>新增动态</Button>
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
