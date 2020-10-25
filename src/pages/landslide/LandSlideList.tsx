/* eslint-disable no-undefined */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message, Space} from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import {colors, filterStyle} from '../../const/const';
import axios from 'axios';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import LandSlidModal from './LandSlidModal';

export interface LandSlide{
  id?: string;
  address: string; // 监控点
  alarmNum: number; // 监控数目
  personCharge?: string; // 负责人
  phone?: string; // 负责人联系方式
}

export enum lanSlideMode{
  create,
  edit
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const LandSlideList: SFC<GreenHouseListProps> = (props) => {
  const [lanSlides, setLanSlides] = useState<LandSlide[]>([]);
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState('新增滑坡点');
  const [modalMode, setModalMode] = useState<lanSlideMode>(lanSlideMode.create);
  const [lanSlide, setlanSlide] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const getLanSlides = () => {
    axios({
      method: 'GET',
      url: 'api/landslide',
    }).then((res) => {
      if (res.data.status === 200){
        const data: LandSlide[] = res.data.data || [];
        setLanSlides(data);
      } else {
        setLanSlides([]);
      }
    }).catch(() => {
      setLanSlides([]);
    });
  };

  useEffect(() => {
    getLanSlides();
  }, []);

  const createClicked = () => {
    openModal('新增滑坡点', lanSlideMode.create);
    setlanSlide(undefined);
  };

  const editClicked = (text: string, record: LandSlide) => {
    openModal('编辑滑坡点', lanSlideMode.edit);
    setlanSlide(record);
  };

  const openModal = (title: any, mode: lanSlideMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const deleteClicked = (text: string, row: LandSlide) => {
    const id = row.id;
    Modal.confirm({
      title: '删除山体滑坡数据',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/landslide/${id}`,
        }).then((res) => {
          if (res.data.status === 200){
            getLanSlides();
          } else {
            message.error('操作失败');
          }
        });
      },
    });
  };

  const columns: ColumnsType<LandSlide> = [
    {
      title: '山体点',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '负责人',
      dataIndex: 'personCharge',
      key: 'personCharge',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
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
          <Button size="middle" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>
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
            <Form.Item label="山体点">
              <Input size="small" placeholder="山体点" />
            </Form.Item>
            <Form.Item label="负责人">
              <Input size="small" placeholder="负责人" />
            </Form.Item>
            <Form.Item name="layout">
              <Button size="small" value="horizontal">查询</Button>
              <Button size="small" value="vertical">重置</Button>
            </Form.Item>
          </Form>
          <Button size="small" type="primary" onClick={createClicked}>新增</Button>
        </div> : ''
      }
      <Table
        columns={columns}
        dataSource={lanSlides}
        pagination={props.pagination}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <LandSlidModal refreshList={getLanSlides} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} lanSlide={lanSlide}/>
      }
    </div>
  );
};

LandSlideList.defaultProps = {
  pagination: false,
};


export default LandSlideList;
