/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Upload, message, Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface NewVideoPro{
  newVedioVisble: boolean;
  close: () => void;
}

class NewVideo extends Component<NewVideoPro> {
  handleOk = () => {
    this.props.close();
  }
  handleCancel = () => {
    this.props.close();
  }
  render() {

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info: any) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name}上传成功!`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name}上传失败!`);
        }
      },
    };

    // mp4,flv,f4v,webm,m4v,mov,3gp,3g2,rm,rmvb,wmv,avi,asf,mpg,mpeg,mpe,ts,div,dv,divx,vob,dat,mkv,swf,lavf,cpk,dirac,ram,qt,fli,flc,mod,
    return <Modal
      title="上传视频"
      visible={this.props.newVedioVisble}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="确认"
      cancelText="取消">
      <Upload {...props} accept=".mp4,.flv,.f4v,.webm,.m4v,.mov,.3gp,.3g2,.rm,.rmvb,.wmv,.avi,.asf,.mpg,.mpeg,.mpe,.ts,.div,.dv,.divx,.vob,.dat,.mkv,.swf,.lavf,.cpk,.dirac,.ram,.qt,.fli,.flc,.mod">
        <Button icon={<UploadOutlined />}>点击上传视频</Button>
      </Upload>
    </Modal>;
  }
}

export default NewVideo;
