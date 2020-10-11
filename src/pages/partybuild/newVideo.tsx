/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import { Modal, Upload, message, Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

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

  ceateStudyInformation = (stydyInfo: any) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateMemberOrganizations',
      data: stydyInfo,
    }).then((res) => {
      if (res.data.status === 200){
        // this.props.createSuccess();
        this.setState({
          loading: false,
        });
      } else {
        message.error('操作失败');
      }
    }).catch(() => {
      message.error('操作失败');
    });
  }


  render() {
    const uploadProps = {
      name: 'file',
      action: 'api/upload/uploadVideo',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info: any) => {
        if (info.file.status !== 'uploading') {
          this.setState({
            loading: true,
          });
          message.info('正在上传，请稍后！', 1);
        }
        if (info.file.status === 'done') {
          // info?.file?.response?.imgUrl;
          console.log(info);
        } else if (info.file.status === 'error') {
          this.setState({
            loading: false,
          });
          message.info('上传失败！');
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
      <Upload {...uploadProps} accept=".mp4,.flv,.f4v,.webm,.m4v,.mov,.3gp,.3g2,.rm,.rmvb,.wmv,.avi,.asf,.mpg,.mpeg,.mpe,.ts,.div,.dv,.divx,.vob,.dat,.mkv,.swf,.lavf,.cpk,.dirac,.ram,.qt,.fli,.flc,.mod">
        <Button icon={<UploadOutlined />}>点击上传视频</Button>
      </Upload>
    </Modal>;
  }
}

export default NewVideo;
