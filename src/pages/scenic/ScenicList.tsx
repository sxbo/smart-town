/* eslint-disable no-undefined */
/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message, Space } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import axios from 'axios';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import {colors, filterStyle} from '../../const/const';
import ScenicModal from './ScenicModal';

export interface Scenic{
  id: string;
  scenicspotName: string;
  address: string;
  personCharge?: string; // 负责人
  personPhone?: string;
  alarmNum: number;
}

export enum ScenicMode{
  create,
  edit
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const ScenicList: SFC<GreenHouseListProps> = (props) => {
  const [form] = Form.useForm();
  const [scenics, setScenics] = useState<Scenic[]>([]);
  const [modalTitle, setModalTitle] = useState('新增景区');
  const [modalMode, setModalMode] = useState<ScenicMode>(ScenicMode.create);
  const [scenic, setScenic] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getScenics('api/scenicSpot');
  }, []);

  const getScenics = (url: string = 'api/scenicSpot') => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const data: Scenic[] = res.data.data || [];
        setScenics(data);
      } else {
        setScenics([]);
      }
    }).catch(() => {
      setScenics([]);
    });
  };

  const searchClicked = () => {
    const value: any = form.getFieldsValue(['scenicspotName', 'address', 'personCharge']);
    const url = `api/findByScenicSpotList?scenicspotName=${value.scenicspotName || ''}&address=${value.address || ''}&personCharge=${value.personCharge || ''}`;
    getScenics(url);
  };

  const createClicked = () => {
    openModal('新增景区', ScenicMode.create);
    setScenic(undefined);
  };

  const editClicked = (text: string, record: Scenic) => {
    openModal('编辑景区', ScenicMode.edit);
    setScenic(record);
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
        <Space>
          <Button size="small" onClick={e => editClicked(text, record)}>编辑</Button>
          <Button size="small" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>
        </Space>
      ),
    },
  ];

  const openModal = (title: any, mode: ScenicMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <div style={filterStyle}>
          <Form
            layout="inline"
            form={form}>
            <Form.Item label="景区名称" name="scenicspotName">
              <Input allowClear size="small" placeholder="景区名称" />
            </Form.Item>
            <Form.Item label="景区地址" name="address">
              <Input allowClear size="small" placeholder="景区地址" />
            </Form.Item>
            <Form.Item label="负责人" name="personCharge">
              <Input allowClear size="small" placeholder="负责人" />
            </Form.Item>
            <Form.Item>
              <Button size="small" value="horizontal" onClick={searchClicked}>查询</Button>
            </Form.Item>
          </Form>
          <Button type="primary" size="small" onClick={createClicked}>新增</Button>
        </div> : ''
      }
      <Table
        columns={columns}
        dataSource={scenics}
        pagination={props.pagination}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <ScenicModal refreshList={getScenics} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} scenic={scenic}/>
      }
      </div>
  );
};

ScenicList.defaultProps = {
  pagination: false,
};


export default ScenicList;
