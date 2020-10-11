/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import {Button, Row, Col, Upload, message, Spin} from 'antd';
import '../../theme/style/partybuild/video.scss';
import VideoItem, {VideoObj} from './VideoItem';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


interface VideoState{
  newVedioVisble: boolean;
  videos: [];
  loading: boolean;
}


export default class Video extends Component<any, VideoState> {

  constructor(props: any){
    super(props);
    this.state = {
      newVedioVisble: false,
      videos: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getVideos();
  }

  // 上传视频成功，立即调用创建学习信息接口，创建成功，刷新列表
  ceateStudyInformation = (stydyInfo: any) => {
    axios({
      method: 'POST',
      url: 'api/spb/addStudyInformation',
      data: stydyInfo,
    }).then((res) => {
      if (res.data.status === 200){
        this.getVideos();
        this.setState({
          loading: false,
        });
      } else {
        message.error('操作失败');
        this.setState({
          loading: false,
        });
      }
    }).catch(() => {
      message.error('操作失败');
      this.setState({
        loading: false,
      });
    });
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

  befaoreUploadCall = () => {
    this.setState({loading: true});
    return true;
  }

  uploadSuccessCall = () => {
    this.setState({loading: false});
    this.getVideos();
  }

  uploadFailCall = () => {
    this.setState({
      loading: false,
    });
  }

  renderVideos = () => {
    const {videos} = this.state;
    const videoArr = [];
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
                  <VideoItem beforeUpload={this.befaoreUploadCall} uploadSuccess={this.uploadSuccessCall} uploadFail={this.uploadFailCall} video={video}/>
                </Col>;
              })
            }
          </Row>;
        })
      }
    </>;
  }

  render(){

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
        }
        if (info.file.status === 'done') {
          const studyInfor = {
            url: info?.file?.response?.videoUrl,
            cover: '',
            title: info?.file?.name,
          };
          this.ceateStudyInformation(studyInfor);
        } else if (info.file.status === 'error') {
          this.setState({
            loading: false,
          });
          message.info('上传失败！');
        }
      },
    };

    return (
      <div className="content-item">
        <Spin tip="正在上传，请稍后!" spinning={this.state.loading} delay={500}>
          <div className="orginization">
            <div>
              <Upload beforeUpload={this.befaoreUploadCall} showUploadList={false} {...uploadProps} accept=".mp4,.flv,.f4v,.webm,.m4v,.mov,.3gp,.3g2,.rm,.rmvb,.wmv,.avi,.asf,.mpg,.mpeg,.mpe,.ts,.div,.dv,.divx,.vob,.dat,.mkv,.swf,.lavf,.cpk,.dirac,.ram,.qt,.fli,.flc,.mod">
                <Button type="primary" icon={<UploadOutlined/>} size="middle">新建</Button>
              </Upload>
            </div>
          </div>
          {
            this.renderVideos()
          }
        </Spin>
      </div>
    );
  }
}
