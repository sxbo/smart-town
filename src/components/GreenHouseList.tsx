import React, {SFC} from 'react';
import '../theme/style/common.scss';
import { Table, Button, Form, Input, Radio } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';

export interface GreenHouse{
  key?: string
  name: string,
  address?: string,
  alarmNum?: number,
  monitorNum?: number
  manager: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const GreenHouseList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const columns: ColumnsType<GreenHouse> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '告警次数',
      key: 'alarmNum',
      dataIndex: 'alarmNum',
    },
    {
      title: '管理者',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '监控点位',
      key: 'monitorNum',
      dataIndex: 'monitorNum',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button type="ghost" size="middle">查看</Button>
      ),
    },
  ];

  const data: GreenHouse[] = [
    {
      key: '1',
      name: '1号大棚',
      manager: '李龙',
      address: '位置1',
      alarmNum: 5,
      monitorNum: 3,
    },
    {
      key: '2',
      name: '2号大棚',
      manager: '陈梅',
      address: '位置2',
      alarmNum: 10,
      monitorNum: 4,
    },
    {
      key: '3',
      name: '3号大棚',
      manager: '李龙',
      address: '位置3',
      alarmNum: 1,
      monitorNum: 5,
    },
  ];


  return (
    <div className="card-box">
      {props.pagination ?
        <Form
          layout="inline"
          form={form}>
          <Form.Item label="名称">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="地址">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="管理者">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item name="layout">
            <Radio.Group>
              <Radio.Button value="horizontal">查询</Radio.Button>
              <Radio.Button value="vertical">重置</Radio.Button>
            </Radio.Group>
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
