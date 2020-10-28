/* eslint-disable radix */
/* eslint-disable no-undefined */
/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {SFC, MouseEvent, useState, useEffect} from 'react';
import '../../theme/style/common.scss';
import '../../theme/style/components/greenHouseList.scss';
import { Table, Button, Form, Input, Space, Modal, message } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import {colors, filterStyle} from '../../const/const';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import BreedModal from './BreedModal';

export interface Breed{
  id?: string
  name: string,
  manage?: string,
  phone?: string,
  breedingSpecies?: string
  tradingVolume?: number // 交易量
  turnover?: number // 交易额
}

export enum BreedMode{
  create,
  edit
}

interface BreedListProps{
  pagination: false | TablePaginationConfig | undefined
}

const BreedList: SFC<BreedListProps> = (props) => {

  const [form] = Form.useForm();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [modalTitle, setModalTitle] = useState('新增养殖场');
  const [modalMode, setModalMode] = useState<BreedMode>(BreedMode.create);
  const [breed, setBreed] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);


  const createClicked = () => {
    openModal('新增养殖场', BreedMode.create);
    setBreed(undefined);
  };

  const searchClicked = () => {
    const value: any = form.getFieldsValue(['name', 'breedingSpecies', 'manage']);
    const url = `api/findByBreedList?name=${value.name || ''}&breedingSpecies=${value.breedingSpecies || ''}&manage=${value.manage || ''}`;
    getBreeds(url);
  };

  const editClicked = (text: string, record: any) => {
    openModal('编辑养殖场', BreedMode.edit);
    record.tradingVolume = parseInt(record.tradingVolume);
    if (!record.tradingVolume){
      record.tradingVolume = 0;
    }
    record.turnover = parseInt(record.turnover);
    if (!record.turnover){
      record.turnover = 0;
    }
    setBreed(record);
  };

  const openModal = (title: any, mode: BreedMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    getBreeds('api/breed');
  }, []);

  const getBreeds = (url: string = 'api/breed') => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const data: Breed[] = res.data.data || [];
        setBreeds(data);
      } else {
        setBreeds([]);
      }
    }).catch(() => {
      setBreeds([]);
    });
  };


  const deleteClicked = (e: MouseEvent, text: string, row: Breed) => {
    const id = row.id;
    Modal.confirm({
      title: '删除养殖数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/breed/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getBreeds();
          } else {
            message.error('操作失败');
          }
        });
      },
    });

  };

  const columns: ColumnsType<Breed> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '管理者',
      dataIndex: 'manage',
      key: 'manage',
    },
    {
      title: '联系方式',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '养殖种类',
      dataIndex: 'breedingSpecies',
      key: 'breedingSpecies',
    },
    {
      title: '交易量',
      key: 'tradingVolume',
      dataIndex: 'tradingVolume',
    },
    {
      title: '交易额',
      key: 'turnover',
      dataIndex: 'turnover',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button size="small" onClick={e => editClicked(text, record)}>编辑</Button>
          <Button style={{color: colors.danger}} onClick={e => deleteClicked(e, text, record)} size="small">删除</Button>
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
            <Form.Item label="名称" name="name">
              <Input allowClear size="small" placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="养殖种类" name="breedingSpecies">
              <Input allowClear size="small" placeholder="请输入养殖种类" />
            </Form.Item>
            <Form.Item label="管理者" name="manage">
              <Input allowClear size="small" placeholder="请输入管理者" />
            </Form.Item>
            <Form.Item>
              <Button size="small" value="horizontal" onClick={searchClicked}>查询</Button>
            </Form.Item>
          </Form>
          <Button size="small" type="primary" onClick={createClicked}>新增</Button>
        </div> : ''
      }
      <Table
        columns={columns}
        dataSource={breeds}
        pagination={props.pagination}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <BreedModal refreshList={getBreeds} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} breed={breed}/>
      }
    </div>
  );
};

BreedList.defaultProps = {
  pagination: false,
};


export default BreedList;
