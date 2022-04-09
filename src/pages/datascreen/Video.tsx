/* eslint-disable eqeqeq */
/* eslint-disable no-invalid-this */
/* eslint-disable no-magic-numbers */
/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import '../../theme/style/datascreen/Video.scss';
import EZUIKit from 'ezuikit-js';

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

    componentDidMount(){
        const {accessToken = '', video1 = '', video2 = '', video3 = ''} = this.props;
        this.player3 = new EZUIKit.EZUIKitPlayer({
            id: 'screen_video_play3', // 视频容器ID
            accessToken: accessToken,
            url: 'ezopen://open.ys7.com/' + video1?.seriaNumber + '/' + video1?.channelNo + '.hd.live',
            deviceSerial: video1?.seriaNumber,
            channelNo: video1?.channelNo,
            template: 'simple',
            audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
            autoplay: 1,
        });
        this.player1 = new EZUIKit.EZUIKitPlayer({
            id: 'screen_video_play1', // 视频容器ID
            accessToken: accessToken,
            url: 'ezopen://open.ys7.com/' + video2?.seriaNumber + '/' + video2?.channelNo + '.hd.live',
            deviceSerial: video2?.seriaNumber,
            channelNo: video2?.channelNo,
            template: 'simple',
            audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
            autoplay: 1,
        });

        this.player2 = new EZUIKit.EZUIKitPlayer({
            id: 'screen_video_play2', // 视频容器ID
            accessToken: accessToken,
            url: 'ezopen://open.ys7.com/' + video3?.seriaNumber + '/' + video3?.channelNo + '.hd.live',
            deviceSerial: video3?.seriaNumber,
            channelNo: video3?.channelNo,
            template: 'simple',
            audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
            autoplay: 1,
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
