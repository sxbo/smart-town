/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import {Button, Row, Col} from 'antd';
import '../../theme/style/partybuild/video.scss';
import VideoItem, {VideoObj} from './VideoItem';
import NewVideo from './newVideo';

interface VideoState{
  newVedioVisble: boolean;
}

const videos: VideoObj[] = [
  {
    cover: '../../theme/img/vedio.svg',
    title: '党建学习第一期视频',
    playLink: '',
  },
  {
    cover: '../../theme/img/vedio.svg',
    title: '党建学习第一期视频',
    playLink: '',
  },
  {
    cover: '../../theme/img/vedio.svg',
    title: '党建学习第一期视频',
    playLink: '',
  },
  {
    cover: '../../theme/img/vedio.svg',
    title: '党建学习第一期视频',
    playLink: '',
  },
  {
    cover: '../../theme/img/vedio.svg',
    title: '党建学习第一期视频',
    playLink: '',
  },
];

export default class Video extends Component<any, VideoState> {

  constructor(props: any){
    super(props);
    this.state = {
      newVedioVisble: false,
    };
  }

  openUploadVedio = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newVedioVisble: true,
    });
  };

  closeUploadVedio = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({
      newVedioVisble: false,
    });
  };

  renderVideos = () => {
    const videoArr = [];
    // eslint-disable-next-line no-magic-numbers
    for (let i = 0; i < videos.length; i += 4 ){
      videoArr.push(videos.slice(i, i + 4));
    }
    return <>
      {
        videoArr.map((videoItems, videoItemindex) => {
          return <Row key={`${videoItemindex}`}>
            {
              videoItems.map((video: VideoObj, index) => {
                return <Col key={`${index}`} xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}} style={{padding: '10px'}}>
                  <VideoItem video={video}/>
                </Col>;
              })
            }
          </Row>;
        })
      }
    </>;
  }

  render(){
    return (
      <div className="content-item">
        <NewVideo newVedioVisble={this.state.newVedioVisble} close={this.closeUploadVedio}/>
        <div className="orginization">
          <div>
            <Button size="middle" onClick={this.openUploadVedio}>上传视频</Button>
          </div>
        </div>
        {
          this.renderVideos()
        }
      </div>
    );
  }
}
