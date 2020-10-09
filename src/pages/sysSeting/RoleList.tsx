/* eslint-disable handle-callback-err */
/* eslint-disable no-invalid-this */
/* eslint-disable no-else-return */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {ColumnsType} from 'antd/es/table/interface';
import { Table, Button, Input, Space, Modal } from 'antd';
import axios from 'axios';
import {colors} from '../../const/const';
import {CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import RoleModel from './RoleModel';

const {Search} = Input;

export enum RoleOptMode{
  create,
  update,
}

export default class RoleList extends Component<any, any> {

  constructor(props: any){
    super(props);
    this.state = {
      roles: [],
      permissions: [],
      roleModelVisible: false,
      mode: RoleOptMode.create,
      role: '',
      title: '新建角色',
    };
  }

  componentDidMount() {
    this.getRoleList();
    this.getPermissions();
  }

  getRoleList = () => {
    axios({
      method: 'GET',
      url: 'api/role',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          roles: data,
        });
      } else {
        this.setState({
          roles: [],
        });
      }
    }).catch(() => {
      this.setState({
        roles: [],
      });
    });
  };

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

  createRoleClick = () => {
    this.setState({
      roleModelVisible: true,
      role: '',
      mode: RoleOptMode.create,
      title: '新建角色',
    });
  }

  updateRole = (role: any) => {
    this.setState({
      role: role,
      mode: RoleOptMode.update,
      roleModelVisible: true,
      title: '更新角色',
    });
  }

  deleteRole = (role: any) => {
    Modal.confirm({
      title: '删除角色',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const roleId = role.roleId;
        axios({
          method: 'DELETE',
          url: `api/role/${roleId}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getRoleList();
          }
        });
      },
    });
  }

  createRoleSuccess = () => {
    this.getRoleList();
    this.closeRoleModel();
  }

  closeRoleModel = () => {
    this.setState({
      roleModelVisible: false,
    });
  }

  getColumns = (): ColumnsType<any> => {
    const {permissions} = this.state;
    const permissionColumns = permissions.map((permission: any) => {
      return {
        title: permission.permission,
        key: permission.permission,
        render: (text: any, record: any) => {
          const havePers = record.permissions || [];
          const permissionId = permission.permissionId;
          const findper = havePers.find((item: any) => item.permissionId === permissionId);
          if (findper) {
            return <CheckOutlined style={{color: colors.success}}/>;
          } else {
            return <CloseOutlined style={{color: colors.danger}}/>;
          }
        },
      };
    });
    let columns: ColumnsType<any> = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
    ];
    const lastColumn = [
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => this.updateRole(record)} size="small">编辑</Button>
            <Button type="ghost" size="small" style={{color: colors.danger}} onClick={() => this.deleteRole(record)}>删除</Button>
          </Space>
        ),
      },
    ];

    if (permissionColumns && permissionColumns.length){
      columns = columns.concat(permissionColumns).concat(lastColumn);
    } else {
      columns = columns.concat(lastColumn);
    }
    return columns;
  }

  render(){
    const columns = this.getColumns();
    const {roles, mode, role, title, roleModelVisible} = this.state;
    return <>
      <div className="single-search-box">
        <Space>
          <Search style={{width: '3rem'}} placeholder="请输入关键字" onSearch={value => console.log(value)} enterButton />
          <Button size="middle" type="primary" onClick={this.createRoleClick}>新建角色</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="roleId"
      />
      <RoleModel title={title} mode={mode} role={role} visble={roleModelVisible} createSuccess={this.createRoleSuccess} close={this.closeRoleModel}/>
    </>;
  }


}
