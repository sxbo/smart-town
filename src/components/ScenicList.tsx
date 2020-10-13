/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import axios from 'axios';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import {colors} from '../const/const';

export interface Scenic{
  id: string;
  scenicspotName: string;
  address: string;
  personCharge?: string; // 负责人
  personPhone?: string;
  alarmNum: number;
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const ScenicList: SFC<GreenHouseListProps> = (props) => {
  const [form] = Form.useForm();
  const [scenics, setScenic] = useState<Scenic[]>([]);

  useEffect(() => {
    getScenics();
  }, []);

  const getScenics = () => {
    axios({
      method: 'GET',
      url: 'api/scenicSpot',
    }).then((res) => {
      if (res.data.status === 200){
        const data: Scenic[] = res.data.data || [];
        setScenic(data);
      } else {
        setScenic([]);
      }
    }).catch(() => {
      setScenic([]);
    });
  };

  const deleteClicked = (text: string, row: Scenic) => {
    const id = row.id;
    Modal.confirm({
      title: '删除景点数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/scenicSpot/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getScenics();
          } else {
            message.error('操作失败');
          }
        });
      },
    });
  };

  const columns: ColumnsType<Scenic> = [
    {
      title: '景区名称',
      dataIndex: 'scenicspotName',
      key: 'scenicspotName',
    },
    {
      title: '景区地址',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: '景区负责人',
      dataIndex: 'personCharge',
      key: 'personCharge',
    },
    {
      title: '联系方式',
      dataIndex: 'personPhone',
      key: 'personPhone',
    },
    {
      title: '告警数',
      key: 'alarmNum',
      dataIndex: 'alarmNum',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Button size="middle" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>
      ),
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
        dataSource={scenics}
        pagination={props.pagination}
      />
    </div>
  );
};

ScenicList.defaultProps = {
  pagination: false,
};


export default ScenicList;
