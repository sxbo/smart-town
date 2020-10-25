/* eslint-disable no-unused-vars */
/* eslint-disable no-undefined */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC, MouseEvent, useState, useEffect} from 'react';
import '../../theme/style/common.scss';
import '../../theme/style/components/greenHouseList.scss';
import { Table, Button, Form, Input, Space, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import {colors, filterStyle} from '../../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import GreenHouseModal from './GreenHouseModal';

export interface GreenHouse{
  id?: number;
  name: string,
  address?: string,
  type?: string,
  monitorNum?: number
  manage: string
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

export enum GreenHouseMode{
  create,
  edit
}

const GreenHouseList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();
  const [greehouseData, setgreehouseData] = useState([]);
  const [modalTitle, setModalTitle] = useState('新增景区');
  const [modalMode, setModalMode] = useState<GreenHouseMode>(GreenHouseMode.create);
  const [greenHouse, setgreenHouse] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getGreenhouses();
  }, []);

  const getGreenhouses = () => {
    axios({
      method: 'GET',
      url: 'api/greenhouse',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        setgreehouseData(data);
      } else {
        setgreehouseData([]);
      }
    }).catch(() => {
      setgreehouseData([]);
    });
  };

  const createClicked = () => {
    openModal('新增', GreenHouseMode.create);
    setgreenHouse(undefined);
  };

  const editClicked = (text: string, record: GreenHouse) => {
    openModal('编辑', GreenHouseMode.edit);
    setgreenHouse(record);
  };

  const openModal = (title: any, mode: GreenHouseMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const deleteClicked = (e: MouseEvent, text: string, row: GreenHouse) => {
    const id = row.id;
    Modal.confirm({
      title: '删除大棚数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/greenhouse/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getGreenhouses();
          } else {
            message.error('删除失败');
          }
        });
      },
    });
  };

  const columns: ColumnsType<GreenHouse> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '种类',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '管理者',
      dataIndex: 'manage',
      key: 'manage',
    },
    {
      title: '告警次数',
      key: 'monitorNum',
      dataIndex: 'monitorNum',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button size="small" onClick={e => editClicked(text, record)}>编辑</Button>
          <Button size="small" type="ghost" style={{color: colors.danger}} onClick={e => deleteClicked(e, text, record)}>删除</Button>
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
            <Form.Item label="名称">
              <Input size="small" placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="地址">
              <Input size="small" placeholder="请输入地址" />
            </Form.Item>
            <Form.Item label="管理者">
              <Input size="small" placeholder="请输入管理者" />
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
        dataSource={greehouseData}
        pagination={props.pagination}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <GreenHouseModal refreshList={getGreenhouses} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} greenHouse={greenHouse}/>
      }
    </div>
  );
};

GreenHouseList.defaultProps = {
  pagination: false,
};


export default GreenHouseList;
