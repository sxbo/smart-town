/* eslint-disable no-magic-numbers */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {message, Modal} from 'antd';
import axios from 'axios';
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined} from '@ant-design/icons';
import '../../theme/style/partybuild/video.scss';
import cover from '../../theme/img/vedio.svg';

export interface VideoObj{
  id?: number;
  title: string;
  cover: string;
  url?: string;
  content?: any;
}

interface VideoItemPro{
  video: VideoObj,
  refreshVideos: () => void;
  edit: (video: any) => void;
  viewVideo: (video: any) => void;
}

export default class VideoItem extends Component<VideoItemPro, any> {

  constructor(props: any){
    super(props);
    this.state = {
      newMemberVisible: false,
    };
  }

  editVedio = () => {
    const {video} = this.props;
    this.props.edit(video);
  }

  viewVideo = () => {
    const {video} = this.props;
    this.props.viewVideo(video);
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
            this.props.refreshVideos();
          } else {
            message.error('操作失败');
          }
        }).catch(() => {
          message.error('操作失败');
        });
      },
    });
  }


  render(){

    const iconStyle = {cursor: 'pointer', marginRight: '10px'};

    return (
      <div className="party-stydy-video-item card-box">
        <div className="video-title-box">
          <div className="video-cover">
            <div className="video-hover">
              <span><EditOutlined onClick={this.editVedio} style={iconStyle}/></span>
              <span><PlayCircleOutlined onClick={this.viewVideo} style={iconStyle}/></span>
              <span><DeleteOutlined onClick={this.deleteVedio} style={{ cursor: 'pointer'}}/></span>
            </div>
            <img src={this.props.video.cover || cover} alt="cover" ></img>
          </div>
          <div className="video-title">{this.props.video.title}</div>
        </div>
      </div>
    );
  }
}
