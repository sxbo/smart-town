import React, {SFC, MouseEvent, useState} from 'react';
import '../theme/style/common.scss';
import '../theme/style/components/greenHouseList.scss';
import { Table, Button, Form, Input, Space } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import EditBreed from '../pages/breed/EditBreed';

export interface Breed{
  id?: string
  name: string,
  manager?: string,
  phone?: string,
  type?: string
  volume?: number // 交易量
  quota?: number // 交易额
}

interface BreedListProps{
  pagination: false | TablePaginationConfig | undefined
  lookup?: () => void;
  data: any;
}

const BreedList: SFC<BreedListProps> = (props) => {

  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const lookupClick = (e: MouseEvent, text: string, row: Breed) => {
    console.log(e);
    console.log(text);
    console.log(row);
    props.lookup && props.lookup();
  };

  const editClick = (e: MouseEvent, text: string, row: Breed) => {
    setVisible(true);
  };

  const closeEdit = () => {
    setVisible(false);
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
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '联系方式',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '养殖种类',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '交易量',
      key: 'volume',
      dataIndex: 'volume',
    },
    {
      title: '交易额',
      key: 'quota',
      dataIndex: 'quota',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button type="dashed" onClick={e => lookupClick(e, text, record)} size="small">查看监控</Button>
          <Button type="default" onClick={e => editClick(e, text, record)} size="small">编辑</Button>
          <Button type="ghost" onClick={e => lookupClick(e, text, record)} size="small">删除</Button>
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
      <EditBreed visible={visible} onCancel={closeEdit}/>
    </div>
  );
};

BreedList.defaultProps = {
  pagination: false,
};


export default BreedList;
