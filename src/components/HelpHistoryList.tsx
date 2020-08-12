import React, {SFC} from 'react';
import { Table, Button, Form, Input } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';

export interface HelpHistory{
  helpObject: string;
  belongVillage: string;
  head?: string;
  belongProject?: string,
  helpTime?: string
  status: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const HelpHistoryList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const columns: ColumnsType<HelpHistory> = [
    {
      title: '帮扶对象',
      dataIndex: 'helpObject',
      key: 'helpObject',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '所属村',
      dataIndex: 'belongVillage',
      key: 'belongVillage',
    },
    {
      title: '负责人',
      key: 'head',
      dataIndex: 'head',
    },
    {
      title: '所属项目',
      dataIndex: 'belongProject',
      key: 'belongProject',
    },
    {
      title: '帮扶时间',
      key: 'helpTime',
      dataIndex: 'helpTime',
    },
    {
      title: '当前贫困状态',
      key: 'status',
      dataIndex: 'status',
    },
  ];

  const data: HelpHistory[] = [
    {
      helpObject: '张三',
      belongVillage: '营田村',
      head: '陈梅',
      belongProject: '231扶贫项目',
      helpTime: '2019-12-30',
      status: '已脱贫',
    },
    {
      helpObject: '王五',
      belongVillage: '下幸村',
      head: '李龙',
      belongProject: '123扶贫项目',
      helpTime: '2018-12-01',
      status: '已脱贫',
    },
    {
      helpObject: '陈晨',
      belongVillage: '上幸村',
      head: '李梅',
      belongProject: '223扶贫项目',
      helpTime: '2020-08-01',
      status: '未脱贫',
    },
  ];


  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <Form
          layout="inline"
          form={form}>
          <Form.Item label="贫困对象">
            <Input placeholder="请输入贫困户名字" />
          </Form.Item>
          <Form.Item label="所属村">
            <Input placeholder="所属村" />
          </Form.Item>
          <Form.Item label="负责人">
            <Input placeholder="请输入负责人名字" />
          </Form.Item>
          <Form.Item label="所属项目">
            <Input placeholder="所属扶贫项目" />
          </Form.Item>
          <Form.Item label="帮扶时间">
            <Input placeholder="帮扶时间" />
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

HelpHistoryList.defaultProps = {
  pagination: false,
};


export default HelpHistoryList;
