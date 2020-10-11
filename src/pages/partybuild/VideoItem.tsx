/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {Button, message, Modal, Upload} from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import '../../theme/style/partybuild/video.scss';
import cover from '../../theme/img/vedio.svg';

export interface VideoObj{
  id?: number;
  title: string;
  cover: string;
  url?: string;
}

interface VideoItemPro{
  video: VideoObj,
  beforeUpload: () => void;
  uploadSuccess: () => void;
  uploadFail: () => void;
}

export default class VideoItem extends Component<VideoItemPro, any> {

  constructor(props: any){
    super(props);
    this.state = {
      newMemberVisible: false,
    };
  }

  updateStudyInformation = (stydyInfo: VideoObj) => {
    axios({
      method: 'PUT',
      url: 'api/spb/updateStudyInformation',
      data: stydyInfo,
    }).then((res) => {
      if (res.data.status === 200){
        this.props.uploadSuccess();
      } else {
        message.error('操作失败');
        this.props.uploadFail();
      }
    }).catch(() => {
      message.error('操作失败');
      this.props.uploadFail();
    });
  }

  deleteVedio = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    const {video} = this.props;
    Modal.confirm({
      title: '删除视频',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios({
          method: 'DELETE',
          url: `api/spb/delStudyInformation/${video.id}`,
        }).then((res) => {
          if (res.data.status === 200){
            this.props.uploadSuccess();
          } else {
            message.error('操作失败');
          }
        }).catch(() => {
          message.error('操作失败');
        });
      },
    });
  }

  uploadCover = (info: any) => {
    const {video} = this.props;
    if (info.file.status !== 'uploading') {
      this.props.beforeUpload();
    }
    if (info.file.status === 'done') {
      const studyInfor = {
        url: video.url,
        cover: info?.file?.response?.imgUrl,
        title: video.title,
        id: video.id,
      };
      this.updateStudyInformation(studyInfor);
    } else if (info.file.status === 'error') {
      this.props.uploadFail();
      message.info('上传失败！');
    }
  }

  uploadVedio = (info: any) => {
    const {video} = this.props;
    if (info.file.status !== 'uploading') {
      this.props.beforeUpload();
    }
    if (info.file.status === 'done') {
      const studyInfor = {
        url: info?.file?.response?.videoUrl,
        cover: video.cover,
        title: info?.file?.name,
        id: video.id,
      };
      this.updateStudyInformation(studyInfor);
    } else if (info.file.status === 'error') {
      this.props.uploadFail();
      message.info('上传失败！');
    }
  }

  beforeUpload = () => {
    this.props.beforeUpload();
    return true;
  }

  render(){

    const uploadVedioProps = {
      name: 'file',
      action: 'api/upload/uploadVideo',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.uploadVedio,
    };

    const uploadCoverProps = {
      name: 'file',
      action: 'api/upload/uploadImage',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.uploadCover,
    };

    return (
      <div className="video-item card-box">
        <div className="video-title-box">
          <div className="video-cover">
            <div className="video-hover">
              <span><DeleteOutlined onClick={this.deleteVedio} style={{ cursor: 'pointer'}}/></span>
            </div>
            <img src={this.props.video.cover || cover} alt="cover" ></img>
          </div>
          <div className="video-title">{this.props.video.title}</div>
        </div>
        <div className="upload-box">
          <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadCoverProps} accept=".jpeg,.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp">
            <Button icon={<UploadOutlined/>} className="opt-btn" type="ghost">上传封面</Button>
          </Upload>
          <Upload beforeUpload={this.beforeUpload} showUploadList={false} {...uploadVedioProps} accept=".mp4,.flv,.f4v,.webm,.m4v,.mov,.3gp,.3g2,.rm,.rmvb,.wmv,.avi,.asf,.mpg,.mpeg,.mpe,.ts,.div,.dv,.divx,.vob,.dat,.mkv,.swf,.lavf,.cpk,.dirac,.ram,.qt,.fli,.flc,.mod">
            <Button icon={<UploadOutlined/>} className="opt-btn" type="ghost">上传视频</Button>
          </Upload>
        </div>
      </div>
    );
  }
}
