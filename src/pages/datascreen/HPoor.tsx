/* eslint-disable no-invalid-this */
/* eslint-disable newline-after-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import {TotalIcon, OutPovertyIcon, PovertyIcon} from './Icon';
import axios from 'axios';
import '../../theme/style/datascreen/Hpoor.scss';

export default class HPoor extends Component{

    state = {
        total: 0,
        outPoorCount: 0,
        poorCount: 0,
    }

    componentDidMount() {
        this.getRecords();
    }

    getRecords = () => {
        axios({
          method: 'GET',
          url: 'api/povertyAlleviationRecord',
        }).then((res) => {
          if (res.data.status === 200){
            const data = res.data?.data || [];
            const poors = data.filter((item: any) => item.poorState == 2);
            this.setState({
              total: data.length || 0,
              poorCount: poors.length || 0,
              outPoorCount: data.length - poors.length || 0,
            });
          }
        }).catch(() => {
          this.setState({
            total: 0,
            poorCount: 0,
            outPoorCount: 0,
          });
        });
    };

    render() {
        const {total, outPoorCount, poorCount} = this.state;
        return <BackShadow className="screen-hpoor">
            <ScreenTitle title="精准扶贫"></ScreenTitle>
            <div className="screen-hpoor-count">
                <div>
                    <div className="sh-v-c">
                        <span className="sh-mr"><TotalIcon/></span>
                        <span>总计</span>
                    </div>
                    <div className="sh-v-c">
                        <span>{total} 户</span>
                    </div>
                </div>
                <div>
                    <div className="sh-v-c">
                        <span className="sh-mr"><OutPovertyIcon/></span>
                        <span>已脱贫</span>
                    </div>
                    <div className="sh-v-c">
                        <span>{outPoorCount} 户</span>
                    </div>
                </div>
                <div>
                    <div className="sh-v-c">
                        <span className="sh-mr"><PovertyIcon/></span>
                        <span>未脱贫</span>
                    </div>
                    <div className="sh-v-c">
                        <span>{poorCount} 户</span>
                    </div>
                </div>
            </div>
        </BackShadow>;
    }
}
