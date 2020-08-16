import React, {SFC, MouseEvent} from 'react';
import '../theme/style/common.scss';
import '../theme/style/components/greenHouseList.scss';
import { Table, Button, Form, Input } from 'antd';
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
  lookup?: () => void;
  data: any;
}

const GreenHouseList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const lookupClick = (e: MouseEvent, text: string, row: GreenHouse) => {
    console.log(e);
    console.log(text);
    console.log(row);
    props.lookup && props.lookup();
  };

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
        <Button type="ghost" onClick={e => lookupClick(e, text, record)} size="middle">查看</Button>
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
