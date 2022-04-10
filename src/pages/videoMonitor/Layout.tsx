/* eslint-disable no-invalid-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
import React, {Component} from 'react';
import {Row, Col, Pagination, Spin } from 'antd';
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
      total: 0,
      currentPage: 1,
      loading: false,
      player: null,
    };
  }

  componentDidMount() {
    const url = 'api/videos?pageSize=12&pageStart=0';
    this.getVedios(url);
  }

  getVedios = (url: string) => {
    this.setState({loading: true});
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      if (res.data.status === 200){
        const vedios = res.data.data.data || [];
        this.setState({
          vedios: vedios,
          accessToken: res.data.accessToken,
          total: res.data?.data?.page?.total || 0,
          loading: false,
        });
      }
    }).catch((err) => {
      this.setState({
        vedios: [],
        loading: false,
      });
    });
  }

  onPageChange = (page: any, pageSize: any) => {
    this.setState({
      currentPage: page,
    });
    const pageStart = page - 1;
    const url = `api/videos?pageSize=12&pageStart=${pageStart}`;
    this.getVedios(url);
  }

  openPlayCall = (url: any, channelNo: any, deviceSerial: any) => {
    this.setState({
      url: url,
      channelNo: channelNo,
      deviceSerial: deviceSerial,
      playModalVisible: true,
    });
  }

  setPalyer = (player: any) => {
    this.setState({
      player,
    });
  }

  closePlay = () => {
    const {player} = this.state;
    if (player) {
      player.stop();
    }
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
                  <VideoItem play={this.openPlayCall} accessToken={accessToken} video={video} setPlayer={this.setPalyer}/>
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
        <Spin tip="正在加载" spinning={this.state.loading}>
          <PageTitle title="视频监控"></PageTitle>
          <div style={{padding: '10px'}}>
            <div className="videos-content">
              {
                this.renderVideos()
              }
              <div style={{textAlign: 'right'}}>
                <Pagination onChange={this.onPageChange} current={this.state.currentPage} pageSize={12} total={this.state.total} showSizeChanger={false}/>
              </div>
            </div>
          </div>
          <PlayModal close={this.closePlay} visible={playModalVisible} url={url} channelNo={channelNo} deviceSerial={deviceSerial}/>
        </Spin>
      </div>
    );
  }
}

export default VideoLayout;
