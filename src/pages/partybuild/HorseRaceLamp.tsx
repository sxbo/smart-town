import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '链接',
    key: 'link',
    dataIndex: 'link',
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


interface HorseRaceLampState{
  newMemberVisible: boolean;
}


export default class HorseRaceLamp extends Component<any, HorseRaceLampState> {

  // title, link
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
        <div>
          <Table columns={columns} dataSource={[]}/>
        </div>
      </div>
    );
  }
}
