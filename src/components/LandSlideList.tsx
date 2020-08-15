import React, {SFC} from 'react';
import { Table, Button, Form, Input } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';

export interface LandSlide{
  monitorAddress: string; // 监控点
  monitor: number; // 监控数目
  charge?: string; // 负责人
  contact?: string; // 负责人联系方式
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const LandSlideList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();

  const columns: ColumnsType<LandSlide> = [
    {
      title: '山体点',
      dataIndex: 'monitorAddress',
      key: 'monitorAddress',
    },
    {
      title: '监控数目',
      key: 'monitor',
      dataIndex: 'monitor',
    },
    {
      title: '负责人',
      dataIndex: 'charge',
      key: 'charge',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="ghost" size="middle">查看</Button>
      ),
    },
  ];

  const data: LandSlide[] = [
    {
      monitorAddress: '营田村营田山',
      charge: '陈龙',
      monitor: 3,
      contact: '13888888888',
    },
    {
      monitorAddress: '上幸村上幸山盘山路',
      charge: '李梅',
      monitor: 5,
      contact: '13888888888',
    },
    {
      monitorAddress: '莆田村莆田山鞍山路',
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
          <Form.Item label="山体点">
            <Input placeholder="山体点" />
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

LandSlideList.defaultProps = {
  pagination: false,
};


export default LandSlideList;
