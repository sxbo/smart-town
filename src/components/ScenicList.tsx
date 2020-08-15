import React, {SFC} from 'react';
import { Table, Button, Form, Input } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';

export interface Scenic{
  name: string;
  address: string;
  charge?: string; // 负责人
  contact?: string;
  monitor: number;
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const ScenicList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const columns: ColumnsType<Scenic> = [
    {
      title: '景区名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '景区地址',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: '景区负责人',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '监控数目',
      key: 'monitor',
      dataIndex: 'monitor',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="ghost" size="middle">查看</Button>
      ),
    },
  ];

  const data: Scenic[] = [
    {
      name: '营田景区',
      address: '营田村',
      charge: '陈龙',
      monitor: 3,
      contact: '13888888888',
    },
    {
      name: '上幸村景区',
      address: '上幸村',
      charge: '李梅',
      monitor: 5,
      contact: '13888888888',
    },
    {
      name: '莆田景点',
      address: '营田村',
      charge: '万阳',
      monitor: 3,
      contact: '13888888888',
    },
  ];


  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <Form
          layout="inline"
          form={form}>
          <Form.Item label="景区名称">
            <Input placeholder="景区名称" />
          </Form.Item>
          <Form.Item label="景区地址">
            <Input placeholder="景区地址" />
          </Form.Item>
          <Form.Item label="负责人">
            <Input placeholder="负责人" />
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

ScenicList.defaultProps = {
  pagination: false,
};


export default ScenicList;
