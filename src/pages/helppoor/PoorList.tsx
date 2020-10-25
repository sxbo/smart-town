/* eslint-disable no-undefined */
/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message, Space } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import axios from 'axios';
import {colors, filterStyle} from '../../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import PoorModal from './PoorModal';

export interface PoorPeople{
  id?: string;
  name: string;
  village: string;
  idCard?: string;
  outputValue?: string
  phone: string
}

export enum PoorMode {
  create,
  edit
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const PoorList: SFC<GreenHouseListProps> = (props) => {

  const [poors, setPoors] = useState<PoorPeople[]>([]);
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState('新增贫困户登记');
  const [modalMode, setModalMode] = useState<PoorMode>(PoorMode.create);
  const [poor, setPoor] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getPoors();
  }, []);


  const createClicked = () => {
    openModal('贫困户登记', PoorMode.create);
    setPoor(undefined);
  };

  const editClicked = (text: string, record: PoorPeople) => {
    openModal('编辑登记', PoorMode.edit);
    setPoor(record);
  };

  const openModal = (title: any, mode: PoorMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
      render: (text: any, record: any) => (
        <Space>
          <Button size="small" onClick={e => editClicked(text, record)}>编辑</Button>
          <Button size="small" type="ghost" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>
        </Space>
      ),
    },
  ];


  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <div style={filterStyle}>
          <Form
            layout="inline"
            form={form}>
            <Form.Item label="姓名">
              <Input size="small" placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item label="所属村">
              <Input size="small" placeholder="所属村" />
            </Form.Item>
            <Form.Item label="身份证号">
              <Input size="small" placeholder="请输入身份证号" />
            </Form.Item>
            <Form.Item>
              <Button size="small" value="horizontal">查询</Button>
              <Button size="small" value="vertical">重置</Button>
            </Form.Item>
          </Form>
          <Button size="small" type="primary" onClick={createClicked}>新增</Button>
        </div> : ''
      }
      <Table
        columns={columns}
        dataSource={poors}
        pagination={props.pagination}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <PoorModal refreshList={getPoors} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} poor={poor}/>
      }
    </div>
  );
};

PoorList.defaultProps = {
  pagination: false,
};


export default PoorList;
