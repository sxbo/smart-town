/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {Button, Table, Space, Modal, message} from 'antd';
import NewHorseRaceLamp from './NewHorseRaceLamp';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import {HorseType, colors} from '../../const/const';
import EditHorseRaceLamp from './EditHorceRaceLamp';


const {confirm} = Modal;

export enum HorseOptMpde{
  create,
  update
}

interface HorseRaceLampState{
  visible: boolean;
  horseRaceLamp: any;
  hrls: [];
  editVisible: boolean;
}


export default class HorseRaceLamp extends Component<any, HorseRaceLampState> {

  // title, link
  constructor(props: any){
    super(props);
    this.state = {
      visible: false,
      editVisible: false,
      horseRaceLamp: {},
      hrls: [],
    };
  }

  componentDidMount(){
    this.getHRLs();
  }

  createClicked = () => {
    this.setState({
      visible: true,
    });
  }

  getHRLs = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllHorseRaceLamp',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          hrls: data,
        });
      } else {
        this.setState({
          hrls: [],
        });
      }
    }).catch(() => {
      this.setState({
        hrls: [],
      });
    });
  }

  closeCreateModel = () => {
    this.setState({
      visible: false,
    });
  };

  closeEditModel = () => {
    this.setState({
      editVisible: false,
    });
  };

  createSuccessCall = () => {
    this.getHRLs();
    this.closeCreateModel();
  }

  editSuccessCall = () => {
    this.getHRLs();
    this.closeEditModel();
  }

  editHorseRaceLamp = (record: any) => {
    this.setState({
      editVisible: true,
      horseRaceLamp: record,
    });
  }

  deleteHorseRaceLamp = (horseRaceLamp: any) => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
			cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/spb/delHorseRaceLamp/${horseRaceLamp.id}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getHRLs();
          } else {
            message.error('删除失败');
          }
        }).catch(() => {
          message.error('删除失败');
        });
      },
    });
  }

  render(){

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
        render: (text: any) => {
          return <a>{text}</a>;
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '30%',
        render: (type: number) => {
          const find = HorseType.find(item => item.type == type);
          return find?.label;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => this.editHorseRaceLamp(record)} size="small">编辑</Button>
            <Button type="ghost" size="small" style={{color: colors.danger}} onClick={() => this.deleteHorseRaceLamp(record)}>删除</Button>
          </Space>
        ),
      },
    ];

    const {hrls, horseRaceLamp} = this.state;

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" type="primary" onClick={this.createClicked}>新建</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={hrls} rowKey='id'/>
        </div>
        <NewHorseRaceLamp createSuccess={this.createSuccessCall} visible={this.state.visible} close={this.closeCreateModel}/>
        <EditHorseRaceLamp horseRaceLamp={horseRaceLamp} editSuccess={this.editSuccessCall} visible={this.state.editVisible} close={this.closeEditModel}/>
      </div>
    );
  }
}
