/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undefined */
/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {SFC, useState, useEffect} from 'react';
import { Table, Button, Form, Input, Modal, message, Space, Select } from 'antd';
import {TablePaginationConfig} from 'antd/es/table/interface';
import {ColumnsType} from 'antd/es/table/interface';
import axios from 'axios';
import {ExclamationCircleOutlined } from '@ant-design/icons';
import {colors, epidemicTypes, filterStyle} from '../../const/const';
import EpidemicModal from './EpidemicModal';

export interface EpidemicPeople{
  id?: string;
  name: string;
  village: string;
  idCard?: string;
  createTime?: string
  state: any
  sexType: string;
}

export enum EpidmicMode{
  create,
  edit
}

interface GreenHouseListProps{
  pagination: false | TablePaginationConfig | undefined
  count: (diagnose: any, cure: any, separate: any, asymptomatic: any) => void;
}

const EpidemicList: SFC<GreenHouseListProps> = (props) => {

  const [form] = Form.useForm();
  const [epidemics, setEpidemics] = useState<EpidemicPeople[]>([]);
  const [modalTitle, setModalTitle] = useState('新增景区');
  const [modalMode, setModalMode] = useState<EpidmicMode>(EpidmicMode.create);
  const [epidmic, setEpidmic] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const getEpidemics = (url: string = 'api/epidemicSurveillance') => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const data: EpidemicPeople[] = res.data.data || [];
        let diagnose: any = 0;
        let cure: any = 0;
        let separate: any = 0;
        let asymptomatic: any = 0;
        data.map(item => {
          if (item.state == 1){
            diagnose++;
          } else if (item.state == 2) {
            cure++;
          } else if (item.state == 3) {
            separate++;
          } else {
            asymptomatic++;
          }
        });
        props.count(diagnose, cure, separate, asymptomatic);
        setEpidemics(data);
      } else {
        setEpidemics([]);
      }
    }).catch(() => {
      setEpidemics([]);
    });
  };

  useEffect(() => {
    getEpidemics('api/epidemicSurveillance');
  }, []);


  const searchClicked = () => {
    const value: any = form.getFieldsValue(['name', 'idCard', 'state']);
    const url = `api/findByEpidemicSurveillanceList?name=${value.name || ''}&idCard=${value.idCard || ''}&state=${value.state || ''}`;
    getEpidemics(url);
  };

  const createClicked = () => {
    openModal('新增登记', EpidmicMode.create);
    setEpidmic(undefined);
  };

  const editClicked = (text: string, record: EpidemicPeople) => {
    openModal('编辑登记', EpidmicMode.edit);
    setEpidmic(record);
  };

  const openModal = (title: any, mode: EpidmicMode) => {
    setModalVisible(true);
    setModalTitle(title);
    setModalMode(mode);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const refreshList = () => {
    getEpidemics();
  };

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
        const type = epidemicTypes.find(item => item.type == code);
        return type?.label || '确诊';
      },
    },
    {
      title: '操作',
      key: 'option',
      render: (text: any, record: any) => {
        return <Space>
          <Button size="small" onClick={e => editClicked(text, record)}>编辑</Button>
          <Button size="small" style={{color: colors.danger}} onClick={e => deleteClicked(text, record)}>删除</Button>
        </Space>;
      },
    },
  ];

  return (
    <div className="card-box green-house-list">
      {props.pagination ?
        <div style={filterStyle}>
          <Form
            layout="inline"
            form={form}>
            <Form.Item label="姓名" name="name">
              <Input allowClear size="small" placeholder="姓名" />
            </Form.Item>
            <Form.Item label="身份证号" name="idCard">
              <Input allowClear size="small" placeholder="身份证号" />
            </Form.Item>
            <Form.Item label="状态" name="state">
              <Select allowClear size="small" style={{minWidth:'180px'}}>
                {
                  epidemicTypes.map(type => <Select.Option key={`${type.type}`} value={type.type}>{type.label}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button size="small" value="horizontal" onClick={searchClicked}>查询</Button>
            </Form.Item>
          </Form>
          <Button size="small" type="primary" onClick={createClicked}>新增登记</Button>
        </div> : ''
      }
      <Table
        columns={columns}
        dataSource={epidemics}
        pagination={props.pagination}
        rowKey="id"
        size="small"
      />
      {
        modalVisible && <EpidemicModal refreshList={refreshList} close={closeModal} title={modalTitle} mode={modalMode} visible={modalVisible} epidmic={epidmic}/>
      }
    </div>
  );
};

EpidemicList.defaultProps = {
  pagination: false,
};


export default EpidemicList;
