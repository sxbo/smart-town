/* eslint-disable no-undefined */
/* eslint-disable eqeqeq */
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
import HelpHistoryModal from './HelpHistoryModal';

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

export enum HelpHistoryMode{
  create,
  edit
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
}

const HelpHistoryList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();
  const [helpPoorRecords, setRecords] = useState<HelpHistory[]>([]);
  const [modalTitle, setModalTitle] = useState('新增记录');
  const [modalMode, setModalMode] = useState<HelpHistoryMode>(HelpHistoryMode.create);
  const [helpHistory, setHelpHistory] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);


  const createClicked = () => {
    openModal('新增记录', HelpHistoryMode.create);
    setHelpHistory(undefined);
  };

  const searchClicked = () => {
    const value: any = form.getFieldsValue(['helpObj', 'personCharge']);
    const url = `api/findByPovertyAlleviationRecordHistoryList?helpObj=${value.helpObj || ''}&personCharge=${value.personCharge || ''}`;
    getRecords(url);
  };

  const editClicked = (text: string, record: HelpHistory) => {
    openModal('编辑记录', HelpHistoryMode.edit);
    setHelpHistory(record);
  };

  const openModal = (title: any, mode: HelpHistoryMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const getRecords = (url: string = 'api/povertyAlleviationRecord') => {
    axios({
      method: 'GET',
      url: url,
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
      title: '脱贫年度',
      key: 'poorYear',
      dataIndex: 'poorYear',
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
      render: (text: any, record: any) => (
        <Space>
          <Button size="small" onClick={e => editClicked(text, record)}>编辑</Button>
          <Button size="small" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>
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
            <Form.Item label="贫困对象" name="helpObj">
              <Input allowClear size="small" placeholder="请输入贫困户名字" />
            </Form.Item>
            <Form.Item label="负责人" name="personCharge">
              <Input allowClear size="small" placeholder="请输入负责人名字" />
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
        dataSource={helpPoorRecords}
        pagination={{...props.pagination, total: helpPoorRecords.length, showTotal: total => `共 ${total} 条`}}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <HelpHistoryModal refreshList={getRecords} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} helpHistory={helpHistory}/>
      }
    </div>
  );
};

HelpHistoryList.defaultProps = {
  pagination: false,
};

export default HelpHistoryList;
