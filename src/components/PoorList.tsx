import React, {SFC} from 'react';
import { Table, Button, Form, Input } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';

export interface PoorPeople{
  name: string;
  belongVillage: string;
  idNum?: string;
  perIncome?: string
  contact: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const PoorList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const columns: ColumnsType<PoorPeople> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '身份证',
      key: 'idNum',
      dataIndex: 'idNum',
    },
    {
      title: '所属村',
      dataIndex: 'belongVillage',
      key: 'belongVillage',
    },
    {
      title: '人均收入',
      dataIndex: 'perIncome',
      key: 'perIncome',
    },
    {
      title: '联系方式',
      key: 'contact',
      dataIndex: 'contact',
    },
  ];

  const data: PoorPeople[] = [
    {
      name: '张三',
      belongVillage: '营田村',
      idNum: '12348967623612234442',
      perIncome: '5000',
      contact: '13888888888',
    },
    {
      name: '王五',
      belongVillage: '下幸村',
      idNum: '61272378766761179900',
      perIncome: '10000',
      contact: '136666666666',
    },
    {
      name: '陈晨',
      belongVillage: '上幸村',
      idNum: '61270238897877866126',
      perIncome: '8000',
      contact: '139000000000',
    },
  ];


  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <Form
          layout="inline"
          form={form}>
          <Form.Item label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="所属村">
            <Input placeholder="所属村" />
          </Form.Item>
          <Form.Item label="身份证号">
            <Input placeholder="请输入身份证号" />
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

PoorList.defaultProps = {
  pagination: false,
};


export default PoorList;
