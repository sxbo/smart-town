/* eslint-disable eqeqeq */
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

export interface HelpHistory{
  id?: number;
  helpObj: string;
  village: string;
  personCharge: string; // 负责人
  helpProject?: string; // 帮扶项目
  createTime?: string; // 帮扶时间
  poorState?: string; // 贫困状态
  helpNum: string; // 帮扶数量
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const HelpHistoryList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();
  const [helpPoorRecords, setRecords] = useState<HelpHistory[]>([]);


  const getRecords = () => {
    axios({
      method: 'GET',
      url: 'api/povertyAlleviationRecord',
    }).then((res) => {
      if (res.data.status === 200){
        const data: HelpHistory[] = res.data.data || [];
        setRecords(data);
      } else {
        setRecords([]);
      }
    }).catch(() => {
      setRecords([]);
    });
  };

  useEffect(() => {
    getRecords();
  }, []);

  const deleteClicked = (text: string, row: HelpHistory) => {
    const id = row.id;
    Modal.confirm({
      title: '删除扶贫记录',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/povertyAlleviationRecord/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getRecords();
          } else {
            message.error('操作失败');
          }
        });
      },
    });
  };

  const columns: ColumnsType<HelpHistory> = [
    {
      title: '帮扶对象',
      dataIndex: 'helpObj',
      key: 'helpObj',
    },
    {
      title: '所属村',
      dataIndex: 'village',
      key: 'village',
    },
    {
      title: '负责人',
      key: 'personCharge',
      dataIndex: 'personCharge',
    },
    {
      title: '所属项目',
      dataIndex: 'helpProject',
      key: 'helpProject',
    },
    {
      title: '帮扶时间',
      key: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: '当前贫困状态',
      key: 'poorState',
      dataIndex: 'poorState',
      render: (text: any) => {
        return text == '1' ? '已脱贫' : '未脱贫';
      },
    },
    {
      title: '操作',
      key: 'option',
      render: (text: any, record: any) => {
        return <Button size="middle" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>;
      },
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
        dataSource={helpPoorRecords}
        pagination={props.pagination}
      />
    </div>
  );
};

HelpHistoryList.defaultProps = {
  pagination: false,
};

export default HelpHistoryList;
