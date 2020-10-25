/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Form, Input, Select, message, Upload, Button, Spin} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';
import {HorseType} from '../../const/const';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { AdvertiseMode } from './Advertisement';
import {customInsertImage} from '../../const/const';


interface EditHorseRaceLampPro{
  visible: boolean;
  close: () => void;
  createSuccess?: () => void;
  advertise: any;
  title: string;
  mode: AdvertiseMode
}

export default class NewAdvertise extends Component<EditHorseRaceLampPro, any> {
  formRef: React.RefObject<FormInstance>;
  toolbar: (string[] | { align: string; }[] | { list: string; }[] | { script: string; }[] | { indent: string; }[] | { direction: string; }[])[];
  editorRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.formRef = React.createRef<FormInstance>();
    this.editorRef = React.createRef<any>();
    this.toolbar = [
      ['bold', 'italic', 'underline', 'link'], ['color', 'background'], [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}], ['size'], [{'list': 'ordered'}, {'list': 'bullet'}], ['emoji'], ['image'], ['strike'], ['blockquote'], ['code-block'], [{'script': 'sub'}, {'script': 'super'}], [{'indent': '-1'}, {'indent': '+1'}], [{direction: "rtl"}], ['clean', 'formatPainter'],
    ];

    this.state = {
      content: props.advertise?.content || '',
      loading: false,
    };
  }

  componentDidMount() {
    (window as any).rEditor = this.editorRef;
  }

  handleOk = () => {
    this.formRef.current?.validateFields().then(data => {
      console.log(data);
      console.log(this.state.content);
      const {advertise, mode} = this.props;
      const {content} = this.state;
      if (mode == AdvertiseMode.create){
        const advertise_create = {
          ...data,
          content: content,
        };
        this.createApi(advertise_create);
      } else {
        const edit_create = {
          ...advertise,
          ...data,
          content: content,
        };
        this.updateApi(edit_create);
      }
    });
  }


  createApi = (advertise: any) => {
    axios({
      method: 'POST',
      url: 'api/spb/addAdvertisement',
      data: advertise,
    }).then((res) => {
      if (res.data.status === 200){
        this.setState({content: ''});
        this.props.createSuccess?.();
        this.formRef.current?.resetFields();
      } else {
        message.error('新增失败');
      }
    }).catch(() => {
      message.error('新建失败');
    });
  }

  updateApi = (advertise: any) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateAdvertisement',
      data: advertise,
    }).then((res) => {
      if (res.data.status === 200){
        this.props.createSuccess?.();
        this.formRef.current?.resetFields();
      } else {
        message.error('更新失败');
      }
    }).catch(() => {
      message.error('更新失败');
    });
  }

  handleCancel = () => {
    this.setState({content: ''});
    this.formRef.current?.resetFields();
    this.props.close();
  }

  onChange = (content: any, delta: any, source: any, editor: any) => {
    this.setState({content: content});
  }

  beforeUpload = () => {
    this.openLoading();
    return true;
  }

  openLoading = () => {
    this.setState({
      loading: true,
    });
  }

  closeLoading = () => {
    this.setState({
      loading: false,
    });
  }

  customInsertImage = (callback: any) => {
    customInsertImage(() => {
      this.setState({
        loading: true,
      });
    }, (imageUrl: any) => {
      this.setState({
        loading: false,
      });
      callback({
        src: imageUrl,
        alt: 'image',
      });
    });
  }


  render() {

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

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
          const imageUrl = info?.file?.response?.imgUrl;
          this.formRef.current?.setFieldsValue({imageUrl: imageUrl});
          this.closeLoading();
          message.success('上传成功');
        } else if (info.file.status === 'error') {
          message.error('上传失败！');
          this.closeLoading();
        }
      },
    };

    const {advertise = {}} = this.props;
    const advertisement = JSON.parse(JSON.stringify(advertise));

    return <Form ref={this.formRef} name="nest-messages" {...layout}>
      <Modal
        title="新建"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        width="800px"
        destroyOnClose>
        <Spin tip="正在上传" spinning={this.state.loading}>
          <Form.Item name="imageUrl" label="背景图" initialValue={advertisement?.imageUrl} rules={[{ required: true, message: '请上传背景!' }]}>
            <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadCoverProps} accept=".jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp">
              <Button icon={<UploadOutlined/>} type="dashed" size="small">上传背景</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="link" label="链接" initialValue={advertisement?.link}>
            <Input/>
          </Form.Item>
          <Form.Item name="type" label="类型" initialValue={advertisement?.type} rules={[{ required: true, message: '类型是必选字段!' }]}>
            <Select>
              {
                HorseType.map((type, index) => <Select.Option key={`${index}`} value={type.type}>{type.label}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item label="内容">
            <RichEditor ref={this.editorRef}
            toolbar={this.toolbar}
            onChange={this.onChange}
            customInsertImage={this.customInsertImage}
            value={this.state.content}
            />
          </Form.Item>
        </Spin>
      </Modal>
    </Form>;
  }
}
