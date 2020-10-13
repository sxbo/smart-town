/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import axios from 'axios';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import {colors} from '../const/const';

export interface EpidemicPeople{
  id?: string;
  name: string;
  village: string;
  idCard?: string;
  createTime?: string
  state: string
  sexType: string;
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const EpidemicList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();
  const [epidemics, setEpidemics] = useState<EpidemicPeople[]>([]);

  const getEpidemics = () => {
    axios({
      method: 'GET',
      url: 'api/epidemicSurveillance',
    }).then((res) => {
      if (res.data.status === 200){
        const data: EpidemicPeople[] = res.data.data || [];
        setEpidemics(data);
      } else {
        setEpidemics([]);
      }
    }).catch(() => {
      setEpidemics([]);
    });
  };

  useEffect(() => {
    getEpidemics();
  }, []);

  const deleteClicked = (text: string, row: EpidemicPeople) => {
    const id = row.id;
    Modal.confirm({
      title: '删除疫情防控数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/epidemicSurveillance/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getEpidemics();
          } else {
            message.error('操作失败');
          }
        });
      },
    });
  };
  const columns: ColumnsType<EpidemicPeople> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sexType',
      key: 'sexType',
      render: (code: any) => {
        if (code == 1){
          return '男';
        } else {
          return '女';
        }
      },
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
      title: '登记时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      render: (code: any) => {
        if (code == '1') {
          return '确诊';
        } else if (code == '2'){
          return '治愈';
        } else if (code == '3'){
          return '隔离';
        } else {
          return '无症状';
        }
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
        dataSource={epidemics}
        pagination={props.pagination}
        rowKey="id"
      />
    </div>
  );
};

EpidemicList.defaultProps = {
  pagination: false,
};


export default EpidemicList;
