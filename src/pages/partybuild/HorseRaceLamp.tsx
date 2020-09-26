/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {Button, Table, Space, Modal} from 'antd';
import NewHorseRaceLamp from './NewHorseRaceLamp';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const {confirm} = Modal;

interface HorseRaceLampState{
  visible: boolean;
  horseRaceLamp: any
}


export default class HorseRaceLamp extends Component<any, HorseRaceLampState> {

  // title, link
  constructor(props: any){
    super(props);
    this.state = {
      visible: false,
      horseRaceLamp: {},
    };
  }

  closeEditModel = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      visible: false,
    });
  };

  editHorseRaceLamp = (record: any) => {
    this.setState({
      visible: true,
      horseRaceLamp: record,
    });
  }

  deleteHorseRaceLamp = () => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render(){

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text: any) => {
          return <a>{text}</a>;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => this.editHorseRaceLamp(record)} size="small">编辑</Button>
            <Button type="ghost" size="small" onClick={this.deleteHorseRaceLamp}>删除</Button>
          </Space>
        ),
      },
    ];

    const data = [
      {title: '冬天来了，秋天还会远吗', link: 'http:fanjiazhen.com/home/pcture'},
      {title: '习近平在联合国辩论会上的演讲', link: 'http:fanjiazhen.com/home/pcture'},
      {title: '花覅就看见工行卡', link: 'http:fanjiazhen.com/home/pcture'},
    ];

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" type="primary">新建</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} rowKey={(record, index) => `${index}`}/>
        </div>
        <NewHorseRaceLamp visible={this.state.visible} close={this.closeEditModel}/>
      </div>
    );
  }
}
