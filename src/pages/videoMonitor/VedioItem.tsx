/* eslint-disable global-require */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import '../../theme/style/videomonitor/vedioItem.scss';
import cover from '../../theme/img/vedio.svg';
import EZUIKit from 'ezuikit-js';

interface VideoItemPro{
  video: any,
  accessToken: string;
  play: (url: any, channelNo: any, deviceSerial: any) => void;
  setPlayer: (player:any) => void;
}

export default class VideoItem extends Component<VideoItemPro, any> {
  playr: any;

  constructor(props: any){
    super(props);
    this.state = {
      playVisible: false,
    };
    this.playr = null; // 定义播放器
  }

  renderDeviceStatus = (statusCode: any) => {
    switch (statusCode) {
    case 0:
      return '不在线';
    case 1:
      return '在线';
    default:
      break;
    }
  }

  renderAddressStatus = (statusCode: any) => {
    switch (statusCode) {
    case 0:
      return '否';
    case 1:
      return '是';
    default:
      break;
    }
  }

  playClicked = () => {
    this.props.play(this.props.video.rtmp,
      this.props.video.channelNo,
      this.props.video.deviceSerial);

    const el = document.getElementById('video-container');
    if (el) {el['innerHTML'] = '' ;}
    this.playr = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken: this.props.accessToken,
      url: 'ezopen://open.ys7.com/' + this.props.video.deviceSerial + '/' + this.props.video.channelNo + '.hd.live',
      deviceSerial: this.props.video.deviceSerial,
      channelNo: this.props.video.channelNo,
      template: 'security', // voice
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      autoplay: 1,
      width:651,
      height:400,
    });
    this.props.setPlayer(this.playr);
  }

  render(){

    return (
      <div className="video-item card-box">
        <div className="video-title-box">
          <div className="video-cover">
            <div className="video-hover">
              <span><PlayCircleOutlined onClick={() => this.playClicked()} style={{ cursor: 'pointer'}}/></span>
            </div>
            <img src={this.props.video.picUrl || cover} alt="cover" ></img>
          </div>
          <div className="video-title">{this.props.video.channelName}</div>
        </div>
        <div className="desc-box">
          <div>设备序列：<span>{this.props.video.deviceSerial}</span></div>
          <div>设备通道：<span>{this.props.video.channelNo}</span></div>
          <div>设备状态：<span>{this.renderDeviceStatus(this.props.video.status)}</span></div>
          <div>是否加密：<span>{this.renderAddressStatus(this.props.video.isEncrypt)}</span></div>
        </div>
      </div>
    );
  }
}
