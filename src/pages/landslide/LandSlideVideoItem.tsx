/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import VideoItem from '../videoMonitor/VedioItem';
import axios from 'axios';
import {message } from 'antd';


export default class LandSlideVideoItem extends Component<any, any>{

    state = {
        video: {},
        accessToken: '',
        url: '',
        channelNo: '',
        deviceSerial: '',
        loading: false,
    }

    componentDidMount() {
        this.getDeviceInfo();
    }

    getDeviceInfo = () => {
        const {deviceSerial, accessToken} = this.props;
        let url = `https://open.ys7.com/api/lapp/device/camera/list?accessToken=${accessToken}&deviceSerial=${deviceSerial}`;
        axios({
            method: 'POST',
            url: url,
        }).then((res) => {
            if (res.data.code == 200){
                const video = res.data?.data?.[0];
                this.setState({
                    video: video,
                });
            }
        }).catch(() => {
            message.error('获取萤石设备列表失败！');
            this.setState({
                loading: false,
                video: {},
            });
        });
    }

    openPlayCall = (url: any, channelNo: any, deviceSerial: any) => {
        const {openPlayCall} = this.props;
        openPlayCall && openPlayCall(url, channelNo, deviceSerial);
    }

    setPalyer = (player: any) => {
        this.props.setPalyer(player);
      }


    render () {
        const {accessToken} = this.props;
        const {video} = this.state;
        return <>
            <VideoItem play={this.openPlayCall} accessToken={accessToken} video={video} setPlayer={this.setPalyer}/>
        </>;
    }
}
