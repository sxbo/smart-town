/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {SFC, MouseEvent} from 'react';
import '../theme/style/common.scss';
import '../theme/style/components/greenHouseList.scss';
import { Table, Button, Form, Input, Space, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import {colors} from '../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export interface Breed{
  id?: string
  name: string,
  manage?: string,
  phone?: string,
  breedingSpecies?: string
  tradingVolume?: number // 交易量
  turnover?: number // 交易额
}

interface BreedListProps{
  pagination: false | TablePaginationConfig | undefined
  data: any;
  deleteSuccess:() => void;
}

const BreedList: SFC<BreedListProps> = (props) => {


  const [form] = Form.useForm();

  const deleteClicked = (e: MouseEvent, text: string, row: Breed) => {
    const id = row.id;
    Modal.confirm({
      title: '删除养殖数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/breed/${id}`,
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

  const columns: ColumnsType<Breed> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '管理者',
      dataIndex: 'manage',
      key: 'manage',
    },
    {
      title: '联系方式',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '养殖种类',
      dataIndex: 'breedingSpecies',
      key: 'breedingSpecies',
    },
    {
      title: '交易量',
      key: 'tradingVolume',
      dataIndex: 'tradingVolume',
    },
    {
      title: '交易额',
      key: 'turnover',
      dataIndex: 'turnover',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button style={{color: colors.danger}} onClick={e => deleteClicked(e, text, record)} size="small">删除</Button>
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
          <Form.Item>
            <Button value="horizontal">查询</Button>
            <Button value="vertical">重置</Button>
          </Form.Item>
        </Form> : ''
      }
      <Table
        columns={columns}
        dataSource={data}
        pagination={props.pagination}
        rowKey="id"
      />
    </div>
  );
};

BreedList.defaultProps = {
  pagination: false,
};


export default BreedList;
