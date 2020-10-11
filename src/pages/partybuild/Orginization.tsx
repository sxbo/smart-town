/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable handle-callback-err */
/* eslint-disable no-invalid-this */
/* eslint-disable no-else-return */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {Button, Table, Space, Modal, message, Upload} from 'antd';
import NewMember from './newMember';
import axios from 'axios';
import {jopType, idCardType} from '../../const/const';
import {colors} from '../../const/const';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

export enum OrginizationOptMode{
  create,
  update,
}

interface OrginizationState{
  newMemberVisible: boolean;
  organizations: [];
  member: {};
  mode: OrginizationOptMode;
  title: string;
  loading: boolean;
}

export default class Orginization extends Component<any, OrginizationState> {

  constructor(props: any){
    super(props);
    this.state = {
      newMemberVisible: false,
      organizations: [],
      member: {},
      mode: OrginizationOptMode.create,
      title: '新建党员',
      loading: false,
    };
  }

  componentDidMount() {
    this.getOrginizations();
  }

  updateHeadImg = (member: any) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateMemberOrganizations',
      data: member,
    }).then((res) => {
      if (res.data.status === 200){
        this.getOrginizations();
        this.setState({
          loading: false,
        });
      } else {
        message.error('操作失败');
      }
    }).catch(() => {
      message.error('操作失败');
    });
  }

  getOrginizations = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getMemberOrganizations',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        const arr1 = data[0].leader || [];
        const arr2 = data[0].ordinary || [];
        const organizations = arr1.concat(arr2);
        this.setState({
          organizations: organizations,
        });
      } else {
        this.setState({
          organizations: [],
        });
      }
    }).catch(() => {
      this.setState({
        organizations: [],
      });
    });
  }

  newMemberClick = () => {
    this.setState({
      newMemberVisible: true,
      member: {},
      mode: OrginizationOptMode.create,
      title: '新建党员',
    });
  };

  updateMemberClick = (member: any) => {
    this.setState({
      newMemberVisible: true,
      member: member,
      mode: OrginizationOptMode.update,
      title: '修改党员',
    });
  }

  deleteMember = (member: any) => {
    Modal.confirm({
      title: '删除党员',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const memberId = member.id;
        axios({
          method: 'DELETE',
          url: `api/spb/delMemberOrganizations/${memberId}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getOrginizations();
          } else {
            message.error('删除失败！');
          }
        });
      },
    });
  }

  closeNewMember = () => {
    this.setState({
      newMemberVisible: false,
    });
  };

  createSuccess = () => {
    this.getOrginizations();
    this.closeNewMember();
  }

  render(){
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: (text: any, record: any) => {
          return <>
            <img src={record.headImg} style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '5px'}} alt=""></img> {text || record.name}
          </>;
        },
      },
      {
        title: '党内职务',
        key: 'jobType',
        dataIndex: 'jobType',
        render: (text: any) => {
          const type = jopType.find(item => item.jobType == text);
          return type?.label;
        },
      },
      {
        title: '身份类型',
        key: 'idCardType',
        dataIndex: 'idCardType',
        render: (text: any) => {
          const type = idCardType.find(item => item.idCardType == text);
          return type?.label;
        },
      },
      {
        title: '隶属组织',
        key: 'group',
        dataIndex: 'group',
      },
      {
        title: '入党日期',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '联系方式',
        key: 'phone',
        dataIndex: 'phone',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => {

          const uploadProps = {
            name: 'file',
            action: 'api/upload/uploadImage',
            headers: {
              authorization: 'authorization-text',
            },
            onChange: (info: any) => {
              if (info.file.status !== 'uploading') {
                this.setState({
                  loading: true,
                });
                message.info('正在上传，请稍后！', 1);
              }
              if (info.file.status === 'done') {
                record.headImg = info?.file?.response?.imgUrl;
                this.updateHeadImg(record);
                console.log(info);
              } else if (info.file.status === 'error') {
                this.setState({
                  loading: false,
                });
                message.info('上传失败！');
              }
            },
          };

          return <Space>
            <Button type="default" onClick={() => {this.updateMemberClick(record);}} size="small">编辑</Button>
            <Button style={{color: colors.danger}} onClick={() => this.deleteMember(record)} type="ghost" size="small">删除</Button>
            <Upload showUploadList={false} {...uploadProps} accept=".jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp">
              <Button icon={<UploadOutlined />} type="dashed" size="small">上传头像</Button>
            </Upload>
          </Space>;
        },
      },
    ];

    const {organizations, member, mode, title, loading} = this.state;

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" type="primary" onClick={this.newMemberClick}>新建党员</Button>
          </div>
        </div>
        <div>
          <Table loading={loading} columns={columns} dataSource={organizations} rowKey="id"/>
        </div>
        <NewMember mode={mode} title={title} member={member} newMemberVisble={this.state.newMemberVisible} close={this.closeNewMember} createSuccess={this.createSuccess}/>
      </div>
    );
  }
}
