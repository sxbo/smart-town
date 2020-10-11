/* eslint-disable no-invalid-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
import '../../theme/style/videomonitor/layout.scss';
import VideoItem from './VedioItem';
import PlayModal from './PlayModel';

class VideoLayout extends Component<any, any> {

  constructor(props:any){
    super(props);
    this.state = {
      vedios: [],
      accessToken: '',
      playModalVisible: false,
      url: '',
      channelNo: '',
      deviceSerial: '',
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'api/videos',
    }).then((res) => {
      if (res.data.status === 200){
        const vedios = res.data.data.data || [];
        this.setState({
          vedios: vedios,
          accessToken: res.data.accessToken,
        });
      }
    }).catch((err) => {
      this.setState({
        vedios: [],
      });
    });
  }

  openPlayCall = (url: any, channelNo: any, deviceSerial: any) => {
    this.setState({
      url: url,
      channelNo: channelNo,
      deviceSerial: deviceSerial,
      playModalVisible: true,
    });
  }

  closePlay = () => {
    this.setState({
      playModalVisible: false,
    });
  }

  renderVideos = () => {
    const {vedios, accessToken} = this.state;
    const videoArr = [];
    for (let i = 0; i < vedios.length; i += 4 ){
      videoArr.push(vedios.slice(i, i + 4));
    }
    return <>
      {
        videoArr.map((videoItems, videoItemindex) => {
          return <Row key={`${videoItemindex}`}>
            {
              videoItems.map((video: any, index: number) => {
                return <Col key={`${index}`} xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}} style={{padding: '10px'}}>
                  <VideoItem play={this.openPlayCall} accessToken={accessToken} video={video}/>
                </Col>;
              })
            }
          </Row>;
        })
      }
    </>;
  }

  render(){
    const {playModalVisible, url, channelNo, deviceSerial} = this.state;

    return (
      <div className="vedio-monitor">
        <PageTitle title="视屏监控"></PageTitle>
        <div className="videos-content">
          {
            this.renderVideos()
          }
        </div>
        <PlayModal close={this.closePlay} visible={playModalVisible} url={url} channelNo={channelNo} deviceSerial={deviceSerial}/>
      </div>
    );
  }
}

export default VideoLayout;
