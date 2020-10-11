/* eslint-disable global-require */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import {Button, message, Modal, Upload} from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import '../../theme/style/videomonitor/vedioItem.scss';
import cover from '../../theme/img/vedio.svg';
import EZUIKit from 'ezuikit-js';

interface VideoItemPro{
  video: any,
  accessToken: string;
  play: (url: any, channelNo: any, deviceSerial: any) => void;
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
      return '正常';
    case 1:
      return '设备不在线';
    case 2:
      return '设备开启视频加密';
    case 3:
      return '设备删除';
    case 4:
      return '设备失效';
    case 5:
      return '未绑定';
    case 6:
      return '账户下流量已超出';
    case 7:
      return '设备接入限制';
    default:
      break;
    }
  }

  renderAddressStatus = (statusCode: any) => {
    switch (statusCode) {
    case 0:
      return '未使用或直播已关闭';
    case 1:
      return '使用中';
    case 2:
      return '已过期';
    case 3:
      return '直播已暂停';
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
      url: this.props.video.rtmp,
      deviceSerial: this.props.video.deviceSerial,
      channelNo: this.props.video.channelNo,
      template: 'standard', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      // header: ['capturePicture','save','zoom'],            // 如果templete参数不为simple,该字段将被覆盖
      // // 视频下方底部控件
      // footer: ['talk','broadcast','hd','fullScreen'],      // 如果template参数不为simple,该字段将被覆盖
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      autoplay: 0,
      openSoundCallBack: (data: any) => console.log('开启声音回调', data),
      closeSoundCallBack: (data: any) => console.log('关闭声音回调', data),
      startSaveCallBack: (data: any) => console.log('开始录像回调', data),
      stopSaveCallBack: (data: any) => console.log('录像回调', data),
      capturePictureCallBack: (data: any) => console.log('截图成功回调', data),
      fullScreenCallBack: (data: any) => console.log('全屏回调', data),
      getOSDTimeCallBack: (data: any) => console.log('获取OSDTime回调', data),
      width:600,
      height:400,
    });
  }

  render(){

    return (
      <div className="video-item card-box">
        <div className="video-title-box">
          <div className="video-cover">
            <div className="video-hover">
              <span><PlayCircleOutlined onClick={() => this.playClicked()} style={{ cursor: 'pointer'}}/></span>
            </div>
            <img src={this.props.video.cover || cover} alt="cover" ></img>
          </div>
          <div className="video-title">{this.props.video.deviceName}</div>
        </div>
        <div className="desc-box">
          <div>设备序列：<span>{this.props.video.deviceSerial}</span></div>
          <div>设备通道：<span>{this.props.video.channelNo}</span></div>
          <div>设备状态：<span>{this.renderDeviceStatus(this.props.video.exception)}</span></div>
          <div>地址状态：<span>{this.renderAddressStatus(this.props.video.status)}</span></div>
        </div>
      </div>
    );
  }
}
