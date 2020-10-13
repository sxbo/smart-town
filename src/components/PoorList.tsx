/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import axios from 'axios';
import {colors} from '../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';

export interface PoorPeople{
  id?: string;
  name: string;
  village: string;
  idCard?: string;
  outputValue?: string
  phone: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const PoorList: SFC<GreenHouseListProps> = (props) => {

  const [poors, setPoors] = useState<PoorPeople[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getPoors();
  }, []);

  const getPoors = () => {
    axios({
      method: 'GET',
      url: 'api/poor',
    }).then((res) => {
      if (res.data.status === 200){
        const data: PoorPeople[] = res.data.data || [];
        setPoors(data);
      } else {
        setPoors([]);
      }
    }).catch(() => {
      setPoors([]);
    });
  };

  const deleteClicked = (text: string, row: PoorPeople) => {
    const id = row.id;
    Modal.confirm({
      title: '删除贫困户数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/poor/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getPoors();
          } else {
            message.error('操作失败');
          }
        });
      },
    });
  };

  const columns: ColumnsType<PoorPeople> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '身份证',
      key: 'idCard',
      dataIndex: 'idCard',
    },
    {
      title: '所属村',
      dataIndex: 'village',
      key: 'village',
    },
    {
      title: '人均收入',
      dataIndex: 'outputValue',
      key: 'outputValue',
    },
    {
      title: '联系方式',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      key: 'option',
      render: (text: any, record: any) => {
        return <Button size="middle"type="ghost" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>;
      },
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
        dataSource={poors}
        pagination={props.pagination}
      />
    </div>
  );
};

PoorList.defaultProps = {
  pagination: false,
};


export default PoorList;
