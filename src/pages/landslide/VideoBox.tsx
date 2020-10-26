/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {Row, Col, Spin, message } from 'antd';
import axios from 'axios';

import PlayModal from '../videoMonitor/PlayModel';
import LandSlideVideoItem from './LandSlideVideoItem';
import '../../theme/style/landslide/VideoBox.scss';

export default class VideoBox extends Component<any, any> {

    state = {
        vedios: [],
        accessToken: '',
        playModalVisible: false,
        url: '',
        channelNo: '',
        deviceSerial: '',
        loading: false,
    }

    componentDidMount(){
        this.getAccessToken();
        this.getDeviceSerial();
    }

    getAccessToken = () => {
        this.setState({
            loading: true,
        });
        axios({
            method: 'GET',
            url: '/api/video/getAccessToken',
        }).then((res) => {
            if (res.status === 200){
                const accessToken: string = res.data.data;
                this.setState({
                    accessToken: accessToken,
                });
            }
            this.setState({
                loading: false,
            });
        }).catch(() => {
            message.error('获取萤石云Token失败');
            this.setState({
                loading: false,
            });
        });
    }

    getDeviceSerial = () => {
        // 查询山体设备序列号
        this.setState({
            loading: true,
        });
        const {monitorType} = this.props;
        axios({
            method: 'GET',
            url: `/api/videos/getMonitorSeriaNumber?monitorType=${monitorType}`,
        }).then((res) => {
            if (res.status === 200){
                const deviceSerials: any[] = res.data?.data || [];
                const arr = deviceSerials.map(item => item.seriaNumber);
                this.setState({
                    vedios: arr,
                });
            }
            this.setState({
                loading: false,
            });
        }).catch(() => {
            message.error('获取设备序列失败！');
            this.setState({
                loading: false,
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

    render = () => {
        const {vedios, playModalVisible, url, channelNo, deviceSerial, loading, accessToken} = this.state;
        const videoArr = [];
        for (let i = 0; i < vedios.length; i += 4 ){
          videoArr.push(vedios.slice(i, i + 4));
        }
        return <div className="landslide-video-box">
                <div className="video-box">
                    <div className="title">
                        <span>视频监控</span>
                    </div>
                    <Spin tip="正在加载" spinning={loading}>
                        {
                            vedios.length && accessToken && videoArr.map((videoItems, videoItemindex) => {
                            return <Row key={`${videoItemindex}`}>
                                {
                                videoItems.map((video: any, index: number) => {
                                    return <Col key={`${index}`} xs={{ span: 24}} md={{ span: 12}} xl={{ span: 6}} style={{padding: '10px'}}>
                                        <LandSlideVideoItem accessToken={accessToken} deviceSerial={video} openPlayCall={this.openPlayCall}/>
                                    </Col>;
                                })
                                }
                            </Row>;
                            })
                        }
                </Spin>
                <PlayModal close={this.closePlay} visible={playModalVisible} url={url} channelNo={channelNo} deviceSerial={deviceSerial}/>
            </div>
        </div>;
      }
}
