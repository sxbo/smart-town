/* eslint-disable no-magic-numbers */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-after-var */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import PageTitle from '../../components/PageTitle';
import {Form, Input, Button, Table, Space, message, Modal} from 'antd';
import {colors} from '../../const/const';
import '../../theme/style/landCirculation/layout.scss';
import '../../theme/style/common.scss';
import { FormInstance } from 'antd/lib/form/Form';
import axios from 'axios';
import LandCirulationModal from './LandCirulationModal';

export enum LandCirculationMode{
  create,
  edit
}

export default class LandCirculation extends Component{
    formRef: React.RefObject<FormInstance>;

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef<FormInstance>();
    }

    state = {
        landCirculatio: [],
        mode: LandCirculationMode.create,
        land: '',
        modalVisble: false,
        title: '新增登记',
    }

    componentDidMount(){
      this.getLandCirculations();
    }

    getLandCirculations = (url = 'api/landCirculation') => {
      axios({
        method: 'GET',
        url: url,
      }).then((res) => {
        if (res.data.status === 200){
          const landCirculations = res.data?.data || [];
          this.setState({
            landCirculatio: landCirculations,
          });
        }
      }).catch(() => {
        this.setState({
          landCirculatio: [],
        });
      });
    }

    closeModal = () => {
      this.setState({
        modalVisble: false,
      });
    }

    deleteLandCirculation = (record: any) => {
      const id = record.id;
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        title: '删除土地流转记录',
        content: '确认删除？',
        okButtonProps: {size: 'small'},
        cancelButtonProps: {size: 'small'},
        onOk: () => {
          axios({
            method: 'DELETE',
            url: `api/landCirculation/${id}`,
          }).then((res) => {
            if (res.data.status === 200){
              this.getLandCirculations();
            }
          }).catch(() => {
            message.error('删除失败');
          });
      }});
    }


    searchClicked = () => {
      const fields: any = this.formRef.current?.getFieldsValue(['outflowSide', 'inflowSide', 'location']);
      const url = `api/filterLandCirculation?outflowSide=${fields.outflowSide || ''}&inflowSide=${fields.inflowSide || ''}&location=${fields.location || ''}`;
      this.getLandCirculations(url);
    }

    createdClicked = () => {
      this.setState({
        modalVisble: true,
        mode: LandCirculationMode.create,
        title: '新增登记',
        land: '',
      });
    }

    editClicked = (record: any) => {
      this.setState({
        modalVisble: true,
        mode: LandCirculationMode.edit,
        title: '编辑登记',
        land: record,
      });
    }

    getColumns = () => {
        return [
            {
                title: '流出方',
                dataIndex: 'outflowSide',
                key: 'outflowSide',
              },
              {
                title: '流入方',
                dataIndex: 'inflowSide',
                key: 'inflowSide',
              },
              {
                title: '位置',
                dataIndex: 'location',
                key: 'location',
              },
              {
                title: '流转面积/用途',
                dataIndex: 'landAreaName',
                key: 'landAreaName',
              },
              {
                title: '流转周期',
                dataIndex: 'circulationPeriod',
                key: 'circulationPeriod',
              },
              {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                  <Space>
                    <Button size="small" onClick={() => this.editClicked(record)}>编辑</Button>
                    <Button style={{color: colors.danger}} onClick={() => this.deleteLandCirculation(record)} size="small">删除</Button>
                  </Space>
                ),
              },
        ];
    }

    render(){
        const columns = this.getColumns();
        const {landCirculatio, modalVisble, title, mode, land} = this.state;
        return <div className="land-circulation">
            <PageTitle title="土地流转"/>
            <div className="land-circulation-list">
                <div className="lc-l-search-list">
                    <div className="lc-l-search">
                        <Form ref={this.formRef} layout="inline">
                            <Form.Item label="流出方" name="outflowSide">
                            <Input allowClear size="small" placeholder="流出方" />
                            </Form.Item>
                            <Form.Item label="流入方" name="inflowSide">
                            <Input allowClear size="small" placeholder="流入方" />
                            </Form.Item>
                            <Form.Item label="位置" name="location">
                            <Input allowClear size="small" placeholder="位置" />
                            </Form.Item>
                            <Form.Item>
                            <Button size="small" value="horizontal" onClick={this.searchClicked}>查询</Button>
                            </Form.Item>
                        </Form>
                        <Button size="small" type="primary" onClick={this.createdClicked}>新增</Button>
                    </div>
                    <Table
                    columns={columns}
                    dataSource={landCirculatio}
                    pagination={{pageSize: 5}}
                    rowKey="id"
                    size="small"/>
                </div>
            </div>
            {modalVisble && <LandCirulationModal close={this.closeModal} visible={modalVisble} title={title} mode={mode} land={land} refresh={this.getLandCirculations}/>}
        </div>;
    }
}
