import React, {Component} from 'react';
import {Button, Table, Space} from 'antd';
import NewMember from './newMember';
import advar from '../../theme/img/timg.jpg';


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

    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: (text: any, record: any) => {
          return <>
            <img src={advar} style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '5px'}} alt=""></img> {text || record.name}
          </>;
        },
      },
      {
        title: '部门',
        key: 'group',
        dataIndex: 'group',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
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
            <Button type="ghost" size="small">上传头像</Button>
          </Space>
        ),
      },
    ];

    const data = [
      {
        name: '刘伟',
        group: '宣传部',
        createTime: '2020.03.12',
        contact: '15664916658',
        advar: 'http:fanjiazhen/12',
      },
      {
        name: '刘伟',
        group: '宣传部',
        createTime: '2020.03.12',
        contact: '15664916658',
        advar: 'http:fanjiazhen/12',
      },
      {
        name: '刘伟',
        group: '宣传部',
        createTime: '2020.03.12',
        contact: '15664916658',
        advar: 'http:fanjiazhen/12',
      },
    ];

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openNewMember}>新建党员</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} rowKey={(record, index) => `${index}`}/>
        </div>
        <NewMember newMemberVisble={this.state.newMemberVisible} close={this.closeNewMember}/>
      </div>
    );
  }
}
