/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Button, Table, Space, Spin, Modal, message} from 'antd';
import axios from 'axios';
import {HorseType, colors} from '../../const/const';
import NewAdvertise from './NewAdvertise';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import coverImg from '../../theme/img/partyLogo.jpg';


interface AdvertisementState{
  newVisible: boolean;
  advertises: [];
  loading: boolean;
  advertise: any;
  modalTitle: string;
  mode: AdvertiseMode;
}

export enum AdvertiseMode{
  create,
  edit
}

export default class Advertisement extends Component<any, AdvertisementState> {
  // 标题，连接，cover，操作
  constructor(props: any){
    super(props);
    this.state = {
      newVisible: false,
      advertises: [],
      loading: false,
      advertise: {},
      modalTitle: '新增广告',
      mode: AdvertiseMode.create,
    };
  }

  componentDidMount() {
    this.getAdvertises();
  }

  getAdvertises = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllAdvertisement',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          advertises: data,
        });
      } else {
        this.setState({
          advertises: [],
        });
      }
    }).catch(() => {
      this.setState({
        advertises: [],
      });
    });
  }


  createClicked = () => {
    this.setState({
      advertise: {},
      modalTitle: '新增广告',
      newVisible: true,
      mode: AdvertiseMode.create,
    });
  }

  editClicked = (advertise: any) => {
    this.setState({
      advertise: advertise,
      modalTitle: '编辑广告',
      newVisible: true,
      mode: AdvertiseMode.edit,
    });
  }

  closeNewAdvertise = () => {
    this.setState({
      newVisible: false,
    });
  };

  createSuccessCall = () => {
    this.closeNewAdvertise();
    this.getAdvertises();
  }


  deleteAdvertise = (advertise: any) => {
    Modal.confirm({
      title: '删除广告',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
			cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/spb/delAdvertisement/${advertise.id}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getAdvertises();
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
        title: '背景图',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        width: '30%',
        render: (text: any, record: any) => {
          return <img style={{width: '150', height: '100px'}} src={record.imageUrl || coverImg} alt="cover"/>;
        },
      },
      {
        title: '类型',
        key: 'type',
        width: '30%',
        dataIndex: 'type',
        render: (type: number) => {
          const find = HorseType.find(item => item.type == type);
          return find?.label;
        },
      },
      {
        title: '链接',
        key: 'link',
        width: '30%',
        dataIndex: 'link',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button size="small" onClick={() => this.editClicked(record)}>编辑</Button>
            <Button size="small" style={{color: colors.danger}} onClick={() => this.deleteAdvertise(record)}>删除</Button>
          </Space>
        ),
      },
    ];

    const {advertises, loading, newVisible, advertise, modalTitle, mode} = this.state;
    return (
      <Spin tip="正在上传，请稍后" spinning={loading} delay={500}>
        <div className="content-item">
          <div className="orginization">
            <div>
              <Button type="primary" size="middle" onClick={this.createClicked}>新建广告</Button>
            </div>
          </div>
          <div>
            <Table columns={columns} dataSource={advertises} rowKey="id" pagination={{total: advertises.length, showTotal: total => `共 ${total} 条`}}/>
          </div>
          {
            newVisible && <NewAdvertise mode={mode} advertise={advertise} title={modalTitle} visible={newVisible} createSuccess={this.createSuccessCall} close={this.closeNewAdvertise} />
          }
          </div>
      </Spin>
    );
  }
}
