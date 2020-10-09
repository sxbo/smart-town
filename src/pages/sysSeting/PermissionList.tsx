/* eslint-disable handle-callback-err */
/* eslint-disable no-invalid-this */
/* eslint-disable no-else-return */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {ColumnsType} from 'antd/es/table/interface';
import { Table, Button, Input, Space, Modal } from 'antd';
import axios from 'axios';
import {colors} from '../../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import PermissionModel from './PermissionModel';


const {Search} = Input;

export enum PermissionOptMode{
  create,
  update,
}

export default class PermissionList extends Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      permissions: [],
      perModelVisible: false,
      mode: PermissionOptMode.create,
      permission: '',
      title: '新建权限',
    };
  }

  componentDidMount() {
    this.getPermissions();
  }

  createPerClick = () => {
    this.setState({
      perModelVisible: true,
      permission: '',
      mode: PermissionOptMode.create,
      title: '新建权限',
    });
  }

  updatePer = (permission: any) => {
    this.setState({
      permission: permission,
      mode: PermissionOptMode.update,
      perModelVisible: true,
      title: '更新权限',
    });
  }

  deletePer = (permission: any) => {
    Modal.confirm({
      title: '删除权限',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const permissionId = permission.permissionId;
        axios({
          method: 'DELETE',
          url: `api/permission/${permissionId}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getPermissions();
          }
        });
      },
    });
  }

  createPerSuccess = () => {
    this.getPermissions();
    this.closePerModel();
  }

  closePerModel = () => {
    this.setState({
      perModelVisible: false,
    });
  }

  getPermissions = () => {
    axios({
      method: 'GET',
      url: 'api/permission',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          permissions: data,
        });
      } else {
        this.setState({
          permissions: [],
        });
      }
    }).catch(() => {
      this.setState({
        permissions: [],
      });
    });
  }

  render(){
    const columns: ColumnsType<any> = [
      {
        title: '权限名称',
        dataIndex: 'permission',
        key: 'permission',
      },
      {
        title: '权限描述字段',
        dataIndex: 'permissionName',
        key: 'permissionName',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => {this.updatePer(record);}} size="small">编辑</Button>
            <Button type="ghost" size="small" style={{color: colors.danger}} onClick={() => this.deletePer(record)}>删除</Button>
          </Space>
        ),
      },
    ];

    const {permissions, mode, permission, title, perModelVisible} = this.state;

    return <>
      <div className="single-search-box">
        <Space>
          <Search style={{width: '3rem'}} placeholder="请输入关键字" onSearch={value => console.log(value)} enterButton />
          <Button size="middle" type="primary" onClick={this.createPerClick}>新建权限</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={permissions}
        rowKey="permissionId"
      />
      <PermissionModel title={title} mode={mode} permission={permission} visble={perModelVisible} createSuccess={this.createPerSuccess} close={this.closePerModel}/>
    </>;
  }


}
