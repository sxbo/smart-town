/* eslint-disable newline-after-var */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import {MonitorIcon} from './Icon';

import '../../theme/style/datascreen/MonitorCount.scss';

export default class MonitorCount extends Component<any, any>{
    render() {
        const {totalMonitors = 0, scenicMonitors = 0, landMonitors = 0, villageMonitors = 0} = this.props;
        return <BackShadow className="screen-monitor-count">
            <ScreenTitle title="视频监控"></ScreenTitle>
            <div className="s-m-c-lr-h">
                <div className="screen-monitor-count-lr m-c-h">
                    <div className="m-u-lr s-m-c-lr-u">
                        <div className="m-circle">
                            <MonitorIcon/>
                        </div>
                        <div>
                            <div className="s-m-c-title">总监控点位</div>
                            <div className="s-m-c-num">{totalMonitors} 个</div>
                        </div>
                    </div>
                    <div className="m-u-lr s-m-c-lr-u">
                        <div className="m-circle">
                            <MonitorIcon/>
                        </div>
                        <div>
                            <div className="s-m-c-title">各村委会监控点位</div>
                            <div className="s-m-c-num">{villageMonitors} 个</div>
                        </div>
                    </div>
                </div>
                <div className="screen-monitor-count-lr m-c-h">
                    <div className="m-u-lr s-m-c-lr-u">
                        <div className="m-circle">
                            <MonitorIcon/>
                        </div>
                        <div>
                            <div className="s-m-c-title">景点监控点位</div>
                            <div className="s-m-c-num">{scenicMonitors} 个</div>
                        </div>
                    </div>
                    <div className="m-u-lr s-m-c-lr-u">
                        <div className="m-circle">
                            <MonitorIcon/>
                        </div>
                        <div>
                            <div className="s-m-c-title">山体滑坡监控点位</div>
                            <div className="s-m-c-num">{landMonitors} 个</div>
                        </div>
                    </div>
                </div>
            </div>
        </BackShadow>;
    }
}
