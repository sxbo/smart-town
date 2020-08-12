import React, {SFC} from 'react';
import { Table, Button, Form, Input } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';

export interface EpidemicPeople{
  name: string;
  belongVillage: string;
  idNum?: string;
  recordTime?: string
  status: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const EpidemicList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const columns: ColumnsType<EpidemicPeople> = [
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
      title: '登记时间',
      dataIndex: 'recordTime',
      key: 'recordTime',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
    },
  ];

  const data: EpidemicPeople[] = [
    {
      name: '张三',
      belongVillage: '营田村',
      idNum: '12348967623612234442',
      recordTime: '2019-02-19',
      status: '已确诊',
    },
    {
      name: '王五',
      belongVillage: '下幸村',
      idNum: '61272378766761179900',
      recordTime: '2019-03-22',
      status: '隔离中',
    },
    {
      name: '陈晨',
      belongVillage: '上幸村',
      idNum: '61270238897877866126',
      recordTime: '2019-01-20',
      status: '治愈',
    },
    {
      name: '张三',
      belongVillage: '营田村',
      idNum: '12348967623612234442',
      recordTime: '2019-02-19',
      status: '已确诊',
    },
    {
      name: '王五',
      belongVillage: '下幸村',
      idNum: '61272378766761179900',
      recordTime: '2019-03-22',
      status: '隔离中',
    },
    {
      name: '陈晨',
      belongVillage: '上幸村',
      idNum: '61270238897877866126',
      recordTime: '2019-01-20',
      status: '治愈',
    },
  ];


  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <Form
          layout="inline"
          form={form}>
          <Form.Item label="姓名">
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item label="所属村">
            <Input placeholder="所属村" />
          </Form.Item>
          <Form.Item label="身份证号">
            <Input placeholder="身份证号" />
          </Form.Item>
          <Form.Item label="登记时间">
            <Input placeholder="登记时间" />
          </Form.Item>
          <Form.Item label="状态">
            <Input placeholder="状态" />
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

EpidemicList.defaultProps = {
  pagination: false,
};


export default EpidemicList;
