/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Button, Table, Modal, Space, message, Upload} from 'antd';
import coverImg from '../../theme/img/login.jpg';
import {DynamicType, colors} from '../../const/const';
import NewDynamic from './NewDynamic';
import EditDynamic from './EditDynamic';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface DynamicState{
  newDynamicVisible: boolean;
  editDynamicVisible: boolean;
  dynamics: any;
  dynamic: any;
  loading: boolean;
}

export default class Dynamic extends Component<any, DynamicState> {
  // cover， 标题，副标题，富文本，操作
  constructor(props: any){
    super(props);
    this.state = {
      newDynamicVisible: false,
      dynamics: [],
      dynamic: '',
      editDynamicVisible: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getDynamics();
  }

  getDynamics = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getAllDynamicInformation',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          dynamics: data,
        });
      } else {
        this.setState({
          dynamics: [],
        });
      }
    }).catch(() => {
      this.setState({
        dynamics: [],
      });
    });
  }

  openNewDynamic = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newDynamicVisible: true,
    });
  };

  closeNewDynamic = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newDynamicVisible: false,
    });
  };

  createSuccessCall = () => {
    this.getDynamics();
    this.closeNewDynamic();
  }

  editSuccessCall = () => {
    this.getDynamics();
    this.closeEditDynamic();
  }

  closeEditDynamic = () => {
    this.setState({
      editDynamicVisible: false,
    });
  }

  editDynamic = (record: any) => {
    this.setState({
      editDynamicVisible: true,
      dynamic: record,
    });
  }

  deleteDynamic = (dynamic: any) => {
    Modal.confirm({
      title: '删除动态',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/spb/delDynamicInformation/${dynamic.id}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.getDynamics();
          } else {
            message.error('删除失败');
          }
        }).catch(() => {
          message.error('删除失败');
        });
      },
    });
  }

  beforeUpload = () => {
    this.setState({loading: true});
    return true;
  }

  uploadFail = () => {
    this.setState({loading: false});
  }

  updateDynamic = (dynamic: any) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateDynamicInformation',
      data: dynamic,
    }).then((res) => {
      if (res.data.status === 200){
        this.getDynamics();
        this.setState({loading: false});
      } else {
        message.error('操作失败');
        this.uploadFail();
      }
    }).catch(() => {
      message.error('操作失败');
      this.uploadFail();
    });
  }

  render(){

    const columns: any = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '25%',
        render: (text: any, record: any) => {
          return <>
            <a>
              <img style={{width: '40px', height: '40px', marginRight: '5px'}} src={record.icon || coverImg} alt="cover"/>
              {text}
            </a>
          </>;
        },
      },
      {
        title: '副标题',
        key: 'subTitle',
        width: '25%',
        dataIndex: 'subTitle',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (type: number) => {
          const find = DynamicType.find(item => item.type == type);
          return find?.label;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any) => {
          const uploadCoverProps = {
            name: 'file',
            action: 'api/upload/uploadImage',
            headers: {
              authorization: 'authorization-text',
            },
            onChange: (info: any) => {
              if (info.file.status !== 'uploading') {
                this.beforeUpload();
              }
              if (info.file.status === 'done') {
                record.icon = info?.file?.response?.imgUrl,
                this.updateDynamic(record);
              } else if (info.file.status === 'error') {
                this.uploadFail();
                message.info('上传失败！');
              }
            },
          };
          return <Space>
            <Button type="default" onClick={() => this.editDynamic(record)} size="small">编辑</Button>
            <Button type="ghost" style={{color: colors.danger}} size="small" onClick={() => this.deleteDynamic(record)}>删除</Button>
            <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadCoverProps} accept=".jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp">
              <Button icon={<UploadOutlined/>} type="dashed" size="small">上传背景</Button>
            </Upload>
          </Space>;
        },
      },
    ];

    const {dynamics, editDynamicVisible, dynamic, loading} = this.state;

    return (
      <div className="content-item">
        <div className="orginization">
          <div>
            <Button type="primary" size="middle" onClick={this.openNewDynamic}>新增动态</Button>
          </div>
        </div>
        <div>
          <Table loading={loading} columns={columns} dataSource={dynamics} rowKey='id'/>
        </div>
        <NewDynamic visible={this.state.newDynamicVisible} createSuccess={this.createSuccessCall} close={this.closeNewDynamic}/>
        <EditDynamic visible={editDynamicVisible} editSuccess={this.editSuccessCall} close={this.closeEditDynamic} dynamic={dynamic}/>
      </div>
    );
  }
}
