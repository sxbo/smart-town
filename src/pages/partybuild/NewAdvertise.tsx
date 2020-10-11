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
import { Modal, Form, Input, Select, message, Upload, Button} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';
import {HorseType} from '../../const/const';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

// import { UploadOutlined } from '@ant-design/icons';


interface EditHorseRaceLampPro{
  visible: boolean;
  close: () => void;
  createSuccess?: () => void;
  beforeUpload: () => void;
  uploadFail: () => void;
  uploadSuccess: () => void;
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
      content: '',
      imageUrl: '',
    };
  }

  componentDidMount() {
    (window as any).rEditor = this.editorRef;
  }

  handleOk = () => {
    if (!this.state.imageUrl){
      message.info('请先上传背景图片！');
      return;
    }
    this.formRef.current?.validateFields().then(data => {
      const advertiseOpt = data.advertise;
      const content = this.state.content;
      advertiseOpt.content = content;
      advertiseOpt.imageUrl = this.state.imageUrl;
      axios({
        method: 'POST',
        url: 'api/spb/addAdvertisement',
        data: advertiseOpt,
      }).then((res) => {
        if (res.data.status === 200){
          this.setState({content: '', imageUrl: ''});
          this.props.createSuccess?.();
          this.formRef.current?.resetFields();
        } else {
          message.error('操作失败');
        }
      }).catch(() => {
        message.error('新建失败');
      });
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
    this.props.beforeUpload();
    return true;
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
          this.setState({imageUrl: imageUrl});
          this.props.uploadSuccess();
        } else if (info.file.status === 'error') {
          message.info('上传失败！');
          this.props.uploadFail();
        }
      },
    };

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
        <Form.Item label="背景图">
          <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadCoverProps} accept=".jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp">
            <Button disabled={this.state.imageUrl ? true : false} icon={<UploadOutlined/>} type="dashed" size="small">上传背景</Button>
          </Upload>
        </Form.Item>
        <Form.Item name={['advertise', 'link']} label="链接">
          <Input/>
        </Form.Item>
        <Form.Item name={['advertise', 'type']} label="类型" rules={[{ required: true, message: '类型是必选字段!' }]}>
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
          value={this.state.content}
          />
        </Form.Item>
      </Modal>
    </Form>;
  }
}
