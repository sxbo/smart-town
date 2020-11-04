/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import {message} from 'antd';
import ScreenTitle from './ScreenTitle';
import '../../theme/style/datascreen/Video.scss';
import EZUIKit from 'ezuikit-js';
import axios from 'axios';

export default class Video extends Component<any, any>{

    player1: any;
    player2: any;
    player3: any;

    constructor(props: any){
      super(props);
      this.player1 = null; // 定义播放器
      this.player2 = null; // 定义播放器
      this.player3 = null; // 定义播放器
    }

    state = {
        scenic1: {deviceSerial: '', channelNo: ''},
        scenic2: {deviceSerial: '', channelNo: ''},
        land: {deviceSerial: '', channelNo: ''},
    }

    componentDidMount(){
        const {accessToken = '', landSerial = '', scenicSerial1 = '', scenicSerial2 = ''} = this.props;
        this.getDeviceInfo(landSerial, (device: any) => {
            this.setState({
                land: device,
            }, () => {
                const {land} = this.state;
                this.player3 = new EZUIKit.EZUIKitPlayer({
                    id: 'screen_video_play3', // 视频容器ID
                    accessToken: accessToken,
                    url: 'ezopen://open.ys7.com/' + land?.deviceSerial + '/' + land?.channelNo + '.hd.live',
                    deviceSerial: land?.deviceSerial,
                    channelNo: land?.channelNo,
                    template: 'simple',
                    audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
                    autoplay: 1,
                });
            });
        }, () => {
            this.setState({
                land: this.state.land,
            });
        });

        this.getDeviceInfo(scenicSerial1, (device: any) => {
            this.setState({
                scenic1: device,
            }, () => {
                const {scenic1} = this.state;
                this.player1 = new EZUIKit.EZUIKitPlayer({
                    id: 'screen_video_play1', // 视频容器ID
                    accessToken: accessToken,
                    url: 'ezopen://open.ys7.com/' + scenic1?.deviceSerial + '/' + scenic1?.channelNo + '.hd.live',
                    deviceSerial: scenic1?.deviceSerial,
                    channelNo: scenic1?.channelNo,
                    template: 'simple',
                    audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
                    autoplay: 1,
                });
            });
        }, () => {
            this.setState({
                scenic1: this.state.scenic1,
            });
        });

        this.getDeviceInfo(scenicSerial2, (device: any) => {
            this.setState({
                scenic2: device,
            }, () => {
                const {scenic2} = this.state;
                this.player2 = new EZUIKit.EZUIKitPlayer({
                    id: 'screen_video_play2', // 视频容器ID
                    accessToken: accessToken,
                    url: 'ezopen://open.ys7.com/' + scenic2?.deviceSerial + '/' + scenic2?.channelNo + '.hd.live',
                    deviceSerial: scenic2?.deviceSerial,
                    channelNo: scenic2?.channelNo,
                    template: 'simple',
                    audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
                    autoplay: 1,
                });
            });
        }, () => {
            this.setState({
                scenic2: this.state.scenic2,
            });
        });
    }

    getDeviceInfo = (deviceSerial: any, success: any, fail: any) => {
        const {accessToken} = this.props;
        let url = `https://open.ys7.com/api/lapp/device/camera/list?accessToken=${accessToken}&deviceSerial=${deviceSerial}`;
        axios({
            method: 'POST',
            url: url,
        }).then((res) => {
            if (res.data.code == 200){
                const video = res.data?.data?.[0];
                success(video);
            }
        }).catch(() => {
            message.error('获取萤石设备列表失败！');
            fail();
        });
    }

    render() {
        return <BackShadow className="screen-scine-land">
            <ScreenTitle title="景点/山体滑坡点监控"></ScreenTitle>
            <div className="s-sl-b">
                <div className="s-sl-vu" id="screen_video_play1"></div>
                <div className="s-sl-vu" id="screen_video_play2"></div>
                <div className="s-sl-vu" id="screen_video_play3"></div>
            </div>
        </BackShadow>;
    }
}
