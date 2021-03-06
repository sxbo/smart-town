/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
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
import { Modal, Form, Input, message, Button, Upload, Spin} from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import {RichEditor} from 'ppfish';
import 'ppfish/es/components/RichEditor/style/index.less';
import axios from 'axios';
import {customInsertImage} from '../../const/const';

interface NewVideoInfoPro{
  visible: boolean;
  close: () => void;
  createSuccess?: () => void;
  title: string;
}

export default class NewVideoInfo extends Component<NewVideoInfoPro, any> {
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
      loading: false,
    };
  }


  componentDidMount() {
    (window as any).rEditor = this.editorRef;
  }

  handleOk = () => {
    this.formRef.current?.validateFields().then(data => {
      const videoInfo = data;
      const content = this.state.content;
      videoInfo.content = content;
      const user1 = localStorage.getItem('user');
      let user = {username: 'admin'};
      if (user1) {
        user = JSON.parse(user1);
      }
      videoInfo.userName = user.username;
      this.ceateStudyInformation(videoInfo);
    });
  }


  // 上传视频成功，立即调用创建学习信息接口，创建成功，刷新列表
  ceateStudyInformation = (stydyInfo: any) => {
    axios({
      method: 'POST',
      url: 'api/spb/addStudyInformation',
      data: stydyInfo,
    }).then((res) => {
      if (res.data.status === 200){
        this.props.createSuccess?.();
      } else {
        message.error('创建失败');
      }
    }).catch(() => {
      message.error('创建失败');
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

    const {title} = this.props;

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
            if (imageUrl) {
              this.formRef.current?.setFieldsValue({cover: imageUrl});
            }
            message.success('上传成功！');
            this.closeLoading();
          } else if (info.file.status === 'error') {
            message.info('上传失败！');
            this.closeLoading();
          }
        },
    };

    const uploadVideoProps = {
        name: 'file',
        action: 'api/upload/uploadVideo',
        headers: {
          authorization: 'authorization-text',
        },
        onChange: (info: any) => {
          if (info.file.status !== 'uploading') {
            this.beforeUpload();
          }
          if (info.file.status === 'done') {
            const url = info?.file?.response?.videoUrl;
            if (url) {
              this.formRef.current?.setFieldsValue({url: url});
            }
            message.success('上传成功！');
            this.closeLoading();
          } else if (info.file.status === 'error') {
            message.info('上传失败！');
            this.closeLoading();
          }
        },
    };

    return <Modal
      title={title}
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消"
      width="800px">
        <Spin tip="请稍后!" spinning={this.state.loading} delay={500}>
          <Form ref={this.formRef} name="nest-messages" {...layout}>
            <Form.Item name="title" label="标题" rules={[{ required: true, message: '标题是必填字段!'}]}>
              <Input />
            </Form.Item>
            <Form.Item name="cover" label="背景图" rules={[{ required: true, message: '请先上传一个封面'}]}>
              <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadCoverProps} accept=".jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp">
                <Button icon={<UploadOutlined/>} type="dashed" size="small">上传背景</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="url" label="视频" rules={[{ required: true, message: '请先上传视频' }]}>
              <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadVideoProps} accept=".mp4,.flv,.f4v,.webm,.m4v,.mov,.3gp,.3g2,.rm,.rmvb,.wmv,.avi,.asf,.mpg,.mpeg,.mpe,.ts,.div,.dv,.divx,.vob,.dat,.mkv,.swf,.lavf,.cpk,.dirac,.ram,.qt,.fli,.flc,.mod">
                  <Button type="dashed" icon={<UploadOutlined/>} size="small">上传视频</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="内容">
              <RichEditor ref={this.editorRef}
              toolbar={this.toolbar}
              onChange={this.onChange}
              customInsertImage={this.customInsertImage}
              value={this.state.content}
              />
            </Form.Item>
          </Form>
        </Spin>
    </Modal>;
  }
}
