/* eslint-disable no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {Button, Table, Space, Modal, message} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { colors} from '../../const/const';
import PriceSellModal from './PriceSellModal';


const {confirm} = Modal;

export enum OptMpde{
  create,
  update
}

interface PriceSellState{
  visible: boolean;
  priceSell: any;
  priceSells: any[];
  allVillage: any[];
  allTypes: any[];
  optMode: OptMpde
  optTitle: string
}


export default class PriceSellList extends Component<any, PriceSellState> {

  // title, link
  constructor(props: any){
    super(props);
    this.state = {
      visible: false,
      priceSell: {},
      priceSells: [],
      allVillage: [],
      allTypes: [],
      optMode: OptMpde.create,
      optTitle: '创建价格',
    };
  }

  componentDidMount(){
    this.getPriceSells();
    this.getAllTypes();
    this.getAllVillages();
  }

  createClicked = () => {
    this.setState({
      optMode: OptMpde.create,
      visible: true,
      optTitle: '创建价格',
      priceSell: null,
    });
  }

  getAllVillages = () => {
    axios({
      method: 'GET',
      url: 'api/getAllVillage',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          allVillage: data,
        });
      } else {
        this.setState({
          allVillage: [],
        });
      }
    }).catch(() => {
      this.setState({
        allVillage: [],
      });
    });
  }

  getAllTypes = () => {
    axios({
      method: 'GET',
      url: 'api/getAllFarmCount',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          allTypes: data,
        });
      } else {
        this.setState({
          allTypes: [],
        });
      }
    }).catch(() => {
      this.setState({
        allTypes: [],
      });
    });
  }

  getPriceSells = () => {
    axios({
      method: 'GET',
      url: 'api/priceSells',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          priceSells: data,
        });
      } else {
        this.setState({
          priceSells: [],
        });
      }
    }).catch(() => {
      this.setState({
        priceSells: [],
      });
    });
  }

  closeModel = () => {
    this.setState({
      visible: false,
    });
  };

  createSuccessCall = () => {
    this.getPriceSells();
    this.closeModel();
  }

  editPrice = (record: any) => {
    this.setState({
      visible: true,
      priceSell: record,
      optTitle: '编辑价格',
      optMode: OptMpde.update,
    });
  }

  deletePrice = (horseRaceLamp: any) => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
			cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/priceSell/${horseRaceLamp.id}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getPriceSells();
          } else {
            message.error('删除失败');
          }
        }).catch(() => {
          message.error('删除失败');
        });
      },
    });
  }

  render(){

    const columns = [
      {
        title: '所属村',
        dataIndex: 'village',
        key: 'village',
        width: '15%',
        render: (text: any, record: any) => {
          return record?.type?.type || '';
        },
      },
      {
        title: '产品类型',
        dataIndex: 'type',
        key: 'type',
        width: '15%',
        render: (text: any, record: any) => {
          return record?.village?.village || '';
        },
      },
      {
        title: '日销售量/吨',
        dataIndex: 'daySell',
        key: 'daySell',
        width: '15%',
        render: (text: any) => {
          return text;
        },
      },
      {
        title: '价格/元',
        dataIndex: 'price',
        key: 'price',
        width: '15%',
        render: (text: any) => {
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => (
          <Space>
            <Button type="default" onClick={() => this.editPrice(record)} size="small">编辑</Button>
            <Button type="ghost" size="small" style={{color: colors.danger}} onClick={() => this.deletePrice(record)}>删除</Button>
          </Space>
        ),
      },
    ];

    const {priceSells, visible, priceSell, optMode, optTitle, allTypes, allVillage} = this.state;

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button size="middle" type="primary" onClick={this.createClicked}>新建</Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={priceSells} rowKey='id' pagination={{total: priceSells.length, showTotal: total => `共 ${total} 条`}}/>
        </div>
        {
          visible && <PriceSellModal types={allTypes} villages={allVillage} title={optTitle}
          visble={visible} success={this.createSuccessCall} close={this.closeModel} priceSell={priceSell} mode={optMode} />
        }
      </div>
    );
  }
}
