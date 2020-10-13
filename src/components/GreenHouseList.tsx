/* eslint-disable newline-after-var */
import React, {SFC, MouseEvent} from 'react';
import '../theme/style/common.scss';
import '../theme/style/components/greenHouseList.scss';
import { Table, Button, Form, Input, Space, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import {colors} from '../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export interface GreenHouse{
  id?: number;
  key?: string
  name: string,
  address?: string,
  alarmNum?: number,
  monitorNum?: number
  manager: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
  deleteSuccess: () => void;
  data: any;
}

const GreenHouseList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const deleteClicked = (e: MouseEvent, text: string, row: GreenHouse) => {
    const id = row.id;
    Modal.confirm({
      title: '删除大棚数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/greenhouse/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            props.deleteSuccess();
          } else {
            message.error('操作失败');
          }
        });
      },
    });
  };

  const columns: ColumnsType<GreenHouse> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '告警次数',
      key: 'monitorNum',
      dataIndex: 'monitorNum',
    },
    {
      title: '管理者',
      dataIndex: 'manage',
      key: 'manage',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button type="ghost" style={{color: colors.danger}} onClick={e => deleteClicked(e, text, record)} size="middle">删除</Button>
        </Space>
      ),
    },
  ];

  const {data} = props;


  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <Form
          layout="inline"
          form={form}>
          <Form.Item label="名称">
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="地址">
            <Input placeholder="请输入地址" />
          </Form.Item>
          <Form.Item label="管理者">
            <Input placeholder="请输入管理者" />
          </Form.Item>
          <Form.Item name="layout">
            <Button value="horizontal">查询</Button>
            <Button value="vertical">重置</Button>
          </Form.Item>
        </Form> : ''
      }
      <Table
        columns={columns}
        dataSource={data}
        pagination={props.pagination}
      />
    </div>
  );
};

GreenHouseList.defaultProps = {
  pagination: false,
};


export default GreenHouseList;
