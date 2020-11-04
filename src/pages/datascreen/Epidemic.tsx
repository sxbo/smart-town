/* eslint-disable no-invalid-this */
/* eslint-disable eqeqeq */
/* eslint-disable newline-after-var */
/* eslint-disable no-magic-numbers */
import React, {Component} from 'react';
import BackShadow from './BackShadow';
import ScreenTitle from './ScreenTitle';
import {colors} from '../../const/const';
import '../../theme/style/datascreen/Epidemic.scss';
import axios from 'axios';

export default class Epidemic extends Component{

    state = {
        diagnose: 0,
        cure: 0,
        separate: 0,
        asymptomatic: 0,
    }

    componentDidMount(){
        this.getEpidemics();
    }

    getEpidemics = (url: string = 'api/epidemicSurveillance') => {
        axios({
          method: 'GET',
          url: url,
        }).then((res) => {
          if (res.data.status === 200){
            const data = res.data.data || [];
            let diagnose: any = 0;
            let cure: any = 0;
            let separate: any = 0;
            let asymptomatic: any = 0;
            data.map((item: any) => {
              if (item.state == 1){
                diagnose++;
              } else if (item.state == 2) {
                cure++;
              } else if (item.state == 3) {
                separate++;
              } else {
                asymptomatic++;
              }
            });
            this.setState({diagnose, cure, separate, asymptomatic});
          }
        }).catch(() => {
            this.setState({diagnose: 0, cure: 0, separate: 0, asymptomatic: 0});
        });
    };

    render() {
        const {diagnose = 0, cure = 0, separate = 0, asymptomatic = 0} = this.state;
        return <BackShadow className="screen-epidemic">
            <ScreenTitle title="疫情防控"></ScreenTitle>
            <div className="s-pei-b">
                <div className="s-pei-u">
                    <span className="s-pei-icon" style={{background: colors.danger}}></span>
                    <span>确诊：{diagnose} 人</span>
                </div>
                <div className="s-pei-u">
                    <span className="s-pei-icon" style={{background: colors.success}}></span>
                    <span>治愈：{cure} 人</span>
                </div>
                <div className="s-pei-u">
                    <span className="s-pei-icon" style={{background: colors.warn}}></span>
                    <span>隔离：{separate} 人</span>
                </div>
                <div className="s-pei-u">
                    <span className="s-pei-icon" style={{background: colors.primary}}></span>
                    <span>无症状：{asymptomatic} 人</span>
                </div>
            </div>
        </BackShadow>;
    }
}
