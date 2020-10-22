/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import {Button, Row, Col, Spin} from 'antd';
// import '../../theme/style/partybuild/video.scss';
import VideoItem, {VideoObj} from './VideoItem';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import NewVideoInfo from './newVideoInfo';
import EditVideoInfo from './EditVideoInfo';


interface VideoState{
  newVedioVisble: boolean;
  editVideoVisible: boolean;
  videos: [];
  loading: boolean;
  videoInfo: any;
}


export default class Video extends Component<any, VideoState> {

  constructor(props: any){
    super(props);
    this.state = {
      newVedioVisble: false,
      videos: [],
      loading: false,
      editVideoVisible: false,
      videoInfo: {},
    };
  }

  componentDidMount() {
    this.getVideos();
  }

  openNewVideo = () => {
    this.setState({
      newVedioVisble: true,
    });
  }

  closeNewVideo = () => {
    this.setState({
      newVedioVisble: false,
    });
  }

  closeEditVideo = () => {
    this.setState({
      editVideoVisible: false,
    });
  }

  refreshVideos = () => {
    this.getVideos();
  }

  editVideo = (video: any) => {
    this.setState({videoInfo: video, editVideoVisible: true});
  }

  getVideos = () => {
    axios({
      method: 'GET',
      url: 'api/spb/getStudyInformation',
    }).then((res) => {
      if (res.data.status === 200){
        const data = res.data.data || [];
        this.setState({
          videos: data,
        });
      } else {
        this.setState({
          videos: [],
        });
      }
    }).catch(() => {
      this.setState({
        videos: [],
      });
    });
  }


  createSuccessCall = () => {
    this.getVideos();
    this.setState({
      newVedioVisble: false,
    });
  }

  editSuccessCall = () => {
    this.getVideos();
    this.setState({
      editVideoVisible: false,
    });
  }


  renderVideos = () => {
    const {videos} = this.state;
    const videoArr = [];
    for (let i = 0; i < videos.length; i += 6 ){
      videoArr.push(videos.slice(i, i + 6));
    }
    return <>
      {
        videoArr.map((videoItems, videoItemindex) => {
          return <Row key={`${videoItemindex}`}>
            {
              videoItems.map((video: VideoObj, index) => {
                return <Col key={`${index}`} xs={{ span: 24}} md={{ span: 12}} xl={{ span: 4}} style={{padding: '10px'}}>
                  <VideoItem video={video} edit={this.editVideo} refreshVideos={this.refreshVideos}/>
                </Col>;
              })
            }
          </Row>;
        })
      }
    </>;
  }

  render(){
    const {newVedioVisble, editVideoVisible, videoInfo} = this.state;
    return (
      <div className="content-item">
        <Spin tip="正在上传，请稍后!" spinning={this.state.loading} delay={500}>
          <div className="orginization">
            <div>
              <Button onClick={e => this.openNewVideo()} type="primary" icon={<UploadOutlined/>} size="middle">新建</Button>
            </div>
          </div>
          {
            this.renderVideos()
          }
        </Spin>
        {
          editVideoVisible && <EditVideoInfo editSuccess={this.editSuccessCall} visible={editVideoVisible} close={this.closeEditVideo} title="视频信息" videoInfo={videoInfo}/>
        }
        <NewVideoInfo createSuccess={this.createSuccessCall} visible={newVedioVisble} close={this.closeNewVideo} title="视频信息" />
      </div>
    );
  }
}
