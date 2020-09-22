import React, {Component} from 'react';
import {Button} from 'antd';
import '../../theme/style/partybuild/video.scss';
import cover from '../../theme/img/login.jpg';

export interface VideoObj{
  title: string;
  cover: string;
  playLink?: string;
}

interface VideoItemPro{
  video: VideoObj
}

export default class VideoItem extends Component<VideoItemPro, any> {

  constructor(props: any){
    super(props);
    this.state = {
      newMemberVisible: false,
    };
  }

  render(){
    return (
      <div className="video-item card-box">
        <div className="video-title-box">
          <img src={cover} alt="cover" className="video-cover"></img>
          <div className="video-title">{this.props.video.title}</div>
        </div>
        <div className="upload-box">
          <Button className="opt-btn" type="ghost">上传封面</Button>
          <Button className="opt-btn" type="ghost">替换视频</Button>
        </div>
      </div>
    );
  }
}
