/* eslint-disable handle-callback-err */
/* eslint-disable no-invalid-this */
/* eslint-disable no-else-return */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {ColumnsType} from 'antd/es/table/interface';
import { Table, Button, Input, Space, Modal } from 'antd';
import axios from 'axios';
import UserModel from './UserModel';
import {colors} from '../../const/const';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const {Search} = Input;

export enum UserOptMode{
  create,
  update,
}

export default class UserList extends Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      users: [],
      userModelVisible: false,
      mode: UserOptMode.create,
      user: '',
      title: '新建用户',
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList = () => {
    axios({
      method: 'GET',
      url: 'api/user',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          users: data,
        });
      } else {
        this.setState({
          users: [],
        });
      }
    }).catch(() => {
      this.setState({
        users: [],
      });
    });
  }

  createUserClick = () => {
    this.setState({
      userModelVisible: true,
      user: '',
      mode: UserOptMode.create,
      title: '新建用户',
    });
  }

  updateUser = (user: any) => {
    this.setState({
      user: user,
      mode: UserOptMode.update,
      userModelVisible: true,
      title: '更新用户',
    });
  }

  deleteUser = (user: any) => {
    Modal.confirm({
      title: '删除用户',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const userId = user.userId;
        axios({
          method: 'DELETE',
          url: `api/user/${userId}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getUserList();
          }
        });
      },
    });
  }
  createUserSuccess = () => {
    this.getUserList();
    this.closeUserModel();
  }

  closeUserModel = () => {
    this.setState({
      userModelVisible: false,
    });
  }

  render(){
    const {mode, user, title} = this.state;
    const columns: ColumnsType<any> = [
      {
        title: '用户名称',
        dataIndex: 'username',
        key: 'username',
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
        render: (roles: []) => {
          const num: number = roles.length;
          return roles.map((role: any, index) => {
            const renderStr = '';
            if (index === num - 1){
              return renderStr + role.roleName;
            } else {
              return renderStr + role.roleName + ',';
            }
          });
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => this.updateUser(record)} size="small">编辑</Button>
            <Button type="ghost" onClick={() => this.deleteUser(record)} size="small" style={{color: colors.danger}}>删除</Button>
          </Space>
        ),
      },
    ];

    return <>
      <div className="single-search-box">
        <Space>
          <Search style={{width: '3rem'}} size="middle" placeholder="请输入关键字" onSearch={value => console.log(value)} enterButton />
          <Button size="middle" type="primary" onClick={this.createUserClick}>新建用户</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={this.state.users}
        rowKey="userId"
      />
      <UserModel title={title} mode={mode} user={user} visble={this.state.userModelVisible} createSuccess={this.createUserSuccess} close={this.closeUserModel}/>
    </>;
  }


}
