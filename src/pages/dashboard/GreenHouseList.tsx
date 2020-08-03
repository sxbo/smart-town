import React, {SFC} from 'react';
import '../../theme/style/common.scss';
import { Table, Button } from 'antd';
import {ColumnsType} from 'antd/es/table/interface';

export interface GreenHouse{
  key?: string
  name: string,
  address?: string,
  monitorNum?: number
  manager: string
}

const GreenHouseList: SFC = () => {

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
      monitorNum: 3,
    },
    {
      key: '2',
      name: '2号大棚',
      manager: '陈梅',
      address: '位置2',
      monitorNum: 4,
    },
    {
      key: '3',
      name: '3号大棚',
      manager: '李龙',
      address: '位置3',
      monitorNum: 5,
    },
  ];

  return (
    <div className="card-box">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};


export default GreenHouseList;
